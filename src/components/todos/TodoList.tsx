'use client';

import { ITask } from '@Types';
import styles from './todolist.module.css';
import PrimaryButton from '@components/buttons/PrimaryButton';
import SecondaryButton from '@components/buttons/SecondaryButton';
import EditTaskForm from '@components/forms/EditTaskForm';
import Modal from '@components/modal/Modal';
import Table from '@components/table/Table';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteTodo } from '@app/api/api';

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  const router = useRouter();
  const [selectedTask, setSelectedTask] = useState<{
    id: string;
    value: string;
  }>();

  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const handleEditModalOpen = (task: ITask) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const handleDeleteModalOpen = (task: ITask) => {
    setSelectedTask(task);
    setDeleteModalOpen(true);
  };

  const handleDeleteTask = async () => {
    if (selectedTask) {
      await deleteTodo(selectedTask.id);
      setSelectedTask(undefined);
      setDeleteModalOpen(false);
      router.refresh();
    }
  };

  return (
    <>
      <Table
        data={tasks}
        editAction={(task) => handleEditModalOpen(task)}
        deleteAction={(task) => handleDeleteModalOpen(task)}
      />

      <Modal
        isModalOpen={isEditModalOpen}
        setModalOpen={setEditModalOpen}
        title="Edit task"
      >
        <EditTaskForm
          task={selectedTask}
          action={() => setEditModalOpen(false)}
        />
      </Modal>

      <Modal
        isModalOpen={isDeleteModalOpen}
        setModalOpen={setDeleteModalOpen}
        title="Delete task"
      >
        <div className={styles.modalContentContainer}>
          <h3>Are you sure you want to delete this task?</h3>
          <span>`{selectedTask?.value}`</span>
          <div className={styles.modalButtonsContainer}>
            <PrimaryButton type="button" action={handleDeleteTask}>
              YES, DELETE
            </PrimaryButton>
            <SecondaryButton
              type="button"
              action={() => setDeleteModalOpen(false)}
            >
              CANCEL
            </SecondaryButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TodoList;
