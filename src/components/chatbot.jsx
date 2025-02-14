import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { IoSend } from "react-icons/io5";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post(`${BASE_URL}/chatbot/message`, {
        question: input,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: response.data.response },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Error connecting to chatbot." },
      ]);
    }
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-slate-400">
      <div className="bg-slate-200 shadow-2xl rounded-2xl w-96 h-[500px] flex flex-col overflow-hidden">
        <div className="p-4 bg-blue-600 text-white font-bold text-center text-lg rounded-t-2xl">
          Chatbot
        </div>

     
        <div className="p-3 flex-1 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-2xl max-w-[80%] break-words shadow-md ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200 text-black mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

    
        <div className="p-3 border-t flex items-center bg-gray-100 rounded-b-2xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            <IoSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
