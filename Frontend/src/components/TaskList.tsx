import { useState, useEffect } from 'react';
import axios from 'axios';
import { ITask } from '../interfaces/ITask';

export async function fetchTasks(): Promise<ITask[]> {
  const taskListResp = await axios.get('list_tasks');
  return taskListResp.data.tasks;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const taskHandler = async () => {
      const taskList = await fetchTasks();
      setTasks(taskList);
    };
    taskHandler();
  }, []);

  return (
    <div>
      <div>
        <h1>Pending</h1>
        <ul>
          {tasks
            .filter((task) => task.isCompleted === false)
            .map((task) => {
              return (
                <li key={task.id}>
                  {task.id}) {task.title}
                </li>
              );
            })}
        </ul>
      </div>
      <div>
        <h1>Completed</h1>
        <ul>
          {tasks
            .filter((task) => task.isCompleted === true)
            .map((task) => {
              return (
                <li key={task.id}>
                  {task.id}) {task.title}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
