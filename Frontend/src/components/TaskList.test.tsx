import { describe, expect, it, vi, Mocked } from 'vitest';
import TestRenderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import TaskList, { getTasks } from './TaskList';

vi.mock('axios');

describe('TaskList.tsx', () => {
  describe('getTasks()', () => {
    it('return an array of tasks', async () => {
      const mockedAxios = axios as Mocked<typeof axios>;
      mockedAxios.get.mockResolvedValue({ data: { tasks: [] } });
      const tasks = await getTasks();
      expect(tasks).toStrictEqual([]);
    });
  });

  describe('taskList.tsx', () => {
    it('will create and match snapshot', () => {
      const myTaskList = TestRenderer.create(<TaskList />);
      expect(myTaskList).toMatchSnapshot();
    });
  });
});
