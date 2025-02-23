import { useEffect, useState } from "react";
import { FetchAllChatRoom, FetchUser, FetchDeleteRoom, FetchDeleteUser } from "../composable/FetchData";
import HomeButton from "./button/HomeButton";
import LogoutButton from "./button/LogoutButton";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const AdminPage = () => {
  const [rooms, SetRooms] = useState([])
  const [users, SetUsers] = useState([])
  const [userId, SetUserId] = useState()
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDataRoom = async () => {
      const data = await FetchAllChatRoom()
      console.log(data);
      SetRooms(data)
    }
    fetchDataRoom()
    const fetchDataUser = async () => {
      const data = await FetchUser()
      console.log(data);
      SetUsers(data)
    }
    fetchDataUser()
  }, [])
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const decode = jwtDecode(token)
    if (decode.userId === userId) {
      localStorage.removeItem('authToken');
      navigate('/login');
    }
  }, [rooms, users, navigate, userId])
  const handleDeleteRoom = (id) => {
    FetchDeleteRoom(id)
    SetRooms((prevItems) => prevItems.filter((item) => item.id !== id));
  }
  const handleDeleteUser = (id) => {
    SetUserId(id)
    FetchDeleteUser(id)
    SetUsers((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  const handleUpdate = (id) => {
    navigate('/update', { state: { userId: id } })
  }
  return (
    <div>
      <div className="top-0 left-0 w-full bg-white shadow-md z-10">
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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg mb-8">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
              Admin Management - Chat Rooms
            </h1>
            <table className="table-auto w-full border-collapse border border-gray-300 text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600">Room ID</th>
                  <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600">Room Name</th>
                  <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{room.id}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{room.roomName}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="text-red-600 hover:text-red-800 hover:underline text-sm"
                        onClick={() => handleDeleteRoom(room.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
              Admin Management - Users
            </h1>
            <table className="table-auto w-full border-collapse border border-gray-300 text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600">User ID</th>
                  <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600">Username</th>
                  <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{user.id}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{user.username}</td>
                    <td className="border border-gray-300 px-4 py-2 space-x-2">
                      <button
                        className="text-red-600 hover:text-red-800 hover:underline text-sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                        onClick={() => handleUpdate(user.id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;