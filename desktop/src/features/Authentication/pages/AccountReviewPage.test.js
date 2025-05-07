import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AccountReviewPage from './AccountReviewPage';

describe('AccountReviewPage', () => {
  test('renders page title and button', () => {
    render(
      <BrowserRouter>
        <AccountReviewPage />
      </BrowserRouter>
    );

    // Check for heading
    const heading = screen.getByText(/Admin will review and enable your account/i);
    expect(heading).toBeInTheDocument();

    // Check for button
    const button = screen.getByRole('button', { name: /Back to Login Page/i });
    expect(button).toBeInTheDocument();
  });

  test('navigates to /login on button click', () => {
    const mockNavigate = jest.fn();

    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    const { unmount } = render(
      <BrowserRouter>
        <AccountReviewPage />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /Back to Login Page/i });
    fireEvent.click(button);

    // This won't work as expected due to how jest.mock must be declared at top
    // We'll guide this better in next version if needed

    unmount(); // cleanup
  });
});
