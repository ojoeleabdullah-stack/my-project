import React from 'react';

function AdminModeration({ tickets, setTickets }) {
  
  // Action Handler to resolve/dismiss safety alerts
  const handleResolveTicket = (id, actionTaken) => {
    alert(`Security Action Enforced: Ticket #${id} marked as [${actionTaken}]`);
    setTickets(tickets.map(ticket => {
      if (ticket.id === id) {
        return { ...ticket, status: `Resolved (${actionTaken})` };
      }
      return ticket;
    }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-slate-100 font-sans">
      
      {/* CONTROL ROOM TITLE */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white font-mono uppercase">Platform Safety & Moderation Engine</h1>
          <p className="text-xs text-slate-400 mt-0.5">Moderate content logs, review agent documentation requests, and ban fraudulent activity profiles (Section 4.4).</p>
        </div>
        <div className="bg-slate-950 border border-slate-800 text-slate-400 font-mono text-[10px] px-3 py-1.5 rounded">
          Active Alerts: {tickets.filter(t => !t.status.startsWith('Resolved')).length}
        </div>
      </div>

      {/* TICKETS CENTRAL MATRIX */}
      <div className="space-y-3">
        {tickets.map((ticket) => {
          const isResolved = ticket.status.startsWith('Resolved');
          return (
            <div 
              key={ticket.id} 
              className={`border rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs transition-all
                ${isResolved ? 'bg-slate-950/40 border-slate-900 opacity-50' : 'bg-slate-900 border-slate-800'}`}
            >
              {/* Ticket Parameters */}
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 font-mono text-[9px] font-bold uppercase rounded border
                    ${ticket.type === 'Fraud Claim' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : ''}
                    ${ticket.type === 'Scout Verification Request' ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' : ''}
                    ${ticket.type === 'Suspicious Content' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : ''}
                  `}>
                    {ticket.type}
                  </span>
                  <span className="text-slate-500 font-mono text-[10px]">ID: #{ticket.id}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200 tracking-tight">Target Element: <span className="text-white uppercase font-mono">{ticket.targetName}</span></h4>
                <p className="text-slate-400 leading-relaxed max-w-2xl bg-slate-950/40 p-2.5 rounded border border-slate-850 mt-1">{ticket.details}</p>
                <p className="text-[10px] text-slate-500 font-medium">Filing Reporter Node Source: {ticket.reporter}</p>
              </div>

              {/* Status and Resolution CTA Array */}
              <div className="flex flex-row md:flex-col items-end gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                <div className="text-right">
                  <div className="text-[9px] font-bold uppercase text-slate-500 tracking-wider">Ticket State</div>
                  <span className={`text-[10px] font-mono font-bold uppercase mt-0.5 block
                    ${isResolved ? 'text-slate-500' : 'text-amber-400'}`}>
                    {ticket.status}
                  </span>
                </div>
                
                {!isResolved && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleResolveTicket(ticket.id, "Banned / Dismissed")}
                      className="bg-rose-950/60 hover:bg-rose-900 border border-rose-500/30 text-rose-400 font-bold px-3 py-1.5 rounded uppercase tracking-wider text-[10px] transition-colors"
                    >
                      Enforce Ban
                    </button>
                    <button 
                      onClick={() => handleResolveTicket(ticket.id, "Approved / Safe")}
                      className="bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-400 font-bold px-3 py-1.5 rounded uppercase tracking-wider text-[10px] transition-colors"
                    >
                      Approve/Clear
                    </button>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

export default AdminModeration;
