
import React from 'react';
import { useLocation } from 'react-router-dom';
import { PasswordResetRequest } from './PasswordResetRequest';
import PasswordResetForm from './PasswordResetForm';

export const PasswordReset = () => {
  // Check if we're on the reset password page with a token
  const location = useLocation();
  const isResetPasswordPage = location.pathname.includes('/reset-password');
  
  // If we're on the reset password page, show the reset form
  // Otherwise, show the request form
  return isResetPasswordPage ? <PasswordResetForm /> : <PasswordResetRequest />;
};
