import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { X, UploadCloud, FileSpreadsheet, Check, AlertCircle, FileUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ImporterModal = ({ isOpen, onClose, onImport }) => {
  const { currentUser } = useAuth();
  const [jsonText, setJsonText] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);

  if (!isOpen) return null;

  const handleSampleImport = () => {
    const sampleData = [
      { Nombre: "Panadería El Sol", Empresa: "El Sol S.A.", Teléfono: "2235991122", Rubro: "Panadería", Ciudad: "Mar del Plata", Origen: "Google Maps" },
      { Nombre: "Pizzería La Popular", Empresa: "La Popular", Teléfono: "2234882233", Rubro: "Pizzería", Ciudad: "Mar del Plata", Origen: "Instagram" },
      { Nombre: "Ferretería El Martillo", Empresa: "El Martillo", Teléfono: "2235773344", Rubro: "Ferretería", Ciudad: "Mar del Plata", Origen: "Recomendación" }
    ];
    setJsonText(JSON.stringify(sampleData, null, 2));
    setStatusMsg(null);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';

    try {
      if (/\.json$/i.test(file.name)) {
        const text = await file.text();
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) {
          throw new Error("El JSON debe ser una lista de objetos [ { ... }, { ... } ]");
        }
        setJsonText(JSON.stringify(parsed, null, 2));
        setStatusMsg({ type: 'success', text: `JSON "${file.name}" cargado: ${parsed.length} registros. Revisá y confirmá la importación.` });
        return;
      }

      if (/\.(xlsx|xls|csv)$/i.test(file.name)) {
        const data = await file.arrayBuffer();
        const wb = XLSX.read(data, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws);
        if (!rows.length) {
          throw new Error("El archivo no tiene filas de datos.");
        }
        setJsonText(JSON.stringify(rows, null, 2));
        setStatusMsg({ type: 'success', text: `Archivo "${file.name}" leído: ${rows.length} filas. Revisá y confirmá la importación.` });
        return;
      }

      throw new Error("Formato no soportado. Usá .xlsx, .xls, .csv o .json");
    } catch (err) {
      setStatusMsg({ type: 'error', text: `No se pudo leer el archivo: ${err.message}` });
    }
  };

  const handleProcessImport = async () => {
    if (!jsonText.trim()) {
      alert("Pegá o cargá los datos para importar.");
      return;
    }

    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        throw new Error("El formato debe ser una lista de objetos JSON [ { ... }, { ... } ]");
      }

      const count = await onImport(parsed, currentUser.name);
      setStatusMsg({ type: 'success', text: `¡Éxito! Se importaron ${count} clientes correctamente.` });
      setTimeout(() => {
        setStatusMsg(null);
        setJsonText('');
        onClose();
      }, 1500);

    } catch (err) {
      setStatusMsg({ type: 'error', text: `Error al procesar: ${err.message}` });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-brand-500/20 text-brand-400 rounded-lg">
              <UploadCloud className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Importador de Clientes</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-300">
            Subí un archivo <strong className="text-white">Excel (.xlsx / .xls), CSV o JSON</strong>, o pegá los datos
            directamente en formato JSON. Los registros se cargan al CRM para su revisión antes de importar.
          </p>

          {/* File Upload */}
          <label className="flex items-center justify-center gap-3 border-2 border-dashed border-slate-700 hover:border-brand-500/60 rounded-xl p-5 cursor-pointer bg-slate-950/50 transition-all group">
            <div className="p-2.5 rounded-lg bg-brand-500/15 text-brand-400 border border-brand-500/30 group-hover:scale-105 transition-transform">
              <FileUp className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white">Seleccionar archivo Excel / CSV / JSON</p>
              <p className="text-[11px] text-slate-400">Soporta columnas: Nombre, Empresa, Teléfono, WhatsApp, Email, Rubro, Ciudad, Origen</p>
            </div>
            <input
              type="file"
              accept=".xlsx,.xls,.csv,.json"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <div className="flex justify-end">
            <button
              onClick={handleSampleImport}
              className="text-xs text-brand-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Cargar Ejemplo (Panadería, Pizzería...)</span>
            </button>
          </div>

          <textarea
            rows={8}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder={`[\n  {\n    "Nombre": "Panadería Don José",\n    "Empresa": "Don José S.A.",\n    "Teléfono": "2234771122",\n    "Rubro": "Panadería",\n    "Ciudad": "Mar del Plata",\n    "Origen": "Google Maps"\n  }\n]`}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-200 focus:outline-none focus:border-brand-500"
          />

          {statusMsg && (
            <div className={`p-3 rounded-xl text-xs font-semibold flex items-center space-x-2 ${
              statusMsg.type === 'success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              {statusMsg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{statusMsg.text}</span>
            </div>
          )}

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
            >
              Cancelar
            </button>
            <button
              onClick={handleProcessImport}
              className="px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-brand-600/30"
            >
              Importar Datos
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
