import React, { useState } from 'react';
import { 
  X, 
  History, 
  Send, 
  MessageCircle, 
  Phone, 
  Calendar, 
  User, 
  Building, 
  Mail, 
  MapPin, 
  Tag, 
  Clock, 
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const STATUS_OPTIONS = [
  'Nuevo',
  'Contactado',
  'Respondió',
  'Interesado',
  'Presupuesto enviado',
  'Cliente',
  'Perdido'
];

export const ClientDetailModal = ({ isOpen, onClose, client, onAddInteraction }) => {
  const { currentUser } = useAuth();
  
  const [newNote, setNewNote] = useState('');
  const [updateStatus, setUpdateStatus] = useState(client ? client.status : 'Contactado');
  const [nextFollowUpDate, setNextFollowUpDate] = useState(
    client ? client.nextFollowUp : new Date().toISOString().split('T')[0]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !client) return null;

  const handleAddInteractionSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) {
      alert('Escribí una nota o descripción de la interacción.');
      return;
    }

    setIsSubmitting(true);
    await onAddInteraction(
      client.id,
      newNote,
      currentUser.name,
      updateStatus !== client.status ? updateStatus : null,
      nextFollowUpDate
    );
    setIsSubmitting(false);
    setNewNote('');
  };

  const cleanPhone = (client.whatsapp || client.phone || '').replace(/\D/g, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center font-bold text-lg">
              {client.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-extrabold text-white">{client.name}</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-brand-300 font-semibold border border-slate-700">
                  {client.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {client.company && client.company !== client.name ? `${client.company} • ` : ''}
                {client.rubro} • {client.city}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Quick Details Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 block">Teléfono / WhatsApp:</span>
              <span className="text-slate-200 font-medium">{client.phone || client.whatsapp || 'No registrado'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Origen:</span>
              <span className="text-slate-200 font-medium">{client.origin || 'Directo'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Primer contacto:</span>
              <span className="text-slate-200 font-medium">{client.firstContact}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Próximo seguimiento:</span>
              <span className="text-amber-400 font-semibold">{client.nextFollowUp || 'No agendado'}</span>
            </div>
          </div>

          {/* Quick Contact Actions */}
          <div className="flex items-center gap-3">
            {cleanPhone && (
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hola ${client.name}, ¿cómo estás? Te escribo de Naro AI...`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Abrir WhatsApp</span>
              </a>
            )}
            {client.phone && (
              <a
                href={`tel:${client.phone}`}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-bold transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Llamar</span>
              </a>
            )}
          </div>

          {/* Add New Interaction Form */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-brand-400" />
                <span>Registrar Nueva Interacción</span>
              </h4>
              <span className="text-xs text-slate-400">
                Registrando como: <strong className="text-brand-300">{currentUser.name}</strong>
              </span>
            </div>

            <form onSubmit={handleAddInteractionSubmit} className="space-y-3">
              <textarea
                rows={2}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Ej. Le envié WhatsApp / Pidió presupuesto de $450.000 / Se acordó llamada..."
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-0.5">Nuevo Estado:</label>
                    <select
                      value={updateStatus}
                      onChange={(e) => setUpdateStatus(e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-0.5">Agendar seguimiento:</label>
                    <input
                      type="date"
                      value={nextFollowUpDate}
                      onChange={(e) => setNextFollowUpDate(e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2 py-1 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Guardar en Historial</span>
                </button>
              </div>
            </form>
          </div>

          {/* Timeline / Immutable History */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <History className="w-4 h-4 text-brand-400" />
                <span>Historial de Interacciones ({client.history ? client.history.length : 0})</span>
              </span>
              <span className="text-[11px] text-emerald-400 lowercase font-normal">
                ✓ Registro inmutable
              </span>
            </h4>

            {(!client.history || client.history.length === 0) ? (
              <p className="text-xs text-slate-500 italic py-4">No hay interacciones registradas para este cliente aún.</p>
            ) : (
              <div className="relative border-l-2 border-slate-800 ml-3 space-y-4 pt-1">
                {client.history.map((item, index) => (
                  <div key={item.id || index} className="relative pl-6">
                    {/* Dot on timeline */}
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-slate-900 border-2 border-brand-500 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                    </div>

                    <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-brand-400" />
                          <span>{item.user}</span>
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {item.date}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line pt-1">
                        {item.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
