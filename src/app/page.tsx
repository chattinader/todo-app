import styles from './page.module.css';
import AddTodo from '@components/todos/AddTodo';
import TodoList from '@components/todos/TodoList';
import { getAllTodos } from './api/api';

export default async function Home() {
  const tasks = await getAllTodos();

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1>TODO APP</h1>
        <div className={styles.cardContent}>
          <AddTodo />
          <TodoList tasks={tasks} />
        </div>
      </div>
    </main>
  );
}
