import Input from '@components/input/Input';
import styles from './forms.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import PrimaryButton from '@components/buttons/PrimaryButton';
import { useRouter } from 'next/navigation';
import { addTodo } from '@app/api/api';

interface AddTaskFormProps {
  action: () => void;
}

const AddTaskForm = ({ action }: AddTaskFormProps) => {
  const router = useRouter();
  const [newTask, setNewTask] = useState<string>('');

  const handleSubmitNewTask: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      value: newTask,
    });
    setNewTask('');
    action();
    router.refresh();
  };

  return (
    <form className={styles.taskForm} onSubmit={handleSubmitNewTask}>
      <Input
        type="text"
        value={newTask}
        placeholder="New task"
        action={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewTask(e.target.value)
        }
      />
      <PrimaryButton type="submit">ADD TASK</PrimaryButton>
    </form>
  );
};

export default AddTaskForm;
