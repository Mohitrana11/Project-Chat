import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

const dummyChats = [
  {
    id: "1",
    username: "john_doe",
    fullName: "John Doe",
    email: "john@example.com",
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=64&q=80",
    bio: "Web developer and tech enthusiast.",
    lastMessage: "Hey, how are you?",
    messages: [
      {
        id: "m1",
        sender: "John Doe",
        content: "Hey, how are you?",
        timestamp: "10:00 AM",
      },
      {
        id: "m2",
        sender: "You",
        content: "I'm good, thanks! How about you?",
        timestamp: "10:01 AM",
      },
    ],
  },
  {
    id: "2",
    username: "jane_smith",
    fullName: "Jane Smith",
    email: "jane@example.com",
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=64&q=80",
    bio: "Graphic designer and illustrator.",
    lastMessage: "Did you check the report?",
    messages: [
      {
        id: "m1",
        sender: "Jane Smith",
        content: "Did you check the report?",
        timestamp: "9:00 AM",
      },
      {
        id: "m2",
        sender: "You",
        content: "Not yet, will do today.",
        timestamp: "9:05 AM",
      },
    ],
  },
  {
    id: "3",
    username: "michael_b",
    fullName: "Michael Brown",
    email: "michael@example.com",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=64&q=80",
    bio: "Marketing expert and content creator.",
    messages: [],
  },
];

function ChatApp() {
  const [chats, setChats] = useState(dummyChats);
  const [selectedChatId, setSelectedChatId] = useState(chats[0].id);
  const [messages, setMessages] = useState(chats[0].messages);

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
    const chat = chats.find((c) => c.id === chatId);
    setMessages(chat ? chat.messages : []);
  };

  const handleSendMessage = (content) => {
    if (!content.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: "You",
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedChatId
          ? {
              ...chat,
              lastMessage: content,
              messages: [...chat.messages, newMessage],
            }
          : chat
      )
    );
  };

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  return (
    <div className="flex flex-col pl-[40px] sm:pl-[50px] md:pl-[60px] md:flex-row h-screen bg-gray-100">
      <ChatList
        chats={chats}
        selectedChatId={selectedChatId}
        onSelectChat={handleSelectChat}
      />
      <ChatWindow
        messages={messages}
        user={selectedChat ? selectedChat.username : ""}
        avatar={selectedChat ? selectedChat.avatar : ""}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default ChatApp;
