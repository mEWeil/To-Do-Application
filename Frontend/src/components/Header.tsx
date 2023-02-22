/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IHeaderProps } from '../interfaces/IHeaderProps';

type FormValues = {
  newTaskTitle: string;
};

export default function Header({
  tasks,
  setTasks,
  selectedTasks,
  taskHandler,
}: IHeaderProps) {
  const [newTask, setNewTask] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [displayButtons, setDisplayButtons] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    axios.post('add_task', { title: data.newTaskTitle }).then((response) => {
      if (response.data.taskCreated === true) {
        setTasks([
          ...tasks,
          {
            id: response.data.id,
            title: data.newTaskTitle,
            isCompleted: false,
          },
        ]);
      } else {
        setTimeout(() => {
          setErrorMessage(true);
        }, 3000);
        setErrorMessage(false);
      }
      setNewTask('');
      reset();
    });
  };
  const statusChange = (data: number[]) => {
    axios
      .put('status_change', data)
      .then((res) => console.log(res))
      .then(() => taskHandler())
      .catch((err) => console.log(err));
  };
  const deleteTasks = (data: number[]) => {
    axios
      .delete('delete_tasks', { data })
      .then((res) => console.log(res))
      .then(() => taskHandler())
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    function displayButton() {
      return selectedTasks.length > 0
        ? setDisplayButtons(true)
        : setDisplayButtons(false);
    }
    displayButton();
  }, [selectedTasks.length]);

  return (
    <>
      {errorMessage ? <p>There was an error adding the message.</p> : null}
      <button
        type="button"
        disabled={!displayButtons}
        onClick={() => statusChange(selectedTasks)}
      >
        Change Status
      </button>
      <button
        type="button"
        disabled={!displayButtons}
        onClick={() => deleteTasks(selectedTasks)}
      >
        Delete
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="newTaskInput">
          New Task:
          <input
            type="text"
            id="newTaskInput"
            {...register('newTaskTitle')}
            placeholder="What's next on the list?"
            onChange={(e) => setNewTask(e.target.value)}
          />
        </label>
        <input type="submit" value="Add Task" disabled={!newTask} />
      </form>
    </>
  );
}
