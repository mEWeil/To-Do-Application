import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { ITask } from '../interfaces/ITask';

const setTasks = vi.fn();
const tasks: ITask[] = [];

describe('Header', () => {
  it('should render the elements', () => {
    render(<Header tasks={tasks} setTasks={setTasks} />);

    expect(
      screen.getByRole('textbox', { name: 'New Task:' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add Task' })
    ).toBeInTheDocument();
  });
});
