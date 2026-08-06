import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { isFirebaseConfigured } from '../firebase/config';
import { User, Plus, UploadCloud, ShieldCheck, Database, Users, Download, FileSpreadsheet, FileJson2, Cloud } from 'lucide-react';

export const Navbar = ({ onOpenNewClient, onOpenImporter, onExport }) => {
  const { currentUser, switchUser, availableUsers } = useAuth();
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Status */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 font-bold text-xl">
              C
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-white tracking-tight">CRM Pymes</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30 font-semibold">
                  MVP v1.0
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Gestión Comercial & Prospección</p>
            </div>
          </div>

          {/* Sync indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
            {isFirebaseConfigured ? (
              <>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-emerald-400 font-medium">🔥 Firebase Online</span>
              </>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-emerald-400 font-medium">☁️ Nube Activa (Sincronizado Rodrigo & Compañero)</span>
              </>
            )}
          </div>

          {/* User selector & Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Active User Switcher */}
            <div className="flex items-center bg-slate-800/90 rounded-lg p-1 border border-slate-700">
              <span className="text-xs text-slate-400 font-medium px-2 hidden sm:inline flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" /> Usuario:
              </span>
              {availableUsers.map((user) => {
                const isActive = currentUser.id === user.id;
                return (
                  <button
                    key={user.id}
                    onClick={() => switchUser(user.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? `${user.color} text-white shadow-md`
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                    }`}
                  >
                    <span>{user.avatar}</span>
                    <span>{user.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions */}
            <button
              onClick={onOpenImporter}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition-all"
              title="Importar prospectos desde Excel/CSV"
            >
              <UploadCloud className="w-4 h-4 text-brand-400" />
              <span>Importar</span>
            </button>

            {/* Export dropdown */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setExportOpen((o) => !o)}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition-all"
                title="Exportar clientes como backup"
              >
                <Download className="w-4 h-4 text-brand-400" />
                <span>Exportar</span>
              </button>

              {exportOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setExportOpen(false)} />
                  <div className="absolute right-0 mt-2 z-50 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-48 overflow-hidden">
                    <button
                      onClick={() => { onExport('excel'); setExportOpen(false); }}
                      className="w-full flex items-center space-x-2.5 px-4 py-3 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-all text-left"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                      <span>Excel (.xlsx)</span>
                    </button>
                    <button
                      onClick={() => { onExport('json'); setExportOpen(false); }}
                      className="w-full flex items-center space-x-2.5 px-4 py-3 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-all text-left border-t border-slate-700/60"
                    >
                      <FileJson2 className="w-4 h-4 text-amber-400" />
                      <span>JSON (backup)</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={onOpenNewClient}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white text-xs font-bold shadow-lg shadow-brand-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">Nuevo Cliente</span>
              <span className="sm:hidden">Nuevo</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
