import React from "react";

function UserProfile({ user }) {
  if (!user) {
    return (
      <div className="md:w-2/3 flex items-center justify-center text-gray-400 italic text-lg">
        Select a user to see their profile
      </div>
    );
  }
  return (
    <div className="md:w-2/3 p-8 bg-white flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <img
          src={user.avatar}
          alt={user.username}
          className="w-28 h-28 rounded-full object-cover shadow"
          loading="lazy"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{user.fullName}</h2>
          <p className="text-blue-600 font-mono">@{user.username}</p>
          <p className="text-gray-500 mt-1">{user.email}</p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
        <p className="text-gray-700">{user.bio}</p>
      </div>
    </div>
  );
}

export default UserProfile;
