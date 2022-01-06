import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Fetch from '../Fetch';
import userEvent from '@testing-library/user-event';
import { build } from '@jackfranklin/test-data-bot';
import { Greeting } from 'types/Greeting';

// Mock API data using a builder
const greetingBuilder = build<Greeting>({
  fields: {
    greeting: 'hello there',
  },
});
const greeting = greetingBuilder();

// Mock Network Calls
const server = setupServer(
  rest.get('/api/greeting', (req, res, ctx) => {
    return res(ctx.json(greeting));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays greeting', async () => {
  render(<Fetch url="/api/greeting" />);

  userEvent.click(await screen.findByText('Load Greeting'));

  await screen.findByRole('heading');

  expect(screen.getByRole('heading')).toHaveTextContent('hello there');
  expect(screen.getByRole('button')).toBeDisabled();
});

test('handles server error', async () => {
  server.use(
    rest.get('/api/greeting', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<Fetch url="/api/greeting" />);

  userEvent.click(await screen.findByText('Load Greeting'));

  await screen.findByRole('alert');

  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!');
  expect(screen.getByRole('button')).not.toBeDisabled();
});
