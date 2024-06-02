'use client';

import PrimaryButton from '@components/buttons/PrimaryButton';
import AddTaskForm from '@components/forms/AddTaskForm';
import Modal from '@components/modal/Modal';
import { useState } from 'react';

const AddTodo = () => {
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
  return (
    <>
      <PrimaryButton type="button" action={() => setAddModalOpen(true)}>
        ADD TASK
      </PrimaryButton>

      <Modal
        isModalOpen={isAddModalOpen}
        setModalOpen={setAddModalOpen}
        title="Add task"
      >
        <AddTaskForm action={() => setAddModalOpen(false)} />
      </Modal>
    </>
  );
};

export default AddTodo;
