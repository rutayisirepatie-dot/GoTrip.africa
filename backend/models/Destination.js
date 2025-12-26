// ===== DESTINATION ENDPOINTS =====

// GET all destinations
app.get('/api/destinations', async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json({ success: true, data: destinations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch destinations' });
  }
});

// GET a single destination by ID
app.get('/api/destinations/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.json({ success: true, data: destination });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch destination' });
  }
});

// CREATE a new destination
app.post('/api/destinations', async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json({ success: true, data: destination });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
});

// UPDATE a destination by ID
app.put('/api/destinations/:id', async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.json({ success: true, data: destination });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE a destination by ID
app.delete('/api/destinations/:id', async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.json({ success: true, message: 'Destination deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to delete destination' });
  }
});