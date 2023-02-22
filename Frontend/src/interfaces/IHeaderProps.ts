import { ITask } from './ITask';

export interface IHeaderProps {
  tasks: ITask[];
  setTasks: (allTasks: ITask[]) => void;
}
