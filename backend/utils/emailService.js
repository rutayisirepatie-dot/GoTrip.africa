// backend/utils/emailService.js
import nodemailer from 'nodemailer';
import logger from './logger.js';
import handlebars from 'handlebars';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

// --- Template Cache ---
const templateCache = {};

// --- Create Transporter ---
export const createTransporter = () => nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true' || false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: { rejectUnauthorized: process.env.NODE_ENV === 'production' },
  pool: true,
  maxConnections: 5,
  maxMessages: 100
});

// --- Test Connection ---
export const testConnection = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    logger.info('Email server connection verified successfully');
    return true;
  } catch (error) {
    logger.error(`Email server connection failed: ${error.message}`);
    return false;
  }
};

// --- Load Template ---
export const loadTemplate = async (templateName, data = {}) => {
  try {
    if (!templateCache[templateName]) {
      const templatePath = path.join(new URL('..', import.meta.url).pathname, 'email-templates', `${templateName}.html`);
      const templateContent = await fs.readFile(templatePath, 'utf8');
      templateCache[templateName] = handlebars.compile(templateContent);
    }
    return templateCache[templateName](data);
  } catch (error) {
    logger.error(`Failed to load email template ${templateName}: ${error.message}`);
    return `<html><body><p>${data.message || 'Hello!'}</p></body></html>`;
  }
};

// --- Send Email ---
export const sendEmail = async (options, retryCount = 0) => {
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000 * Math.pow(2, retryCount);

  try {
    const transporter = createTransporter();
    const correlationId = crypto.randomUUID();
    const from = options.from || `${process.env.SITE_NAME || 'Website'} <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`;
    const mailOptions = {
      from,
      to: options.email || options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.subject,
      replyTo: options.replyTo,
      cc: options.cc,
      bcc: options.bcc,
      attachments: options.attachments,
      headers: { ...options.headers, 'X-Correlation-ID': correlationId }
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${mailOptions.to}: ${info.messageId}`, { correlationId, subject: options.subject });
    return { success: true, messageId: info.messageId, response: info.response };
  } catch (error) {
    logger.error(`Email sending error to ${options.email || options.to}: ${error.message}`, { subject: options.subject, retryCount });
    if (retryCount < MAX_RETRIES && ['ECONNECTION', 'ETIMEDOUT', 'ESOCKET', 'EAI_AGAIN'].includes(error.code)) {
      await new Promise(res => setTimeout(res, RETRY_DELAY));
      return sendEmail(options, retryCount + 1);
    }
    return { success: false, error: error.message };
  }
};

// --- Health Check ---
export const checkEmailHealth = async () => {
  const ok = await testConnection();
  return {
    service: 'email',
    status: ok ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString()
  };
};