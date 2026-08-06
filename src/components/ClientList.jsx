import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MessageCircle, 
  Phone, 
  Calendar, 
  Building2, 
  MapPin, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  History, 
  ExternalLink,
  Plus
} from 'lucide-react';

const STATUS_COLORS = {
  'Nuevo': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  'Contactado': 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  'Respondió': 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  'Interesado': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  'Presupuesto enviado': 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  'Cliente': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  'Perdido': 'bg-rose-500/15 text-rose-300 border-rose-500/30'
};

const ALL_STATUSES = [
  'Todos',
  'Nuevo',
  'Contactado',
  'Respondió',
  'Interesado',
  'Presupuesto enviado',
  'Cliente',
  'Perdido'
];

export const ClientList = ({ 
  clients, 
  onSelectClient, 
  onEditClient, 
  onDeleteClient, 
  selectedStatus, 
  onSelectStatusFilter,
  onOpenNewClient
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRubro, setSelectedRubro] = useState('Todos');

  // Extract unique rubros for quick dropdown filter
  const rubrosList = useMemo(() => {
    const set = new Set(clients.map(c => c.rubro).filter(Boolean));
    return ['Todos', ...Array.from(set)];
  }, [clients]);

  // Filter clients based on search query, status filter, and rubro filter
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      // Status filter
      if (selectedStatus !== 'Todos' && c.status !== selectedStatus) {
        return false;
      }
      // Rubro filter
      if (selectedRubro !== 'Todos' && c.rubro !== selectedRubro) {
        return false;
      }
      // Search term
      if (searchTerm.trim() !== '') {
        const q = searchTerm.toLowerCase();
        const matchName = (c.name || '').toLowerCase().includes(q);
        const matchCompany = (c.company || '').toLowerCase().includes(q);
        const matchRubro = (c.rubro || '').toLowerCase().includes(q);
        const matchCity = (c.city || '').toLowerCase().includes(q);
        const matchPhone = (c.phone || '').includes(q);
        const matchOrigin = (c.origin || '').toLowerCase().includes(q);

        return matchName || matchCompany || matchRubro || matchCity || matchPhone || matchOrigin;
      }

      return true;
    });
  }, [clients, selectedStatus, selectedRubro, searchTerm]);

  return (
    <div className="space-y-5">
      
      {/* Controls Header: Search & Filters */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por cliente, rubro (ej. Panadería, Pizzería), empresa, ciudad..."
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕ Limpiar
              </button>
            )}
          </div>

          {/* Rubro Selector */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={selectedRubro}
              onChange={(e) => setSelectedRubro(e.target.value)}
              className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-200 focus:outline-none focus:border-brand-500"
            >
              <option value="Todos">Todos los Rubros</option>
              {rubrosList.filter(r => r !== 'Todos').map(rubro => (
                <option key={rubro} value={rubro}>{rubro}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
          {ALL_STATUSES.map((status) => {
            const count = status === 'Todos' 
              ? clients.length 
              : clients.filter(c => c.status === status).length;
            const isSelected = selectedStatus === status;

            return (
              <button
                key={status}
                onClick={() => onSelectStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                    : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{status}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Results Count & Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Mostrando <strong className="text-white">{filteredClients.length}</strong> de {clients.length} clientes</span>
        {searchTerm && (
          <span>Filtro activo: "<span className="text-brand-400 font-semibold">{searchTerm}</span>"</span>
        )}
      </div>

      {/* Client Cards Grid */}
      {filteredClients.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center">
          <div className="max-w-xs mx-auto space-y-3">
            <div className="p-3 bg-slate-800 rounded-full w-12 h-12 mx-auto flex items-center justify-center text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">No se encontraron clientes</h4>
            <p className="text-xs text-slate-400">Intenta cambiar el término de búsqueda o limpia los filtros activos.</p>
            <button
              onClick={onOpenNewClient}
              className="mt-2 inline-flex items-center space-x-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar Nuevo Cliente</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client) => {
            const statusStyle = STATUS_COLORS[client.status] || 'bg-slate-800 text-slate-300 border-slate-700';
            const cleanPhone = (client.whatsapp || client.phone || '').replace(/\D/g, '');

            return (
              <div
                key={client.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg transition-all hover:shadow-xl hover:translate-y-[-2px] flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 
                        onClick={() => onSelectClient(client)}
                        className="text-base font-bold text-white group-hover:text-brand-400 transition-colors cursor-pointer"
                      >
                        {client.name}
                      </h3>
                      {client.company && client.company !== client.name && (
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3" />
                          <span>{client.company}</span>
                        </p>
                      )}
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-lg border font-semibold flex-shrink-0 ${statusStyle}`}>
                      {client.status}
                    </span>
                  </div>

                  {/* Badges & Info */}
                  <div className="flex flex-wrap gap-1.5 my-3">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                      🏷️ {client.rubro}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                      📍 {client.city}
                    </span>
                    {client.origin && (
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800/60 text-slate-400 font-normal">
                        Via: {client.origin}
                      </span>
                    )}
                  </div>

                  {/* Dates & Last Note Preview */}
                  <div className="space-y-1.5 text-xs text-slate-400 bg-slate-950/60 rounded-xl p-3 mb-4 border border-slate-800/80">
                    <div className="flex justify-between">
                      <span>Último contacto:</span>
                      <span className="text-slate-200 font-medium">{client.lastContact || 'Sin fecha'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Próximo seguimiento:</span>
                      <span className="text-amber-400 font-semibold">{client.nextFollowUp || 'No programado'}</span>
                    </div>
                    {client.history && client.history.length > 0 && (
                      <div className="pt-2 mt-1 border-t border-slate-800/60 text-[11px] text-slate-300 line-clamp-2">
                        <strong className="text-brand-400">{client.history[0].user}:</strong> "{client.history[0].note}"
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <div className="flex items-center space-x-2">
                    {cleanPhone && (
                      <a
                        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hola ${client.name}, te escribo por parte de Naro AI...`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all"
                        title="Enviar WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    )}
                    {client.phone && (
                      <a
                        href={`tel:${client.phone}`}
                        className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 transition-all"
                        title="Llamar"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => onSelectClient(client)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all flex items-center space-x-1"
                    >
                      <History className="w-3.5 h-3.5 text-brand-400" />
                      <span>Historial ({client.history ? client.history.length : 0})</span>
                    </button>

                    <button
                      onClick={() => onEditClient(client)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                      title="Editar Cliente"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`¿Estás seguro de eliminar el cliente "${client.name}"?`)) {
                          onDeleteClient(client.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                      title="Eliminar Cliente"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
