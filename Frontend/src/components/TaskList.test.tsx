import { describe, expect, it, vi, Mocked } from 'vitest';
import TestRenderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import TaskList, { fetchTasks } from './TaskList';

vi.mock('axios');

describe('TaskList', () => {
  it('will create and match snapshot', () => {
    const myTaskList = TestRenderer.create(<TaskList />);
    expect(myTaskList).toMatchSnapshot();
  });

  it('will render an h1 with Pending', async () => {
    const mockedAxios = axios as Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue({ data: { tasks: [] } });
    render(<TaskList />);
    const pendingHeader = await screen.getByRole('heading', {
      name: 'Pending',
    });
    expect(pendingHeader).toBeInTheDocument();
  });

  it('will render an h1 with Completed', async () => {
    const mockedAxios = axios as Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue({ data: { tasks: [] } });
    render(<TaskList />);
    const completedHeader = await screen.getByRole('heading', {
      name: 'Completed',
    });
    expect(completedHeader).toBeInTheDocument();
  });

  describe('getTasks()', () => {
    it('return an array of tasks', async () => {
      const mockedAxios = axios as Mocked<typeof axios>;
      mockedAxios.get.mockResolvedValue({ data: { tasks: [] } });
      const tasks = await fetchTasks();
      expect(tasks).toStrictEqual([]);
    });
  });
});
