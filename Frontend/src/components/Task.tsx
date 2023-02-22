/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import axios from 'axios';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ITask } from '../interfaces/ITask';

interface TaskProps {
  task: ITask;
  selectedTasks: number[];
  setSelectedTasks: (setSelectedTasks: number[]) => void;
  taskHandler: () => void;
}

type UpdateTaskForm = {
  updatedTaskTitle: string;
};

export default function Task({
  task,
  selectedTasks,
  setSelectedTasks,
  taskHandler,
}: TaskProps) {
  const [editState, setEditState] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [titleTracker, setTitleTracker] = useState(task.title);
  const { register, handleSubmit } = useForm<UpdateTaskForm>();
  const onSubmit: SubmitHandler<UpdateTaskForm> = (data) => {
    axios
      .put('update_task_title', {
        newTitle: data.updatedTaskTitle,
        id: task.id,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.titleChange === true) {
          setEditState(false);
          taskHandler();
        } else {
          setTimeout(() => {
            setErrorMessage(false);
          }, 3000);
          setErrorMessage(true);
        }
      });
  };
  const titleInputHandler = () => {
    if (titleTracker === task.title || titleTracker === '') {
      return true;
    }
    return false;
  };
  return (
    <>
      {errorMessage ? <p>There was an error updating the task.</p> : null}
      <li key={task.id}>
        {editState ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              defaultValue={task.title}
              {...register('updatedTaskTitle')}
              onChange={(e) => setTitleTracker(e.target.value)}
            />
            <input
              type="submit"
              value="Confirm"
              disabled={titleInputHandler()}
            />
          </form>
        ) : (
          <p>
            {task.id}) {task.title}
          </p>
        )}
        {editState ? (
          ''
        ) : (
          <button type="button" onClick={() => setEditState(!editState)}>
            Edit
          </button>
        )}
        {editState ? (
          <button type="button" onClick={() => setEditState(!editState)}>
            Cancel
          </button>
        ) : (
          <input
            type="checkbox"
            onChange={(e) =>
              e.target.checked
                ? setSelectedTasks([...selectedTasks, task.id])
                : setSelectedTasks(selectedTasks.filter((id) => id !== task.id))
            }
          />
        )}
      </li>
    </>
  );
}
