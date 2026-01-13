// In your main backend file, add these lines:
const adminRoutes = require('./admin');

// Mount admin routes
app.use('/admin', adminRoutes);

// Also add these for basic admin panel
app.get('/admin', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Go Trip Admin</title>
            <meta http-equiv="refresh" content="0; url=/admin-dashboard.html">
        </head>
        <body>
            <p>Redirecting to admin dashboard...</p>
        </body>
        </html>
    `);
});