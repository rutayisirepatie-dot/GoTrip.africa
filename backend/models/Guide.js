// ===== GUIDE ENDPOINTS =====

// GET all guides
app.get('/api/guides', async (req, res) => {
  try {
    const guides = await Guide.find();
    res.json({ success: true, data: guides });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch guides' });
  }
});

// GET a single guide by ID
app.get('/api/guides/:id', async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, data: guide });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch guide' });
  }
});

// CREATE a new guide
app.post('/api/guides', async (req, res) => {
  try {
    const guide = new Guide(req.body);
    await guide.save();
    res.status(201).json({ success: true, data: guide });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
});

// UPDATE a guide by ID
app.put('/api/guides/:id', async (req, res) => {
  try {
    const guide = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, data: guide });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE a guide by ID
app.delete('/api/guides/:id', async (req, res) => {
  try {
    const guide = await Guide.findByIdAndDelete(req.params.id);
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, message: 'Guide deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to delete guide' });
  }
});