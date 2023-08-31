import nodemailer from 'nodemailer';
import {
  MAILER_HOST,
  MAILER_USERNAME,
  MAILER_PASSWORD,
  MAILER_PORT,
  MAILER_SERVICE,
  EMAIL_FROM,
} from '../config/env.config.js';

const transport = nodemailer.createTransport({
  host: MAILER_HOST,
  service: MAILER_SERVICE,
  port: MAILER_PORT,
  secure: true,
  requireTLS: true,
  auth: {
    user: MAILER_USERNAME,
    pass: MAILER_PASSWORD,
  },
});

/**
 * Sends an email using the nodemailer library.
 *
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The content of the email.
 * @returns {Promise} - A promise that resolves when the email is sent.
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: EMAIL_FROM, to, subject, text };
  await transport.sendMail(msg);
};

/**
 * Sends a reset password email to the specified recipient.
 *
 * @param {string} to - The recipient's email address.
 * @param {string} token - The reset password token generated for the user.
 * @returns {Promise} - A promise that resolves when the email is sent.
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset Password';
  // Replace this URL with the link to the reset password page of your front-end app
  const resetPasswordURL = `http://localhost:8080/api/v1/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordURL}
If you did not request any password resets, please ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Sends an email for account verification.
 *
 * @param {string} to - The recipient's email address.
 * @param {string} token - The verification token generated for the user.
 * @returns {Promise} - A promise that resolves when the email is sent.
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

export default {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
