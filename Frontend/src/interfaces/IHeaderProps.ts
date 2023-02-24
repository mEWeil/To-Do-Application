import { ITask } from './ITask';

export interface IHeaderProps {
  tasks: ITask[];
  setTasks: (allTasks: ITask[]) => void;
  selectedTasks: number[];
  taskHandler: () => void;
  togglePending: boolean;
  toggleCompleted: boolean;
}
