import { ITask } from '../interfaces/ITask';

interface TaskProps {
  task: ITask;
}

function Task({ task }: TaskProps) {
  return (
    <li key={task.id}>
      {task.id}) {task.title}
    </li>
  );
}

export default Task;
