import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ChatPage from './components/ChatPage';
import AdminPage from './components/AdminPage';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import ProtectedPage from './components/ProtectedPage';
import CreateChatPage from './components/CreateChatPage';
import AdminProtectedPage from './components/AdminProtectedPage';
import UpdateUserPage from './components/UpdateUserPage';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />}/>
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />


          <Route path="/chat" element={<ProtectedPage><ChatPage/></ProtectedPage>}  />
          <Route path="/home" element={<ProtectedPage><HomePage/></ProtectedPage>}  />
          <Route path="/admin" element={<ProtectedPage><AdminProtectedPage><AdminPage/></AdminProtectedPage></ProtectedPage>} />
          <Route path="/update" element={<ProtectedPage><AdminProtectedPage><UpdateUserPage/></AdminProtectedPage></ProtectedPage>} />
          <Route path="/create" element={<ProtectedPage><CreateChatPage/></ProtectedPage>}  />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </BrowserRouter>
  );
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener norefer rer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
