import React, { useState } from "react";
import "../../../Style/ChatArea.css";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import UserSearch from "../Search/UserSearch";

function ChatList({ chats, selectedChatId, onSelectChat }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = chats.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full md:w-1/3 border-r border-gray-300 flex flex-col bg-white">
      <div className="px-4 py-4 border-b border-gray-100 font-bold text-xl text-gray-700 flex flex-row item-center justify-center chat-heading m-2">
        <IoChatboxEllipsesOutline className="text-red-800" />
        Chat
      </div>
      <UserSearch
        Search
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        users={filteredUsers}
        onSelectChats={onSelectChat}
        selectedChatId={selectedChatId}
      />
    </div>
  );
}

export default ChatList;
