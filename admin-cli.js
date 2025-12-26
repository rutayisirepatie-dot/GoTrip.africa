#!/usr/bin/env node

import inquirer from 'inquirer';
import axios from 'axios';
import chalk from 'chalk';

const API_URL = 'http://localhost:5000/api'; // Change if backend runs on a different port
let token = null;

// Axios instance with JWT support
const api = axios.create({ baseURL: API_URL, headers: { 'Content-Type': 'application/json' } });
api.interceptors.request.use(config => {
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ===== LOGIN =====
async function login() {
  const { email, password } = await inquirer.prompt([
    { name: 'email', message: 'Admin Email:' },
    { name: 'password', message: 'Password:', type: 'password' }
  ]);

  try {
    const res = await api.post('/auth/login', { email, password });
    token = res.data.token;
    console.log(chalk.green(`✅ Logged in as ${res.data.user.name}`));
  } catch (err) {
    console.error(chalk.red('❌ Login failed'), err.response?.data?.message || err.message);
    process.exit();
  }
}

// ===== MAIN MENU =====
async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select an action:',
      choices: [
        'Manage Guides',
        'Manage Destinations',
        'Manage Translators',
        'Manage Accommodations',
        'Manage Bookings',
        'Exit'
      ]
    }
  ]);

  switch (action) {
    case 'Manage Guides': return manageResource('guides');
    case 'Manage Destinations': return manageResource('destinations');
    case 'Manage Translators': return manageResource('translators');
    case 'Manage Accommodations': return manageResource('accommodations');
    case 'Manage Bookings': return manageResource('bookings');
    case 'Exit': console.log(chalk.yellow('Goodbye!')); process.exit();
  }
}

// ===== RESOURCE MANAGEMENT =====
async function manageResource(resource) {
  let choices = ['List All', 'Create', 'Update', 'Delete', 'Back'];

  // Add booking-specific actions
  if (resource === 'bookings') {
    choices.splice(1, 0, 'Approve Booking', 'Cancel Booking', 'View Stats');
  }

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: `Select ${resource} action:`,
      choices
    }
  ]);

  switch (action) {
    case 'List All': await listResource(resource); break;
    case 'Create': await createResource(resource); break;
    case 'Update': await updateResource(resource); break;
    case 'Delete': await deleteResource(resource); break;
    case 'Approve Booking': await changeBookingStatus('confirmed'); break;
    case 'Cancel Booking': await changeBookingStatus('cancelled'); break;
    case 'View Stats': await viewBookingStats(); break;
    case 'Back': return mainMenu();
  }

  await manageResource(resource);
}

// ===== CRUD OPERATIONS =====
async function listResource(resource) {
  try {
    const res = await api.get(`/admin/${resource}`);
    console.log(chalk.blue(JSON.stringify(res.data.data, null, 2)));
  } catch (err) {
    console.error(chalk.red('❌ Failed to fetch'), err.response?.data?.message || err.message);
  }
}

async function createResource(resource) {
  const { data: rawData } = await inquirer.prompt([{ name: 'data', message: `Enter ${resource} JSON:` }]);
  try {
    const data = JSON.parse(rawData);
    const res = await api.post(`/admin/${resource}`, data);
    console.log(chalk.green('✅ Created:'), res.data.data);
  } catch (err) {
    console.error(chalk.red('❌ Creation failed'), err.response?.data?.message || err.message);
  }
}

async function updateResource(resource) {
  const { id, data: rawData } = await inquirer.prompt([
    { name: 'id', message: `Enter ${resource} ID to update:` },
    { name: 'data', message: 'Enter updated JSON:' }
  ]);

  try {
    const data = JSON.parse(rawData);
    const res = await api.put(`/admin/${resource}/${id}`, data);
    console.log(chalk.green('✅ Updated:'), res.data.data);
  } catch (err) {
    console.error(chalk.red('❌ Update failed'), err.response?.data?.message || err.message);
  }
}

async function deleteResource(resource) {
  const { id } = await inquirer.prompt([{ name: 'id', message: `Enter ${resource} ID to delete:` }]);
  try {
    const res = await api.delete(`/admin/${resource}/${id}`);
    console.log(chalk.green('✅ Deleted'), res.data.message);
  } catch (err) {
    console.error(chalk.red('❌ Deletion failed'), err.response?.data?.message || err.message);
  }
}

// ===== BOOKING STATUS CHANGE =====
async function changeBookingStatus(status) {
  const { id } = await inquirer.prompt([{ name: 'id', message: `Enter booking ID to mark as ${status}:` }]);
  try {
    const res = await api.patch(`/admin/bookings/${id}/status`, { status });
    console.log(chalk.green(`✅ Booking ${status}:`), res.data.data);
  } catch (err) {
    console.error(chalk.red('❌ Failed to update booking status'), err.response?.data?.message || err.message);
  }
}

// ===== VIEW BOOKING STATS =====
async function viewBookingStats() {
  try {
    const res = await api.get('/reports/bookings');
    const { totalBookings, confirmed, revenue } = res.data.report;
    console.log(chalk.blue('\n📊 Booking Stats'));
    console.log(chalk.yellow(`Total Bookings: ${totalBookings}`));
    console.log(chalk.green(`Confirmed Bookings: ${confirmed}`));
    console.log(chalk.magenta(`Total Revenue: $${revenue}\n`));
  } catch (err) {
    console.error(chalk.red('❌ Failed to fetch booking stats'), err.response?.data?.message || err.message);
  }
}

// ===== START CLI =====
(async () => {
  console.clear();
  console.log(chalk.cyan('🚀 Welcome to GoTrip Admin CLI'));
  await login();
  while (true) await mainMenu();
})();