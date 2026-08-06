import React, { useState, useEffect } from 'react';
import { X, Save, UserPlus, Building, Phone, Mail, MapPin, Tag, Calendar, Layers } from 'lucide-react';

const STATUS_OPTIONS = [
  'Nuevo',
  'Contactado',
  'Respondió',
  'Interesado',
  'Presupuesto enviado',
  'Cliente',
  'Perdido'
];

const ORIGIN_OPTIONS = [
  'Google Maps',
  'Instagram',
  'Recomendación',
  'Facebook',
  'WhatsApp Directo',
  'Prospección Fría',
  'Web'
];

export const ClientModal = ({ isOpen, onClose, onSave, clientToEdit }) => {
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    whatsapp: '',
    email: '',
    rubro: '',
    city: 'Mar del Plata',
    origin: 'Google Maps',
    firstContact: today,
    nextFollowUp: today,
    status: 'Nuevo',
    initialNote: ''
  });

  useEffect(() => {
    if (clientToEdit) {
      setFormData({
        name: clientToEdit.name || '',
        company: clientToEdit.company || '',
        phone: clientToEdit.phone || '',
        whatsapp: clientToEdit.whatsapp || '',
        email: clientToEdit.email || '',
        rubro: clientToEdit.rubro || '',
        city: clientToEdit.city || 'Mar del Plata',
        origin: clientToEdit.origin || 'Google Maps',
        firstContact: clientToEdit.firstContact || today,
        nextFollowUp: clientToEdit.nextFollowUp || today,
        status: clientToEdit.status || 'Nuevo',
        initialNote: ''
      });
    } else {
      setFormData({
        name: '',
        company: '',
        phone: '',
        whatsapp: '',
        email: '',
        rubro: '',
        city: 'Mar del Plata',
        origin: 'Google Maps',
        firstContact: today,
        nextFollowUp: today,
        status: 'Nuevo',
        initialNote: 'Cliente agregado al CRM.'
      });
    }
  }, [clientToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Por favor, ingresá el nombre del cliente.');
      return;
    }

    // Auto format whatsapp if phone is entered and whatsapp is empty
    let finalWhatsApp = formData.whatsapp;
    if (!finalWhatsApp && formData.phone) {
      const nums = formData.phone.replace(/\D/g, '');
      finalWhatsApp = nums.startsWith('54') ? nums : `549${nums}`;
    }

    onSave({
      ...formData,
      whatsapp: finalWhatsApp
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-brand-500/20 text-brand-400 rounded-lg">
              <UserPlus className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {clientToEdit ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Nombre */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nombre de Fantasía / Contacto <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Panadería Don José"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Empresa */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Razón Social / Empresa
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Ej. Don José S.A."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Teléfono de Contacto
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Ej. 2235123456"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                WhatsApp (con código de país)
              </label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="Ej. 5492235123456"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contacto@comercio.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Rubro */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Rubro / Sector
              </label>
              <input
                type="text"
                value={formData.rubro}
                onChange={(e) => setFormData({ ...formData, rubro: e.target.value })}
                placeholder="Ej. Panadería, Pizzería, Ferretería..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Ciudad */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Ciudad
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Ej. Mar del Plata"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Origen */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Origen del Lead
              </label>
              <select
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {ORIGIN_OPTIONS.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            {/* Estado */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Estado Actual
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 font-semibold text-brand-300"
              >
                {STATUS_OPTIONS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Próximo seguimiento */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Próximo Seguimiento
              </label>
              <input
                type="date"
                value={formData.nextFollowUp}
                onChange={(e) => setFormData({ ...formData, nextFollowUp: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

          </div>

          {!clientToEdit && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nota inicial o detalle del contacto
              </label>
              <textarea
                rows={2}
                value={formData.initialNote}
                onChange={(e) => setFormData({ ...formData, initialNote: e.target.value })}
                placeholder="Ej. Le envié WhatsApp inicial presentando la solución de Bot de IA."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-600/30 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{clientToEdit ? 'Guardar Cambios' : 'Crear Cliente'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
