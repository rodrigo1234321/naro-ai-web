import { db, isFirebaseConfigured } from '../firebase/config';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp,
  writeBatch,
  onSnapshot 
} from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'crm_clients_db_v1';
const MIGRATION_FLAG_KEY = 'crm_migrated_to_cloud_v1';
// Public shared Cloud Key for zero-config multi-user sync (Rodrigo & Compañero)
const SHARED_CLOUD_API_URL = 'https://kvdb.io/4y9bM6GZ8PzGzXz7mK2V5j/naro_ai_crm_clients_v1';

// Seed Initial Data (Empty by default for production use)
const INITIAL_SEED_DATA = [];

// Helper to initialize local storage if empty
const getLocalClients = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_SEED_DATA));
    return INITIAL_SEED_DATA;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_SEED_DATA;
  }
};

const saveLocalClients = (clients) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(clients));
};

// Fetch shared cloud data via fallback REST sync
const fetchCloudKv = async () => {
  try {
    const res = await fetch(SHARED_CLOUD_API_URL, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        saveLocalClients(data);
        return data;
      }
    }
  } catch (err) {
    console.warn("⚠️ Cloud KV sync warning:", err);
  }
  return getLocalClients();
};

// Save shared cloud data via fallback REST sync
const saveCloudKv = async (clients) => {
  saveLocalClients(clients);
  try {
    await fetch(SHARED_CLOUD_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clients)
    });
  } catch (err) {
    console.warn("⚠️ Error guardando en la nube KV:", err);
  }
};

const getCloudClients = async () => {
  const q = query(collection(db, 'clients'), orderBy('lastContact', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const clientService = {
  // Real-time subscription (Firestore onSnapshot or Cloud KV Polling)
  subscribeToClients(onNext) {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'clients'), orderBy('lastContact', 'desc'));
        return onSnapshot(
          q,
          (querySnapshot) => {
            const clients = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            if (clients.length === 0 && !localStorage.getItem(MIGRATION_FLAG_KEY)) {
              const local = getLocalClients();
              if (local.length) {
                onNext(local);
                return;
              }
            }
            onNext(clients);
          },
          (err) => {
            console.error("⚠️ Error en suscripción Firestore, usando nube KV:", err);
            this._startKvPolling(onNext);
          }
        );
      } catch (err) {
        console.error("⚠️ No se pudo suscribir a Firestore:", err);
      }
    }

    // Cloud KV fallback subscription (syncs between Rodrigo & Compañero automatically!)
    return this._startKvPolling(onNext);
  },

  _startKvPolling(onNext) {
    // Initial fetch
    fetchCloudKv().then((clients) => onNext(clients));

    // Poll every 5 seconds for shared cloud updates between team members
    const interval = setInterval(async () => {
      const clients = await fetchCloudKv();
      onNext(clients);
    }, 5000);

    return () => clearInterval(interval);
  },

  // Fetch all clients (one-shot)
  async getAllClients() {
    if (isFirebaseConfigured && db) {
      try {
        return await getCloudClients();
      } catch (err) {
        console.error("Error cargando de Firestore, usando fallback nube KV:", err);
      }
    }
    return await fetchCloudKv();
  },

  // Migrate local seed/data to Firestore once
  async migrateLocalToCloud(userName) {
    if (!isFirebaseConfigured || !db) return { migrated: false, count: 0 };
    if (localStorage.getItem(MIGRATION_FLAG_KEY)) return { migrated: false, count: 0 };

    try {
      const cloud = await getCloudClients();
      if (cloud.length > 0) {
        localStorage.setItem(MIGRATION_FLAG_KEY, '1');
        return { migrated: false, count: 0 };
      }

      const local = getLocalClients();
      if (!local.length) {
        localStorage.setItem(MIGRATION_FLAG_KEY, '1');
        return { migrated: false, count: 0 };
      }

      const batch = writeBatch(db);
      local.forEach((c) => {
        const ref = doc(collection(db, 'clients'));
        const { id, ...rest } = c;
        batch.set(ref, { ...rest, createdAt: serverTimestamp() });
      });
      await batch.commit();
      localStorage.setItem(MIGRATION_FLAG_KEY, '1');
      if (userName) localStorage.setItem('crm_migrated_user_v1', userName);
      return { migrated: true, count: local.length };
    } catch (err) {
      console.error("⚠️ No se pudo migrar los datos a la nube:", err);
      return { migrated: false, count: 0, error: err };
    }
  },

  // Create new client
  async createClient(clientData, userName) {
    const today = new Date().toISOString().split('T')[0];
    const newClient = {
      name: clientData.name || '',
      company: clientData.company || '',
      phone: clientData.phone || '',
      whatsapp: clientData.whatsapp || (clientData.phone ? `549${clientData.phone.replace(/\D/g, '')}` : ''),
      email: clientData.email || '',
      rubro: clientData.rubro || 'General',
      city: clientData.city || 'Mar del Plata',
      origin: clientData.origin || 'Google Maps',
      firstContact: clientData.firstContact || today,
      lastContact: today,
      nextFollowUp: clientData.nextFollowUp || today,
      status: clientData.status || 'Nuevo',
      history: [
        {
          id: `h-${Date.now()}`,
          date: today,
          user: userName || 'Rodrigo',
          note: clientData.initialNote || 'Cliente agregado al sistema.'
        }
      ]
    };

    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, 'clients'), {
          ...newClient,
          createdAt: serverTimestamp()
        });
        return { id: docRef.id, ...newClient };
      } catch (err) {
        console.error("Error al guardar en Firestore:", err);
      }
    }

    const localClients = await fetchCloudKv();
    const clientWithId = { id: `client-${Date.now()}`, ...newClient };
    const updated = [clientWithId, ...localClients];
    await saveCloudKv(updated);
    return clientWithId;
  },

  // Update client
  async updateClient(clientId, clientData) {
    let cloudOk = false;
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, 'clients', clientId);
        await updateDoc(docRef, clientData);
        cloudOk = true;
      } catch (err) {
        console.error("Error actualizando en Firestore:", err);
      }
    }

    if (!isFirebaseConfigured || !cloudOk) {
      const localClients = await fetchCloudKv();
      const index = localClients.findIndex(c => c.id === clientId);
      if (index !== -1) {
        localClients[index] = { ...localClients[index], ...clientData };
        await saveCloudKv(localClients);
      }
    }
    return true;
  },

  // Add interaction / note to client history
  async addInteraction(clientId, note, userName, newStatus = null, nextFollowUpDate = null) {
    const today = new Date().toISOString().split('T')[0];
    const newHistoryItem = {
      id: `h-${Date.now()}`,
      date: today,
      user: userName || 'Rodrigo',
      note: note
    };

    const clients = await this.getAllClients();
    const target = clients.find(c => c.id === clientId);
    if (!target) return false;

    const updatedHistory = [newHistoryItem, ...(target.history || [])];
    const updatePayload = {
      history: updatedHistory,
      lastContact: today
    };

    if (newStatus) {
      updatePayload.status = newStatus;
      if (newStatus === 'Cliente') {
        updatePayload.closedDate = today;
      }
    }
    if (nextFollowUpDate) updatePayload.nextFollowUp = nextFollowUpDate;

    await this.updateClient(clientId, updatePayload);
    return true;
  },

  // Delete client
  async deleteClient(clientId) {
    let cloudOk = false;
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'clients', clientId));
        cloudOk = true;
      } catch (err) {
        console.error("Error eliminando en Firestore:", err);
      }
    }

    if (!isFirebaseConfigured || !cloudOk) {
      const localClients = await fetchCloudKv();
      const updated = localClients.filter(c => c.id !== clientId);
      await saveCloudKv(updated);
    }
    return true;
  },

  // Import batch clients
  async importBatchClients(clientList, userName) {
    const today = new Date().toISOString().split('T')[0];
    const formatted = clientList.map((item, idx) => ({
      id: `imp-${Date.now()}-${idx}`,
      name: item.Nombre || item.name || 'Comercio',
      company: item.Empresa || item.company || item.Nombre || '',
      phone: String(item.Teléfono || item.phone || item.Telefono || ''),
      whatsapp: String(item.WhatsApp || item.whatsapp || (item.Teléfono ? `549${String(item.Teléfono).replace(/\D/g, '')}` : '')),
      email: item.Email || item.email || '',
      rubro: item.Rubro || item.rubro || 'General',
      city: item.Ciudad || item.city || 'Mar del Plata',
      origin: item.Origen || item.origin || 'Importación Excel',
      firstContact: today,
      lastContact: today,
      nextFollowUp: today,
      status: item.Estado || item.status || 'Nuevo',
      history: [
        {
          id: `h-${Date.now()}-${idx}`,
          date: today,
          user: userName || 'Rodrigo',
          note: 'Cliente importado masivamente.'
        }
      ]
    }));

    if (isFirebaseConfigured && db) {
      try {
        const batch = writeBatch(db);
        formatted.forEach((c) => {
          const { id, ...rest } = c;
          batch.set(doc(collection(db, 'clients')), { ...rest, createdAt: serverTimestamp() });
        });
        await batch.commit();
        return formatted.length;
      } catch (err) {
        console.error("Error importando en Firestore:", err);
      }
    }

    const existing = await fetchCloudKv();
    const merged = [...formatted, ...existing];
    await saveCloudKv(merged);
    return formatted.length;
  }
};
