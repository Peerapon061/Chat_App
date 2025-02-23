import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './button/LogoutButton';
import { FetchUserExceptUserId,FetchCreateRoom } from '../composable/FetchData';
import HomeButton from './button/HomeButton';
const CreateChatPage = () => {
    const navigate = useNavigate()
    const [users,SetUsers] = useState([])
    const [roomName,SetRoomName] = useState("")
    const [chatPartner, setChatPartner] = useState("");

    useEffect(() =>{
        const fetchData = async () => {
            const data = await FetchUserExceptUserId();
            SetUsers(data)
        }
        fetchData()
    })
    const createRoomFunction=async(e)=>{
        e.preventDefault();
        const data = {roomName:roomName,ChatParterId:chatPartner}
        await FetchCreateRoom(data)
        navigate('/home')
    }
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">

        <div className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
            <div className="flex items-center justify-between max-w-6xl mx-auto px-4 py-3">
              {/* Left Section: Logo or Title */}
              <div className="text-lg font-bold text-gray-800">
                CHAT WITH ME
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
    
        {/* Form */}
        <form
          onSubmit={createRoomFunction}
          className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
            Create Chatroom
          </h2>
    
          {/* Chatroom Name Input */}
          <div className="mb-4">
            <label
              htmlFor="chatroomName"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Chatroom Name
            </label>
            <input
              type="text"
              id="chatroomName"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter chatroom name"
              value={roomName}
              onChange={(e) => SetRoomName(e.target.value)}
            />
          </div>
    
          {/* Chat Partner Selection */}
          <div className="mb-6">
            <label
              htmlFor="chatPartner"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Chat Partner
            </label>
            <select
              id="chatPartner"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={chatPartner}
              onChange={(e) => setChatPartner(e.target.value)}
            >
              <option value="" disabled>
                Choose a partner
              </option>
              {users.map((partner, index) => (
                <option key={index} value={partner.id}>
                  {partner.username}
                </option>
              ))}
            </select>
          </div>
    
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Create Chatroom
          </button>
        </form>
      </div>
    );    
}

export default CreateChatPage;