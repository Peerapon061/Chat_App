// import PropTypes from 'prop-types';
import { useState } from "react";
import {FetchLogin} from "../composable/FetchData";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const inputUsername = (event)=>{
    setUsername(event.target.value)
  }
  const inputPassword = (event)=>{
    setPassword(event.target.value)
  }
  const signIn = async(e)=>{
    e.preventDefault();
    const data={username:username,password:password}
    await FetchLogin(data)
    const token = localStorage.getItem('authToken');
    if(token)navigate("/home")
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign In</h2>
        <form className="space-y-4" 
        onSubmit={signIn}
        >
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="username"
              id="username"
              placeholder="Enter your username"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onBlur={inputUsername}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onBlur={inputPassword}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <a href="/register" className="font-medium text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

// LoginComponent.propTypes={
//   title:PropTypes.string.isRequired,
//   amount:PropTypes.number.isRequired
// }

export default LoginPage