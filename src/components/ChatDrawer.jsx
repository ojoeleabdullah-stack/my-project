import React, { useState, useEffect, useRef } from 'react';

function ChatDrawer({ isOpen, onClose, playerName, clubName }) {
  // Chat stream memory state
  const [messages, setMessages] = useState([
    { id: 1, sender: 'scout', text: `Hello ${playerName}, I watched your agility drills clip on the Lunara feed. Very impressive footwork.`, time: '10:42 AM' },
    { id: 2, sender: 'scout', text: `Are you currently under any official representation, or are you open to international trials?`, time: '10:43 AM' }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // Automatically scroll chat to bottom when a new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'scout', // Simulating the active logged-in scout typing
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setInputText('');

    // Simulate an automated player response after 1.5 seconds to make the app feel alive!
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'player',
        text: `Thank you sir! Yes, I am open to trials with ${clubName}. I train everyday with Lagos Football Academy.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex justify-end animate-fade-in">
      {/* Sliding Main Panel Box */}
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between text-white shadow-2xl">
        
        {/* Chat Header Area */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 font-black text-sm flex items-center justify-center">
              {playerName.substring(0,2).toUpperCase()}
            </div>
            <div>
              <h3 className="font-bold text-sm flex items-center gap-1.5">
                {playerName} <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-mono animate-pulse">Online</span>
              </h3>
              <p className="text-[11px] text-slate-400">Prospect • {clubName}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-700/60"
          >
            Close
          </button>
        </div>

        {/* Dynamic Messages Scroll Timeline */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/40">
          {messages.map((msg) => {
            const isScout = msg.sender === 'scout';
            return (
              <div key={msg.id} className={`flex ${isScout ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm
                  ${isScout 
                    ? 'bg-gradient-to-r from-pink-600 to-orange-500 text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700/40'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="block text-[8px] opacity-60 text-right mt-1 font-mono">{msg.time}</span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Interactive Bar */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-900/60 flex gap-2 items-center">
          <input 
            type="text" 
            placeholder={`Message ${playerName.split(' ')[0]}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/40 text-white"
          />
          <button 
            type="submit" 
            className="bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600 font-bold px-4 py-2.5 rounded-xl text-xs shadow-md active:scale-95 transition-all text-white"
          >
            Send
          </button>
        </form>

      </div>
    </div>
  );
}

export default ChatDrawer;
