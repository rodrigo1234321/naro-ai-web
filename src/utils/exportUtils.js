const buildRows = (clients) => clients.map((c) => ({
  Nombre: c.name || '',
  Empresa: c.company || '',
  Teléfono: c.phone || '',
  WhatsApp: c.whatsapp || '',
  Email: c.email || '',
  Rubro: c.rubro || '',
  Ciudad: c.city || '',
  Origen: c.origin || '',
  'Primer Contacto': c.firstContact || '',
  'Último Contacto': c.lastContact || '',
  'Próximo Seguimiento': c.nextFollowUp || '',
  Estado: c.status || '',
  Historial: (c.history || []).map((h) => `[${h.date}] ${h.user}: ${h.note}`).join('\n')
}));

const dateStamp = () => new Date().toISOString().split('T')[0];

const doExport = (clients, XLSX) => {
  const ws = XLSX.utils.json_to_sheet(buildRows(clients));
  ws['!cols'] = [
    { wch: 22 }, { wch: 26 }, { wch: 14 }, { wch: 16 }, { wch: 26 },
    { wch: 16 }, { wch: 14 }, { wch: 18 }, { wch: 14 }, { wch: 14 },
    { wch: 18 }, { wch: 18 }, { wch: 60 }
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Clientes CRM');
  XLSX.writeFile(wb, `clientes-crm-${dateStamp()}.xlsx`);
};

export const exportClientsToExcel = (clients) => {
  const XLSX = window.__XLSX;
  if (XLSX) {
    doExport(clients, XLSX);
    return;
  }
  import('xlsx').then((mod) => {
    window.__XLSX = mod;
    doExport(clients, mod);
  });
};

export const exportClientsToJSON = (clients) => {
  const blob = new Blob([JSON.stringify(clients, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `clientes-crm-backup-${dateStamp()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
