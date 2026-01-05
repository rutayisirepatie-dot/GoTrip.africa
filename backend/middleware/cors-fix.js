// backend/middleware/cors-fix.js
export default function corsFix(req, res, next) {
  // Allow all origins in development
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
  }
  
  next();
}