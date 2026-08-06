import React from 'react';
import { 
  Users, 
  Sparkles, 
  PhoneCall, 
  MessageSquareText, 
  Flame, 
  FileCheck2, 
  CheckCircle2, 
  XCircle, 
  BellRing, 
  Calendar, 
  ArrowRight,
  MessageCircle,
  AlertTriangle,
  TrendingUp,
  BarChart3
} from 'lucide-react';

const CLOSED_STATUSES = ['Cliente', 'Perdido'];

const PIPELINE = [
  { label: 'Nuevo', color: 'bg-purple-500', text: 'text-purple-300' },
  { label: 'Contactado', color: 'bg-cyan-500', text: 'text-cyan-300' },
  { label: 'Respondió', color: 'bg-indigo-500', text: 'text-indigo-300' },
  { label: 'Interesado', color: 'bg-amber-500', text: 'text-amber-300' },
  { label: 'Presupuesto enviado', color: 'bg-sky-500', text: 'text-sky-300' },
  { label: 'Cliente', color: 'bg-emerald-500', text: 'text-emerald-300' },
  { label: 'Perdido', color: 'bg-rose-500', text: 'text-rose-300' }
];

const FollowUpCard = ({ client, onSelectClient }) => {
  const cleanPhone = (client.whatsapp || client.phone || '').replace(/\D/g, '');
  return (
    <div className="bg-slate-800/70 border border-slate-700/80 hover:border-brand-500/50 rounded-xl p-4 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h4
            onClick={() => onSelectClient(client)}
            className="font-bold text-white hover:text-brand-400 cursor-pointer transition-colors text-base line-clamp-1"
          >
            {client.name}
          </h4>
          <span className="text-xs px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 font-semibold border border-slate-700 flex-shrink-0">
            {client.status}
          </span>
        </div>
        {client.company && client.company !== client.name && (
          <p className="text-xs text-slate-400 mb-2 truncate">{client.company}</p>
        )}
        <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
          <span className="bg-slate-900/60 px-2 py-1 rounded text-slate-300 font-medium">
            📍 {client.rubro}
          </span>
          <span>{client.city}</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-slate-700/50 gap-2">
        {cleanPhone ? (
          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hola ${client.name}, te hablo de Naro AI...`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        ) : (
          <span className="text-xs text-slate-500">Sin WhatsApp</span>
        )}
        <button
          onClick={() => onSelectClient(client)}
          className="flex items-center space-x-1 px-3 py-1.5 bg-brand-600/20 hover:bg-brand-600/30 text-brand-300 border border-brand-500/30 rounded-lg text-xs font-semibold transition-all"
        >
          <span>Ver Historial</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

const FollowUpGroup = ({ title, subtitle, badge, badgeColor, clients, onSelectClient }) => {
  if (!clients.length) return null;
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex items-center gap-2 mb-3">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">{title}</h4>
        <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${badgeColor}`}>{clients.length}</span>
        {subtitle && <span className="text-[11px] text-slate-500">{subtitle}</span>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {clients.map((client) => (
          <FollowUpCard key={client.id} client={client} onSelectClient={onSelectClient} />
        ))}
      </div>
    </div>
  );
};

export const Dashboard = ({ clients, onSelectClient, onFilterByStatus }) => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const plus3 = new Date(today.getTime() + 3 * 86400000).toISOString().split('T')[0];

  // Calculate metrics dynamically
  const totalCount = clients.length;
  const getCount = (status) => clients.filter(c => c.status === status).length;

  const nuevosCount = getCount('Nuevo');
  const contactadosCount = getCount('Contactado');
  const respondioCount = getCount('Respondió');
  const interesadosCount = getCount('Interesado');
  const presupuestoCount = getCount('Presupuesto enviado');
  const clienteCount = getCount('Cliente');
  const perdidosCount = getCount('Perdido');

  // Follow-up buckets (exclude won/lost clients from pending reminders)
  const isPending = (c) => !CLOSED_STATUSES.includes(c.status);
  const overdue = clients.filter(c => isPending(c) && c.nextFollowUp && c.nextFollowUp < todayStr);
  const todayFollowUps = clients.filter(c => isPending(c) && c.nextFollowUp === todayStr);
  const upcoming = clients.filter(c => isPending(c) && c.nextFollowUp && c.nextFollowUp > todayStr && c.nextFollowUp <= plus3);

  const totalPending = overdue.length + todayFollowUps.length;

  const kpis = [
    { label: 'Total Clientes', count: totalCount, status: 'Todos', color: 'from-blue-500/20 to-slate-800', border: 'border-blue-500/30', text: 'text-blue-400', icon: Users },
    { label: 'Nuevos', count: nuevosCount, status: 'Nuevo', color: 'from-purple-500/20 to-slate-800', border: 'border-purple-500/30', text: 'text-purple-400', icon: Sparkles },
    { label: 'Contactados', count: contactadosCount, status: 'Contactado', color: 'from-cyan-500/20 to-slate-800', border: 'border-cyan-500/30', text: 'text-cyan-400', icon: PhoneCall },
    { label: 'Respondió', count: respondioCount, status: 'Respondió', color: 'from-indigo-500/20 to-slate-800', border: 'border-indigo-500/30', text: 'text-indigo-400', icon: MessageSquareText },
    { label: 'Interesados', count: interesadosCount, status: 'Interesado', color: 'from-amber-500/20 to-slate-800', border: 'border-amber-500/30', text: 'text-amber-400', icon: Flame },
    { label: 'Presupuesto enviado', count: presupuestoCount, status: 'Presupuesto enviado', color: 'from-sky-500/20 to-slate-800', border: 'border-sky-500/30', text: 'text-sky-400', icon: FileCheck2 },
    { label: 'Clientes (Ganados)', count: clienteCount, status: 'Cliente', color: 'from-emerald-500/20 to-slate-800', border: 'border-emerald-500/30', text: 'text-emerald-400', icon: CheckCircle2 },
    { label: 'Perdidos', count: perdidosCount, status: 'Perdido', color: 'from-rose-500/20 to-slate-800', border: 'border-rose-500/30', text: 'text-rose-400', icon: XCircle },
  ];

  // Pipeline funnel
  const maxPipeline = Math.max(...PIPELINE.map(p => getCount(p.label)), 1);

  // Clients won per month (last 6 months)
  const closedClients = clients.filter(c => c.status === 'Cliente');
  const monthLabel = (ym) => {
    const [y, m] = ym.split('-').map(Number);
    return new Date(y, m - 1, 1).toLocaleDateString('es-AR', { month: 'short' });
  };
  const lastMonths = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    lastMonths.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }
  const monthCounts = lastMonths.map((ym) => ({
    ym,
    label: monthLabel(ym),
    count: closedClients.filter((c) => (c.closedDate || c.lastContact || c.firstContact || '').slice(0, 7) === ym).length
  }));
  const maxMonth = Math.max(...monthCounts.map(m => m.count), 1);

  return (
    <div className="space-y-6">

      {/* Notification Banner */}
      {overdue.length > 0 ? (
        <div className="bg-gradient-to-r from-rose-500/15 via-rose-500/10 to-amber-500/10 border border-rose-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-rose-500/20 rounded-xl text-rose-400 border border-rose-500/30 flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                ¡Hay seguimientos vencidos!
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-extrabold">
                  {overdue.length}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Tenés <strong className="text-rose-300 font-semibold">{overdue.length} clientes vencidos</strong>
                {todayFollowUps.length > 0 && (
                  <> y <strong className="text-amber-300 font-semibold">{todayFollowUps.length} para hoy</strong></>
                )}. Priorizalos para avanzar en el pipeline.
              </p>
            </div>
          </div>
        </div>
      ) : todayFollowUps.length > 0 ? (
        <div className="bg-gradient-to-r from-amber-500/15 via-brand-500/15 to-purple-500/15 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400 border border-amber-500/30 flex-shrink-0 animate-bounce">
              <BellRing className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                ¡Seguimientos para hoy!
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold">
                  {todayFollowUps.length}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Tenés <strong className="text-amber-300 font-semibold">{todayFollowUps.length} clientes</strong> programados para contactar hoy.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Al día con los seguimientos</h4>
              <p className="text-xs text-slate-400">No hay tareas pendientes para hoy ni atrasadas.</p>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <button
              key={kpi.label}
              onClick={() => onFilterByStatus(kpi.status)}
              className={`bg-gradient-to-b ${kpi.color} border ${kpi.border} rounded-xl p-3 sm:p-4 text-left transition-all hover:scale-[1.03] hover:shadow-lg group flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-semibold ${kpi.text} truncate`}>{kpi.label}</span>
                <Icon className={`w-4 h-4 ${kpi.text} opacity-80 group-hover:opacity-100`} />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {kpi.count}
              </div>
            </button>
          );
        })}
      </div>

      {/* Follow-ups Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-brand-500/10 rounded-lg text-brand-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Próximos Seguimientos</h3>
              <p className="text-xs text-slate-400">Vencidos, hoy y próximos 3 días</p>
            </div>
          </div>
          <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full font-medium">
            {todayStr}
          </span>
        </div>

        {totalPending === 0 && upcoming.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <p className="text-sm">🎉 ¡Excelente! No tenés seguimientos pendientes ni próximos.</p>
          </div>
        ) : (
          <div>
            <FollowUpGroup
              title="Vencidos"
              subtitle="contactar lo antes posible"
              badgeColor="bg-rose-500/20 text-rose-300 border border-rose-500/30"
              clients={overdue}
              onSelectClient={onSelectClient}
            />
            <FollowUpGroup
              title="Para Hoy"
              badgeColor="bg-amber-500/20 text-amber-300 border border-amber-500/30"
              clients={todayFollowUps}
              onSelectClient={onSelectClient}
            />
            <FollowUpGroup
              title="Próximos 3 Días"
              badgeColor="bg-sky-500/20 text-sky-300 border border-sky-500/30"
              clients={upcoming}
              onSelectClient={onSelectClient}
            />
          </div>
        )}
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Funnel */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center space-x-2.5 mb-5 pb-3 border-b border-slate-800">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Pipeline Comercial</h3>
              <p className="text-xs text-slate-400">Distribución de clientes por etapa</p>
            </div>
          </div>
          <div className="space-y-3.5">
            {PIPELINE.map((stage) => {
              const count = getCount(stage.label);
              const width = count === 0 ? 0 : Math.max((count / maxPipeline) * 100, 6);
              return (
                <button
                  key={stage.label}
                  onClick={() => onFilterByStatus(stage.label)}
                  className="w-full group"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className={`font-semibold ${stage.text}`}>{stage.label}</span>
                    <span className="text-slate-300 font-bold">{count}</span>
                  </div>
                  <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${stage.color} transition-all duration-500 group-hover:brightness-125`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Closed clients per month */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center space-x-2.5 mb-5 pb-3 border-b border-slate-800">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Clientes Ganados</h3>
              <p className="text-xs text-slate-400">Cierres por mes (últimos 6 meses)</p>
            </div>
          </div>
          {closedClients.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <p className="text-sm">Todavía no cerraste clientes. ¡A seguir prospeccionando!</p>
            </div>
          ) : (
            <div className="flex items-end justify-between gap-2 h-40">
              {monthCounts.map((m) => (
                <div key={m.ym} className="flex-1 flex flex-col items-center justify-end gap-1.5 h-full">
                  <span className="text-[11px] font-bold text-white">{m.count}</span>
                  <div
                    className={`w-full max-w-[46px] rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all duration-500 hover:brightness-125 ${
                      m.count === 0 ? 'opacity-30' : ''
                    }`}
                    style={{ height: m.count === 0 ? '6px' : `${(m.count / maxMonth) * 100}%` }}
                  />
                  <span className="text-[10px] text-slate-400 capitalize">{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
