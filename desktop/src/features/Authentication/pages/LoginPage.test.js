import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage'; // Adjust the import based on your file structure

test('renders the page title, input fields, and login button', () => {
  render(<LoginPage />);

  // Check for heading and title
  const heading = screen.getByRole('heading', { name: /DAILYRAILS/i });
  expect(heading).toBeInTheDocument();

  const welcomeMessage = screen.getByText(/Welcome to DailyRails/i);
  expect(welcomeMessage).toBeInTheDocument();

  const usernameField = screen.getByLabelText(/username/i);
  expect(usernameField).toBeInTheDocument();

  const passwordField = screen.getByLabelText(/password/i);
  expect(passwordField).toBeInTheDocument();

  const loginButton = screen.getByRole('button', { name: /login/i });
  expect(loginButton).toBeInTheDocument();
});

test('submits the form on login button click', () => {
  const handleSubmit = jest.fn();

  // Mock the handleSubmit function if it's passed as a prop or update the component accordingly
  render(<LoginPage onSubmit={handleSubmit} />);

  // Simulate user typing into the input fields
  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: 'user' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password123' },
  });

  // Simulate form submission (click the login button)
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  // Check if the submit handler has been called
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
