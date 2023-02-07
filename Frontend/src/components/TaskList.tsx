import { useState, useEffect } from 'react';
import axios from 'axios';
import CsrfToken from './CsrfToken';

export interface ITask {
  id: number;
  title: string;
  status: boolean;
}

export async function getTasks(): Promise<ITask[]> {
  const resp = await axios.get('list_tasks');
  return resp.data.tasks;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const getResp = async () => {
      const resp = await getTasks();
      setTasks(resp);
    };
    getResp();
  }, []);

  CsrfToken();

  return (
    <div>
      <div>
        <h1>Pending</h1>
        <ul>
          {tasks
            .filter((task) => task.status === false)
            .map((task) => {
              return (
                <li key={task.id}>
                  `{task.id}) {task.title}`
                </li>
              );
            })}
        </ul>
      </div>
      <div>
        <h1>Completed</h1>
        <ul>
          {tasks
            .filter((task) => task.status === true)
            .map((task) => {
              return (
                <li key={task.id}>
                  `{task.id}) {task.title}`
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
