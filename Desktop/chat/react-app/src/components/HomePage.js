import { useEffect, useState } from 'react';
import LogoutButton from './button/LogoutButton';
import CreatePageButton from './button/CreateButton';
import AdminButton from './button/AdminButton';
import { FetchChatRoom } from '../composable/FetchData';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
const HomePage = () => {
    const [chatRooms, SetChatRooms] = useState([])
    const navigate = useNavigate()
    const [isAdmin, SetIsAdmin] = useState(false);
    const IsAdmin = () => {
        const token = localStorage.getItem('authToken')
        const userInfo = jwtDecode(token)
        SetIsAdmin(userInfo.role === "ADMIN")
    }
    useEffect(() => {
        const fetchData = async () => {
            const data = await FetchChatRoom();
            SetChatRooms(data)
        }
        fetchData()
        IsAdmin()
    }, [])

    const accessIntoChatRoom = (room) => {
        // console.log(e.target.value)
        console.log(room.roomName)
        navigate('/chat', { state: room })
    }

    return (
        <div>
          {/* Navbar */}
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
                  <CreatePageButton />
                </div>
                {isAdmin && (
                  <div className="m-1">
                    <AdminButton />
                  </div>
                )}
              </div>
            </div>
          </div>
      
          {/* Main Content */}
          <div className="pt-20 flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">Chat Rooms</h1>
              <div className="space-y-4">
                {chatRooms.map((room) => (
                  <div
                    key={room.roomId}
                    className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm cursor-pointer"
                    onClick={() => accessIntoChatRoom(room.roomDetail)}
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{room.roomDetail.roomName}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );      
}

export default HomePage;