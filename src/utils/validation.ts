import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const otpSchema = yup.object({
  otp: yup
    .string()
    .matches(/^\d{4}$/, 'OTP must be exactly 4 digits')
    .required('OTP is required'),
});

export const bidSchema = yup.object({
  amount: yup
    .number()
    .positive('Bid amount must be positive')
    .required('Bid amount is required'),
});

