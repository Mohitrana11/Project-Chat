import React, { useState } from "react";

const dummyGroups = [
  {
    id: "g1",
    name: "Frontend Devs",
    description: "Discuss UI/UX and frontend tech",
    members: [
      { id: "u1", name: "John Doe" },
      { id: "u2", name: "Jane Smith" },
      { id: "u3", name: "You" },
    ],
  },
  {
    id: "g2",
    name: "Backend Wizards",
    description: "All about APIs and server-side",
    members: [
      { id: "u4", name: "Alice Brown" },
      { id: "u5", name: "Bob Johnson" },
    ],
  },
];

export default function GroupApp() {
  const [groups, setGroups] = useState(dummyGroups);
  const [selectedGroupId, setSelectedGroupId] = useState(dummyGroups[0].id);

  const selectedGroup = groups.find((g) => g.id === selectedGroupId);

  // Example stubs for action handlers (no backend)
  const handleRenameGroup = () => {
    const newName = prompt("Enter new group name", selectedGroup.name);
    if (newName && newName.trim() !== "") {
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === selectedGroupId ? { ...group, name: newName } : group
        )
      );
    }
  };

  const handleAddSelfToGroup = () => {
    alert("Added yourself to the group (stub).");
  };

  const handleExitGroup = () => {
    alert("Exited the group (stub).");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <GroupList
        groups={groups}
        selectedGroupId={selectedGroupId}
        onSelectGroup={setSelectedGroupId}
      />
      <div className="flex flex-col flex-grow p-6 bg-white">
        {selectedGroup ? (
          <>
            <GroupDetail group={selectedGroup} />
            <div className="flex flex-col md:flex-row gap-6 mt-6 flex-grow">
              <GroupMemberList members={selectedGroup.members} />
              <GroupActions
                onRename={handleRenameGroup}
                onAddSelf={handleAddSelfToGroup}
                onExit={handleExitGroup}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-grow text-gray-400 italic">
            No group selected
          </div>
        )}
      </div>
    </div>
  );
}

function GroupList({ groups, selectedGroupId, onSelectGroup }) {
  return (
    <div className="md:w-1/4 border-r border-gray-300 bg-white flex flex-col">
      <div className="p-4 font-bold text-lg border-b border-gray-300">
        Groups
      </div>
      <div className="flex-grow overflow-y-auto">
        {groups.map((group) => (
          <div
            key={group.id}
            onClick={() => onSelectGroup(group.id)}
            className={`cursor-pointer px-4 py-3 border-b border-gray-200 hover:bg-gray-100 ${
              group.id === selectedGroupId ? "bg-blue-100 font-semibold" : ""
            }`}
          >
            {group.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function GroupDetail({ group }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900">{group.name}</h2>
      <p className="text-gray-600 mt-2">{group.description}</p>
    </div>
  );
}

function GroupMemberList({ members }) {
  return (
    <div className="md:w-1/2 bg-gray-100 rounded-md p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Group Members
      </h3>
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {members.map((member) => (
          <li
            key={member.id}
            className="bg-white p-3 rounded-md shadow-sm flex items-center"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold uppercase mr-3">
              {member.name.charAt(0)}
            </div>
            <span className="text-gray-700">{member.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GroupActions({ onRename, onAddSelf, onExit }) {
  return (
    <div className="md:w-1/2 bg-gray-100 rounded-md p-4 flex flex-col justify-start gap-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Actions</h3>
      <button
        onClick={onRename}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
      >
        Rename Group
      </button>
      <button
        onClick={onAddSelf}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
      >
        Add Myself To Group
      </button>
      <button
        onClick={onExit}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition"
      >
        Exit Group
      </button>
    </div>
  );
}
