import React from "react";
import "../../../Style/ChatArea.css";

function UserSearch({
  searchTerm,
  onSearchTermChange,
  users,
  onSelectChats,
  selectedChatId,
}) {
  const handleUserId = (id) => {
    onSelectChats(id);
  };

  return (
    <div className="flex-grow overflow-y-auto">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>
      <div className="flex-grow overflow-y-auto">
        {users.length === 0 ? (
          <div className="p-4 text-gray-500">No users found</div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserId(user.id)}
              className={`flex items-center gap-3 p-3 cursor-pointer border-b border-gray-200 hover:bg-blue-50 m-[6px] chat-users transition ${
                selectedChatId === user.id ? "bg-blue-100" : ""
              }`}
            >
              <img
                src={user.avatar}
                alt={user.username}
                className="w-12 h-12 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <p className="font-semibold text-gray-900">{user.username}</p>
                <p className="text-sm text-gray-500 truncate">
                  {user.lastMessage}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserSearch;
