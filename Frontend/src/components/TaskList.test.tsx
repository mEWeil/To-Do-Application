/* eslint-disable prettier/prettier */
import { describe, expect, it, vi, Mocked } from 'vitest';  
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import TaskList, { fetchTasks } from './TaskList';

vi.mock('axios');

describe('TaskList', () => {
  it('will render an h1 with Pending', () => {
    const mockedAxios = axios as Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue({ data: { tasks: [] } });

    render(<TaskList />);
    const pendingHeader = screen.getByRole('heading', {
      name: 'Pending',
    });

    expect(pendingHeader).toBeInTheDocument();
  });

  it('will render an h1 with Completed', () => {
    const mockedAxios = axios as Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue({ data: { tasks: [] } });

    render(<TaskList />);
    const completedHeader = screen.getByRole('heading', {
      name: 'Completed',
    });

    expect(completedHeader).toBeInTheDocument();
  });

  describe('fetchTasks()', () => {
    it('return an array of tasks', async () => {
      const mockedAxios = axios as Mocked<typeof axios>;
      mockedAxios.get.mockResolvedValue({ data: { tasks: [] } });

      const tasks = await fetchTasks();
      
      expect(tasks).toStrictEqual([]);
    });
  });

  describe('Task', () => {
    it('will render the task comonent', async () => {
      const mockedAxios = axios as Mocked<typeof axios>;
      mockedAxios.get.mockResolvedValue({ data: { tasks: [{ id: 1, title: 'sample task', isCompleted: false }] } });

      render(<TaskList />)

      expect(await screen.findByText(/sample task/)).toBeInTheDocument()
    });
  });
});
