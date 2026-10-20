import React, { useState } from 'react';

function ScoutVerification() {
  const [docDetails, setDocDetails] = useState({
    licenseNumber: '',
    emailDomain: '',
    submitted: false
  });

  const handleValidationRequest = (e) => {
    e.preventDefault();
    if (!docDetails.licenseNumber || !docDetails.emailDomain) {
      return alert("Complete all mandatory operational validation files.");
    }

    if (docDetails.emailDomain.endsWith('@gmail.com') || docDetails.emailDomain.endsWith('@yahoo.com')) {
      return alert("Compliance Warning: Public consumer email domains are prohibited for organizational recruitment access.");
    }

    setDocDetails({ ...docDetails, submitted: true });
    alert("Operational credentials locked for admin oversight processing.");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-slate-100 font-sans animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-md">
        <h1 className="text-xl font-bold tracking-tight text-white font-mono uppercase">Organizational Compliance Registry</h1>
        <p className="text-xs text-slate-400 mt-0.5">Compliance confirmation checks are required before establishing any external contact vectors.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
        <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">Vetting Documentation Parameters</h3>
          <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border
            ${docDetails.submitted ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
            {docDetails.submitted ? 'Application Pending Audit' : 'Awaiting Core Credentials'}
          </span>
        </div>

        <form onSubmit={handleValidationRequest} className="space-y-4 text-xs">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Institutional Club / Corporate Domain Email</label>
            <input 
              type="text" placeholder="e.g., recruiter@acmilan.it" 
              value={docDetails.emailDomain} onChange={(e) => setDocDetails({ ...docDetails, emailDomain: e.target.value })}
              disabled={docDetails.submitted}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-sky-500 disabled:opacity-40 transition-opacity" 
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">FIFA Licensing Agency Certificate ID</label>
            <input 
              type="text" placeholder="e.g., FIFA-LIC-99201" 
              value={docDetails.licenseNumber} onChange={(e) => setDocDetails({ ...docDetails, licenseNumber: e.target.value })}
              disabled={docDetails.submitted}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-sky-500 disabled:opacity-40 transition-opacity" 
            />
          </div>

          <button 
            type="submit"
            disabled={docDetails.submitted}
            className="w-full bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-500 font-bold py-2.5 rounded transition-colors uppercase tracking-wider text-[11px]"
          >
            {docDetails.submitted ? "Validation Queue Locked Successfully" : "File Authentication Request Data"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ScoutVerification;
