import React from "react";
import { VscSend } from "react-icons/vsc";
function MessageInput({ value, onChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex border-t border-gray-100 items-center  p-4 bg-white"
    >
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-grow rounded-full px-4 py-2 mr-4  outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="submit" className="mr-[15px] text-2xl cursor-pointer">
        <VscSend className="font-bold" />
      </button>
    </form>
  );
}

export default MessageInput;
