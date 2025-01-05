import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";
//remember to add semi colon the end if not it will not render!


import { FiSend } from "react-icons/fi";
import { useParams } from "react-router-dom";

interface Message {
    id: number;
    chatID : number, // or number, depending on how you store it
    senderID: string | null;
    content: string
    timestamp: string;
}
const Chat = () => {
    const {chatId,favourId} = useParams();
    const [messageInput, setMessageInput] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const senderId = localStorage.getItem('userId');
    const [favourTitle,setFavourTitle] = useState<string>("");
    const [postCreator,setPostCreator] = useState<number>(-1);
    // Fetch messages when the component is mounted
    const chatIdInt = Number(chatId);

    if (senderId === null){
        console.log("Cannot obtain senderId");
    }

    useEffect(() => {
        if (chatId) {
          axios
            .get(`http://localhost:8080/chats/${chatId}`)
            .then((response) => {
                console.log(response);
              // Map the response data to the expected Message type
              const messagesWithChatId = response.data.messages.map((message: any) => ({
                ...message,
                chatId: parseInt(chatId), // Ensure chatId is included
              }));
              setMessages(messagesWithChatId); 
            })
            .catch((error) => {
              console.error("Error fetching messages:", error);
            });
        }

        //retrieving favour name kiv
        if (favourId){
            axios
            .get(`http://localhost:8080/posts/${favourId}`)
            .then((response) => {
              const post = response.data;
              const {user_id, title} = post;
              setFavourTitle(title);
              setPostCreator(user_id);
            })
            .catch((error) => {
              console.error("Error fetching favour title:", error);
            });
        }
      }, [chatId,favourId]);
  
      

  const handleSendMessage = () => {
    if (messageInput !== "") {
        const newMessage : Message  = {
        id: messages.length + 1,
        senderID: senderId,
        chatID : chatIdInt,
        content: messageInput,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, newMessage]);

      axios
      .post(`http://localhost:8080/chats/${chatId}/messages`, newMessage)
      .then((response) => {
        console.log("Message sent:", response.data);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });


      setMessageInput("");
    }
  };

 
  return (
    <>
    <Navbar/>
    <div className=" flex flex-col h-screen bg-gray-100">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <div className="ml-4">
            <h3 className="font-semibold text-lg">{postCreator}</h3>
            <h3 className="text-sm text-gray-600">Favour: {favourTitle}</h3>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderID !== null ? "justify-start" : "justify-end"} mb-4`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderID !== null
                  ? "bg-white text-gray-800"
                  : "bg-blue-500 text-white"
              }`}
            >
              <p>{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.senderID !== null ? "text-gray-500" : "text-blue-100"
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center">
          <textarea
            value={messageInput}
            onChange={(e) => {
                setMessageInput(e.target.value)}}
            placeholder="Type a message..."
            className="flex-1 resize-none rounded-lg border border-gray-200 p-3 focus:outline-none focus:border-blue-500 min-h-[44px] max-h-[120px]"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Chat;