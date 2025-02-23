import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePageButton = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/create');
  };

  return (
    <button
      onClick={handleCreate}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Create
    </button>
  );
};

export default CreatePageButton;