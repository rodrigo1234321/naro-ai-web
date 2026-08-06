import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { clientService } from './services/clientService';
import { isFirebaseConfigured } from './firebase/config';
import { exportClientsToExcel, exportClientsToJSON } from './utils/exportUtils';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ClientList } from './components/ClientList';
import { ClientModal } from './components/ClientModal';
import { ClientDetailModal } from './components/ClientDetailModal';
import { LayoutDashboard, Users, RefreshCw } from 'lucide-react';

const ImporterModal = lazy(() => import('./components/ImporterModal'));

function MainApp() {
  const { currentUser } = useAuth();

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'clients'
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('Todos');

  // Modals state
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);
  
  const [selectedDetailClient, setSelectedDetailClient] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [isImporterOpen, setIsImporterOpen] = useState(false);

  // Load clients
  const loadClients = useCallback(async () => {
    setLoading(true);
    const data = await clientService.getAllClients();
    setClients(data);
    setLoading(false);
  }, []);

  // Real-time sync: Firestore onSnapshot when configured, local otherwise
  useEffect(() => {
    const unsubscribe = clientService.subscribeToClients((data) => {
      setClients(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Auto-migrate local data to the cloud on first launch with Firebase active
  useEffect(() => {
    if (isFirebaseConfigured) {
      clientService.migrateLocalToCloud(currentUser?.name)
        .then((res) => {
          if (res.migrated) {
            console.log(`☁️ Migración completada: ${res.count} clientes subidos a Firestore.`);
          }
        });
    }
  }, []);

  // Handlers
  const handleCreateOrUpdateClient = async (formData) => {
    if (clientToEdit) {
      await clientService.updateClient(clientToEdit.id, formData);
    } else {
      await clientService.createClient(formData, currentUser.name);
    }
    await loadClients();
    setClientToEdit(null);
  };

  const handleAddInteraction = async (clientId, note, userName, newStatus, nextFollowUpDate) => {
    await clientService.addInteraction(clientId, note, userName, newStatus, nextFollowUpDate);
    await loadClients();
    
    // Refresh open detail modal client state
    const updatedList = await clientService.getAllClients();
    const current = updatedList.find(c => c.id === clientId);
    if (current) {
      setSelectedDetailClient(current);
    }
  };

  const handleDeleteClient = async (clientId) => {
    await clientService.deleteClient(clientId);
    await loadClients();
  };

  const handleFilterByStatus = (status) => {
    setSelectedStatusFilter(status);
    setActiveTab('clients');
  };

  const handleOpenEditModal = (client) => {
    setClientToEdit(client);
    setIsClientModalOpen(true);
  };

  const handleOpenDetailModal = (client) => {
    setSelectedDetailClient(client);
    setIsDetailModalOpen(true);
  };

  const handleImportClients = async (importList, userName) => {
    const count = await clientService.importBatchClients(importList, userName);
    await loadClients();
    return count;
  };

  const handleExport = (format) => {
    if (!clients.length) {
      alert('No hay clientes para exportar.');
      return;
    }
    if (format === 'json') {
      exportClientsToJSON(clients);
    } else {
      exportClientsToExcel(clients);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Navbar */}
      <Navbar
        onOpenNewClient={() => {
          setClientToEdit(null);
          setIsClientModalOpen(true);
        }}
        onOpenImporter={() => setIsImporterOpen(true)}
        onExport={handleExport}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Navigation View Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center space-x-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'dashboard'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard & Notificaciones</span>
            </button>

            <button
              onClick={() => setActiveTab('clients')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'clients'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Gestión de Clientes ({clients.length})</span>
            </button>
          </div>

          <button
            onClick={loadClients}
            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition-all"
            title="Recargar datos"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-400' : ''}`} />
          </button>
        </div>

        {/* Content Render */}
        {loading && clients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400">Cargando datos del CRM...</p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <Dashboard
                clients={clients}
                onSelectClient={handleOpenDetailModal}
                onFilterByStatus={handleFilterByStatus}
              />
            )}

            {activeTab === 'clients' && (
              <ClientList
                clients={clients}
                onSelectClient={handleOpenDetailModal}
                onEditClient={handleOpenEditModal}
                onDeleteClient={handleDeleteClient}
                selectedStatus={selectedStatusFilter}
                onSelectStatusFilter={setSelectedStatusFilter}
                onOpenNewClient={() => {
                  setClientToEdit(null);
                  setIsClientModalOpen(true);
                }}
              />
            )}
          </>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>CRM Pymes — Sistema Gratuito de Gestión Comercial y Prospección • Naro AI</p>
      </footer>

      {/* Modals */}
      <ClientModal
        isOpen={isClientModalOpen}
        onClose={() => {
          setIsClientModalOpen(false);
          setClientToEdit(null);
        }}
        onSave={handleCreateOrUpdateClient}
        clientToEdit={clientToEdit}
      />

      <ClientDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedDetailClient(null);
        }}
        client={selectedDetailClient}
        onAddInteraction={handleAddInteraction}
      />

      {isImporterOpen && (
        <Suspense fallback={null}>
          <ImporterModal
            isOpen
            onClose={() => setIsImporterOpen(false)}
            onImport={handleImportClients}
          />
        </Suspense>
      )}

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
