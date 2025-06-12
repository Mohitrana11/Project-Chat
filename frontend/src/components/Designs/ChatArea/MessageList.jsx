import React from "react";

function MessageList({ messages }) {
  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.sender === "You" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`rounded-lg px-4 py-2 max-w-xs break-words ${
              msg.sender === "You"
                ? "bg-blue-500 text-white rounded-br-none"
                : "bg-gray-300 text-gray-900 rounded-bl-none"
            }`}
          >
            <div className="text-sm">{msg.content}</div>
            <div className="text-xs text-right opacity-70 mt-1">
              {msg.timestamp}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
