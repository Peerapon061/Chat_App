import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminButton = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/admin');
  };

  return (
    <button
      onClick={handleCreate}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Admin
    </button>
  );
};

export default AdminButton;