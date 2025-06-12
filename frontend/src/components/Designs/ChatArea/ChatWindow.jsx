import React, { useEffect, useRef, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function ChatWindow({ messages, onSendMessage, user, avatar }) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex flex-col flex-grow h-full">
      <div className="w-full h-[60px] flex items-center px-5 border-b border-gray-100 bg-white chat-window">
        <div className="flex flex-row item-center">
          <div className="w-[35px] h-[35px] flex items-center mr-2">
            <img
              src={avatar}
              alt=""
              className="w-[35px] h-[35px] rounded-[50%] hover:scale-105 hover:duration-250 "
            />
          </div>
          <div className="flex ml-1 ">
            <h1 className="font-semibold text-lg text-gray-900">{user}</h1>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-4 bg-white">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>
      <MessageInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default ChatWindow;
