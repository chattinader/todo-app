import { ITask } from '@Types';
import styles from './table.module.css';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface TableProps {
  data: ITask[];
  editAction: (task: ITask) => void;
  deleteAction: (task: ITask) => void;
}

const Table = ({ data, editAction, deleteAction }: TableProps) => {
  return (
    <div>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((task) => {
            return (
              <tr key={task.id}>
                <td>{task.value}</td>
                <td>
                  <FiEdit
                    size={24}
                    cursor="pointer"
                    onClick={() => editAction(task)}
                  />
                  <FiTrash2
                    size={24}
                    cursor="pointer"
                    onClick={() => deleteAction(task)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
