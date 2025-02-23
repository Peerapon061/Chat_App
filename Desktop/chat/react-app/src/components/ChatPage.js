import { useRef,useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import LogoutButton from './button/LogoutButton';
import { FetchChatHistory } from '../composable/FetchData';
import HomeButton from './button/HomeButton';
import { jwtDecode } from "jwt-decode";
// import socket from '../composable/Socket';

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const location = useLocation();
  const { roomName,id } = location.state;
  const [userId, setUserId] = useState();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const socketConnection = io("http://localhost:3333");
    setSocket(socketConnection);

    socketConnection.emit("joinRoom", id );
    // Listen for incoming messages
    socketConnection.on("chat message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socketConnection.disconnect();
    };
  },[id]);

  useEffect(() => {
    const fetchData = async(roomId)=>{
      const data = await FetchChatHistory(roomId)
      setMessages(data)
      console.log(data)
    }
    fetchData(id)
    const token = localStorage.getItem('authToken')
    const userInfo = jwtDecode(token)
    setUserId(userInfo.userId)
  },[id])

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageBase64 = reader.result 
        const data={senderId:userId,roomId:id,message:imageBase64,type:"image"}
        socket.emit('chat message', data);
      };

      reader.readAsDataURL(file); // Read image as Base64

      // const formData = new FormData();
      // formData.append('file', file);
      // const data={senderId:userId,roomId:id,message:imageBase64,type:"image"}

    }
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    const data={senderId:userId,roomId:id,message:message,type:"text"}
    if (message.trim()) {
      socket.emit("chat message", data);
      setMessage("");
    }
  };



  const renderMessages = () => {
    return messages.map((msg, index) => {
      if (msg.type === 'image') {
        return(          
        <li key={index} className="p-2 bg-gray-200 rounded">
          <div className='font-bold'>{msg.userDetail.username}</div>
          <img key={index} src={`http://localhost:3333/${msg.message}`} alt="Sent" />
        </li>)
      } else {
        return (          <li key={index} className="p-2 bg-gray-200 rounded">
          <div className='font-bold'>{msg.userDetail.username}</div>
          {msg.message}
        </li>)
      }
    });
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">

      <div className="top-0 left-0 mb-4 w-full bg-white shadow-md z-10">
        <div className="flex items-center justify-between max-w-6xl mx-auto px-4 py-3">
          {/* Left Section: Logo or Title */}
          <div className="text-lg font-bold text-gray-800">
          room name : {roomName}
          </div>

          {/* Right Section: Buttons */}
          <div className="flex space-x-4">
            <div className="m-1">
              <LogoutButton />
            </div>
            <div className="m-1">
              <HomeButton />
            </div>
          </div>
        </div>
      </div>
      <ul
        id="messages"
        className="flex-1 overflow-y-auto bg-white p-4 rounded shadow-md space-y-2"
        ref={messagesEndRef}
      >
        {/* {messages.map((msg, index) => (
          <li key={index} className="p-2 bg-gray-200 rounded">
            <div className='font-bold'>{msg.userDetail.username}</div>
            {msg.message}
          </li>
        ))} */}
        {renderMessages()}
      </ul>

      {/* Message Input */}
      <form
        id="form"
        onSubmit={handleSendMessage}
        className="mt-4 flex items-center gap-2"
      >
        <input
          id="input"
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type a message"
          className="flex-1 p-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Send
        </button>
      </form>
      <input type="file" onChange={handleImageUpload} />
    </div>
  );
};

export default ChatPage