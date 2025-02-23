import { useState } from "react";
import { FetchRegister } from "../composable/FetchData";
import { useNavigate } from "react-router-dom";

const RegisterPage = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [errors, setErrors] = useState([])
  const navigate = useNavigate(); 

  const inputUsername = (event) => {
    setUsername(event.target.value)
  }
  const inputPassword = (event) => {
    setPassword(event.target.value)
  }
  const inputRole= (event) => {
    setRole(event.target.value)
  }
  const inputConfirmedPassword = (event) => {
    setConfirmedPassword(event.target.value)
  }
  const register = (e) => {
    e.preventDefault();
    const data = { username: username, password: password, password_confirmation: confirmedPassword,role:role }
    const response= FetchRegister(data)
    response.then((result)=>{
      if(result.status)navigate("/login")
      else{
        result.message.then((result)=>{
          setErrors(result)
        })    
      }
    })
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign In</h2>
        <form className="space-y-4"
          onSubmit={register}
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
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Confirmed Password
            </label>
            <input
              type="password"
              id="confirmed_password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onBlur={inputConfirmedPassword}
            />
          </div>
          <div>
            <select id="role" value={role} onChange={inputRole}>
              <option value="" disabled>
                -- Choose a role --
              </option>
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </button>
            {errors.length > 0 && (
          <div style={{ color: 'red' }}>
            {errors.map((error, index) => (
              <p key={index}>{error.message}</p>
            ))}
          </div>
        )}
        </form>
      </div>
    </div>
  );
}

// LoginComponent.propTypes={
//   title:PropTypes.string.isRequired,
//   amount:PropTypes.number.isRequired
// }

export default RegisterPage