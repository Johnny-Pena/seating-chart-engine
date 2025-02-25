import React, { useState } from 'react';
import AddClassModal from '../modals/addClassModal';

const AddClassButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    // Handle any additional logic after saving the class
  };

  return (
    <>
      <button className="btn" onClick={handleOpenModal}>
        Add Class
      </button>
      <AddClassModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSave} />
    </>
  );
};

export default AddClassButton;