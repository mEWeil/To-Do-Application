import { useState, useEffect } from 'react';
import axios from 'axios';
import { ITask } from '../interfaces/ITask';
import Task from './Task';
import Header from './Header';

export async function fetchTasks(): Promise<ITask[]> {
  const taskListResp = await axios.get('task_list');
  return taskListResp.data.tasks;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [showPending, setshowPending] = useState<boolean>(true);
  const [showCompleted, setshowCompleted] = useState<boolean>(true);

  const taskHandler = async () => {
    const taskList = await fetchTasks();
    setTasks(taskList);
    setSelectedTasks([]);
  };

  useEffect(() => {
    taskHandler();
  }, []);

  return (
    <div>
      <Header
        tasks={tasks}
        setTasks={setTasks}
        selectedTasks={selectedTasks}
        taskHandler={taskHandler}
        showPending={showPending}
        showCompleted={showCompleted}
      />
      <label htmlFor="Pending">
        Pending
        <input
          type="checkbox"
          defaultChecked
          onChange={() => setshowPending(!showPending)}
          name="Pending"
        />
      </label>
      <label htmlFor="Completed">
        Completed
        <input
          type="checkbox"
          defaultChecked
          onChange={() => setshowCompleted(!showCompleted)}
          value="Completed"
        />
      </label>
      {showPending === true ? (
        <div>
          <h1>Pending</h1>
          <ul>
            {tasks.map(
              (task) =>
                !task.isCompleted && (
                  <Task
                    key={task.id}
                    task={task}
                    selectedTasks={selectedTasks}
                    setSelectedTasks={setSelectedTasks}
                    taskHandler={taskHandler}
                  />
                )
            )}
          </ul>
        </div>
      ) : (
        ''
      )}
      {showCompleted === true ? (
        <div>
          <h1>Completed</h1>
          <ul>
            {tasks.map(
              (task) =>
                !task.isCompleted && (
                  <Task
                    key={task.id}
                    task={task}
                    selectedTasks={selectedTasks}
                    setSelectedTasks={setSelectedTasks}
                    taskHandler={taskHandler}
                  />
                )
            )}
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
