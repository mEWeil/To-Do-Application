import { ITask } from '../interfaces/ITask';

interface TaskProps {
  task: ITask;
  selectedTasks: number[];
  setSelectedTasks: (setSelectedTasks: number[]) => void;
}

function Task({ task, selectedTasks, setSelectedTasks }: TaskProps) {
  return (
    <li key={task.id}>
      {task.id}) {task.title}
      <input
        type="checkbox"
        onChange={(e) =>
          e.target.checked
            ? setSelectedTasks([...selectedTasks, task.id])
            : setSelectedTasks(selectedTasks.filter((id) => id !== task.id))
        }
      />
    </li>
  );
}

export default Task;
