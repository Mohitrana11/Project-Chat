import React, { useState } from "react";
import UserSearch from "./Search/UserSearch";
import UserProfile from "./UserDetails/UserProfile";

const dummyUsers = [
  {
    id: "1",
    username: "john_doe",
    fullName: "John Doe",
    email: "john@example.com",
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=64&q=80",
    bio: "Web developer and tech enthusiast.",
  },
  {
    id: "2",
    username: "jane_smith",
    fullName: "Jane Smith",
    email: "jane@example.com",
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=64&q=80",
    bio: "Graphic designer and illustrator.",
  },
  {
    id: "3",
    username: "michael_b",
    fullName: "Michael Brown",
    email: "michael@example.com",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=64&q=80",
    bio: "Marketing expert and content creator.",
  },
];

export default function UserComponents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = dummyUsers.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex pl-[60px] flex-col md:flex-row h-full min-h-[400px] bg-gray-50 rounded-lg shadow-lg overflow-hidden">
      <UserSearch
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        users={filteredUsers}
        onUserSelect={setSelectedUser}
        selectedUser={selectedUser}
      />
      <UserProfile user={selectedUser} />
    </div>
  );
}
