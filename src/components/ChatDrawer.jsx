import React, { useState } from "react";

const INITIAL_MESSAGES = [
  {
    from: "Lunara",
    text: "Welcome to Lunara messages. Connect with players and scouts professionally.",
  },
];

function Message({ from, text }) {
  return (
    <div className={`message ${from === "You" ? "mine" : ""}`}>
      <small>{from}</small>
      <p>{text}</p>
    </div>
  );
}

export default function ChatDrawer({ open, onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  if (!open) return null;

  const send = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { from: "You", text: message.trim() }]);
      setMessage("");
    }
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="chat-drawer" onClick={(e) => e.stopPropagation()}>
        {/* ── Drawer header ── */}
        <div className="drawer-head">
          <div>
            <span className="eyebrow">LUNARA NETWORK</span>
            <h3>Messages</h3>
          </div>
          <button onClick={onClose} className="close-btn">
            ×
          </button>
        </div>

        {/* ── Message list ── */}
        <div className="message-list">
          {messages.map((m, i) => (
            <Message key={i} from={m.from} text={m.text} />
          ))}
        </div>

        {/* ── Composer ── */}
        <form className="message-form" onSubmit={send}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message..."
          />
          <button className="primary-btn">Send</button>
        </form>
      </aside>
    </div>
  );
}