/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { IHeaderProps } from '../interfaces/IHeaderProps';

type FormValues = {
  newTaskTitle: string;
};

export default function Header({ tasks, setTasks }: IHeaderProps) {
  const [newTaskInputVal, setNewTaskInputVal] = useState('');
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    axios
      .post('add_task', { title: data.newTaskTitle })
      .then((response) => {
        if (response.data.taskCreated === true) {
          setTasks([
            ...tasks,
            {
              id: response.data.id,
              title: data.newTaskTitle,
              isCompleted: false,
            },
          ]);
        }
        setNewTaskInputVal('');
        reset();
      })
      .catch((error) => console.log(error));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="newTaskInput">
        New Task:
        <input
          type="text"
          id="newTaskInput"
          {...register('newTaskTitle')}
          placeholder="What's next on the list?"
          onChange={(e) => setNewTaskInputVal(e.target.value)}
        />
      </label>
      <input type="submit" value="Add Task" disabled={!newTaskInputVal} />
    </form>
  );
}
