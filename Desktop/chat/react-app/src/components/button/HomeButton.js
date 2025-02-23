import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/home');
  };

  return (
    <button
      onClick={handleCreate}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      home
    </button>
  );
};

export default HomeButton;