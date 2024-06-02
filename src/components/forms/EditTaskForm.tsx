import Input from '@components/input/Input';
import styles from './forms.module.css';
import { useEffect, useState } from 'react';
import PrimaryButton from '@components/buttons/PrimaryButton';
import { useRouter } from 'next/navigation';
import { editTodo } from '@app/api/api';

interface EditTaskFormProps {
  task?: { id: string; value: string };
  action: () => void;
}

const EditTaskForm = ({ task, action }: EditTaskFormProps) => {
  const router = useRouter();
  const [editTask, setEditTask] = useState<string>('');

  useEffect(() => {
    if (task) {
      setEditTask(task?.value);
    }
  }, [task]);

  const handleSubmitNewTask: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (task) {
      await editTodo({
        id: task.id,
        value: editTask,
      });
    }
    action();
    router.refresh();
  };

  return (
    <form className={styles.taskForm} onSubmit={handleSubmitNewTask}>
      <Input
        type="text"
        value={editTask}
        placeholder="Edit task"
        action={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEditTask(e.target.value)
        }
      />
      <PrimaryButton type="submit">EDIT TASK</PrimaryButton>
    </form>
  );
};

export default EditTaskForm;
