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

// Seed Initial Data strictly matching prompt specifications
const INITIAL_SEED_DATA = [
  {
    id: 'seed-1',
    name: 'Ferretería López',
    company: 'Ferretería López S.R.L.',
    phone: '2235123456',
    whatsapp: '5492235123456',
    email: 'contacto@ferreterialopez.com',
    rubro: 'Ferretería',
    city: 'Mar del Plata',
    origin: 'Google Maps',
    firstContact: '2026-08-01',
    lastContact: '2026-08-05',
    nextFollowUp: new Date().toISOString().split('T')[0], // Today!
    status: 'Contactado',
    history: [
      { id: 'h1', date: '2026-08-01', user: 'Rodrigo', note: 'Primer contacto vía llamada de prospección.' },
      { id: 'h2', date: '2026-08-05', user: 'Compañero', note: 'Le envié propuesta de Bot de WhatsApp.' }
    ]
  },
  {
    id: 'seed-2',
    name: 'Kiosco Sol',
    company: 'Kiosco Sol',
    phone: '2234987654',
    whatsapp: '5492234987654',
    email: 'kioscosolmdp@gmail.com',
    rubro: 'Kiosco / Comercio',
    city: 'Mar del Plata',
    origin: 'Recomendación',
    firstContact: '2026-08-02',
    lastContact: '2026-08-05',
    nextFollowUp: new Date().toISOString().split('T')[0], // Today!
    status: 'Interesado',
    history: [
      { id: 'h3', date: '2026-08-02', user: 'Rodrigo', note: 'Le envié mensaje por WhatsApp recomendados por Juan.' },
      { id: 'h4', date: '2026-08-05', user: 'Rodrigo', note: 'Pidió detalles sobre página web con catálogo.' }
    ]
  },
  {
    id: 'seed-3',
    name: 'Farmacia Central',
    company: 'Farmacia Central Guemes',
    phone: '2236112233',
    whatsapp: '5492236112233',
    email: 'info@farmaciacentralmdp.com',
    rubro: 'Farmacia',
    city: 'Mar del Plata',
    origin: 'Instagram',
    firstContact: '2026-08-03',
    lastContact: '2026-08-06',
    nextFollowUp: new Date().toISOString().split('T')[0], // Today!
    status: 'Presupuesto enviado',
    history: [
      { id: 'h5', date: '2026-08-03', user: 'Compañero', note: 'Consultó por Instagram sobre automatización.' },
      { id: 'h6', date: '2026-08-06', user: 'Rodrigo', note: 'Se envió presupuesto formal de $450.000.' }
    ]
  },
  {
    id: 'seed-4',
    name: 'Panadería La Argentina',
    company: 'Panadería La Argentina',
    phone: '2235443322',
    whatsapp: '5492235443322',
    email: 'ventas@laargentinapan.com',
    rubro: 'Panadería',
    city: 'Mar del Plata',
    origin: 'Google Maps',
    firstContact: '2026-07-28',
    lastContact: '2026-08-04',
    nextFollowUp: '2026-08-10',
    status: 'Respondió',
    history: [
      { id: 'h7', date: '2026-07-28', user: 'Rodrigo', note: 'Mensaje inicial de presentación enviado.' },
      { id: 'h8', date: '2026-08-04', user: 'Compañero', note: 'Respondió interesados en menú digital.' }
    ]
  },
  {
    id: 'seed-5',
    name: 'Pizzería Nápoli',
    company: 'Pizzería Nápoli & Pasta',
    phone: '2235998877',
    whatsapp: '5492235998877',
    email: 'napoli.mdp@hotmail.com',
    rubro: 'Pizzería',
    city: 'Mar del Plata',
    origin: 'Instagram',
    firstContact: '2026-07-20',
    lastContact: '2026-08-01',
    nextFollowUp: '2026-08-08',
    status: 'Cliente',
    history: [
      { id: 'h9', date: '2026-07-20', user: 'Rodrigo', note: 'Primer contacto vía Instagram DM.' },
      { id: 'h10', date: '2026-08-01', user: 'Rodrigo', note: 'Aceptó presupuesto. ¡Cliente cerrado!' }
    ]
  },
  {
    id: 'seed-6',
    name: 'Panadería Don José',
    company: 'Don José S.A.',
    phone: '2234771122',
    whatsapp: '5492234771122',
    email: 'contacto@donjosepanaderia.com',
    rubro: 'Panadería',
    city: 'Mar del Plata',
    origin: 'Google Maps',
    firstContact: '2026-08-04',
    lastContact: '2026-08-05',
    nextFollowUp: '2026-08-12',
    status: 'Nuevo',
    history: [
      { id: 'h11', date: '2026-08-04', user: 'Rodrigo', note: 'Cliente ingresado desde prospección Google Maps.' }
    ]
  },
  {
    id: 'seed-7',
    name: 'Pizzería Trattoria',
    company: 'Trattoria MDP',
    phone: '2235889900',
    whatsapp: '5492235889900',
    email: 'trattoria@gmail.com',
    rubro: 'Pizzería',
    city: 'Mar del Plata',
    origin: 'Recomendación',
    firstContact: '2026-07-15',
    lastContact: '2026-07-22',
    nextFollowUp: '2026-08-15',
    status: 'Perdido',
    history: [
      { id: 'h12', date: '2026-07-15', user: 'Compañero', note: 'Presentación de servicios.' },
      { id: 'h13', date: '2026-07-22', user: 'Compañero', note: 'Indicó que por el momento no van a invertir.' }
    ]
  }
];

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

const getCloudClients = async () => {
  const q = query(collection(db, 'clients'), orderBy('lastContact', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const clientService = {
  // Real-time subscription (Firestore onSnapshot) or local fallback
  subscribeToClients(onNext) {
    if (!isFirebaseConfigured || !db) {
      onNext(getLocalClients());
      return () => {};
    }

    try {
      const q = query(collection(db, 'clients'), orderBy('lastContact', 'desc'));
      return onSnapshot(
        q,
        (querySnapshot) => {
          const clients = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          // If cloud is still empty and there is local data pending migration,
          // show it immediately to avoid a blank screen flash.
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
          console.error("⚠️ Error en suscripción Firestore, usando datos locales:", err);
          onNext(getLocalClients());
        }
      );
    } catch (err) {
      console.error("⚠️ No se pudo suscribir a Firestore:", err);
      onNext(getLocalClients());
      return () => {};
    }
  },

  // Fetch all clients (one-shot)
  async getAllClients() {
    if (isFirebaseConfigured && db) {
      try {
        return await getCloudClients();
      } catch (err) {
        console.error("Error cargando de Firestore, usando fallback local:", err);
      }
    }
    return getLocalClients();
  },

  // Migrate local seed/data to Firestore once (idempotent via flag)
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

    const localClients = getLocalClients();
    const clientWithId = { id: `client-${Date.now()}`, ...newClient };
    localClients.unshift(clientWithId);
    saveLocalClients(localClients);
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
      const localClients = getLocalClients();
      const index = localClients.findIndex(c => c.id === clientId);
      if (index !== -1) {
        localClients[index] = { ...localClients[index], ...clientData };
        saveLocalClients(localClients);
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
      saveLocalClients(getLocalClients().filter(c => c.id !== clientId));
    }
    return true;
  },

  // Import batch clients (Firestore batch when cloud is active)
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

    const existing = getLocalClients();
    const merged = [...formatted, ...existing];
    saveLocalClients(merged);
    return formatted.length;
  }
};
