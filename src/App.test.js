import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('should render app', () =>
{
  const { getByText } = render(<App />); 
  const labelElement = getByText(/enter number of primes/i);
  expect(labelElement).toBeInTheDocument();
});

test('it should find first 10 primes initially', async () =>
{
  const { getByRole, getByTestId } = render(<App />);
  const inputElement = getByRole("textbox");
  expect(inputElement.value).toBe("10");

  const statusLabel = getByTestId("statusLabel");
  expect(/Running. . ./i.test(statusLabel.textContent)).toBe(true);

  await waitFor(() => expect(statusLabel.textContent).toMatch(/Found 10 primes/i))
})

test('it should be able to find first 100 primes within 10ms', async () =>
{
  const { getByTestId, getByText, getByRole } = render(<App />);
  const inputElement = getByRole("textbox");
  userEvent.clear(inputElement);
  await userEvent.type(inputElement, "100");
  const buttonElement = getByText(/run!/i);

  const statusLabel = getByTestId("statusLabel");
  expect(/Running. . ./i.test(statusLabel.textContent)).toBe(true);
  userEvent.click(buttonElement);
  await waitFor(() => expect(statusLabel.textContent).toMatch(/Found 100 primes/i),
  {
    timeout: 10,
    onTimeout: () =>
    {
      throw new Error("Timeout for 100 primes exceeded")
    }
  })
})

test('it should be able to find first 1000 primes within 100ms', async () =>
{
  const { getByTestId, getByText, getByRole } = render(<App />);
  const inputElement = getByRole("textbox");
  userEvent.clear(inputElement);
  await userEvent.type(inputElement, "1000");
  const buttonElement = getByText(/run!/i);

  const statusLabel = getByTestId("statusLabel");
  expect(/Running. . ./i.test(statusLabel.textContent)).toBe(true);
  userEvent.click(buttonElement);
  await waitFor(() => expect(statusLabel.textContent).toMatch(/Found 1000 primes/i),
  {
    timeout: 100,
    onTimeout: () =>
    {
      throw new Error("Timeout for 1000 primes exceeded")
    }
  })
})

test('it should be able to find first 10000 primes within 1 second', async () =>
{
  const { getByTestId, getByText, getByRole } = render(<App />);
  const inputElement = getByRole("textbox");
  userEvent.clear(inputElement);
  await userEvent.type(inputElement, "10000");
  const buttonElement = getByText(/run!/i);

  const statusLabel = getByTestId("statusLabel");
  expect(/Running. . ./i.test(statusLabel.textContent)).toBe(true);
  userEvent.click(buttonElement);
  await waitFor(() => expect(statusLabel.textContent).toMatch(/Found 10000 primes/i),
  {
    timeout: 1000,
    onTimeout: () =>
    {
      throw new Error("Timeout for 10000 primes exceeded")
    }
  })
})