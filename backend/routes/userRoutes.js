import express from 'express';
const router = express.Router();

// Example GET route
router.get('/', (req, res) => {
  res.json({ message: 'All users' });
});

// Example POST route
router.post('/', (req, res) => {
  const user = req.body;
  res.status(201).json({ message: 'User created', user });
});

export default router; // Must be default export!