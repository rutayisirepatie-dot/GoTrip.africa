import express from 'express';
import { 
    Guide, 
    Translator, 
    Destination, 
    Accommodation, 
    Blog 
} from '../models/index.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// ==================== Guides Routes ====================

// Get all guides
router.get('/guides', async (req, res) => {
    try {
        const guides = await Guide.find();
        res.json({
            success: true,
            data: guides
        });
    } catch (error) {
        console.error('Get guides error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch guides',
            error: error.message
        });
    }
});

// Get single guide
router.get('/guides/:id', async (req, res) => {
    try {
        const guide = await Guide.findById(req.params.id);
        
        if (!guide) {
            return res.status(404).json({
                success: false,
                message: 'Guide not found'
            });
        }

        res.json({
            success: true,
            data: guide
        });
    } catch (error) {
        console.error('Get guide error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch guide',
            error: error.message
        });
    }
});

// Create guide (admin only)
router.post('/guides', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const guide = new Guide(req.body);
        await guide.save();

        res.status(201).json({
            success: true,
            message: 'Guide created successfully',
            data: guide
        });
    } catch (error) {
        console.error('Create guide error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create guide',
            error: error.message
        });
    }
});

// Update guide (admin only)
router.put('/guides/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const guide = await Guide.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!guide) {
            return res.status(404).json({
                success: false,
                message: 'Guide not found'
            });
        }

        res.json({
            success: true,
            message: 'Guide updated successfully',
            data: guide
        });
    } catch (error) {
        console.error('Update guide error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update guide',
            error: error.message
        });
    }
});

// ==================== Translators Routes ====================

// Get all translators
router.get('/translators', async (req, res) => {
    try {
        const translators = await Translator.find();
        res.json({
            success: true,
            data: translators
        });
    } catch (error) {
        console.error('Get translators error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch translators',
            error: error.message
        });
    }
});

// Get single translator
router.get('/translators/:id', async (req, res) => {
    try {
        const translator = await Translator.findById(req.params.id);
        
        if (!translator) {
            return res.status(404).json({
                success: false,
                message: 'Translator not found'
            });
        }

        res.json({
            success: true,
            data: translator
        });
    } catch (error) {
        console.error('Get translator error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch translator',
            error: error.message
        });
    }
});

// ==================== Destinations Routes ====================

// Get all destinations
router.get('/destinations', async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json({
            success: true,
            data: destinations
        });
    } catch (error) {
        console.error('Get destinations error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch destinations',
            error: error.message
        });
    }
});

// Get single destination
router.get('/destinations/:id', async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        
        if (!destination) {
            return res.status(404).json({
                success: false,
                message: 'Destination not found'
            });
        }

        res.json({
            success: true,
            data: destination
        });
    } catch (error) {
        console.error('Get destination error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch destination',
            error: error.message
        });
    }
});

// ==================== Accommodations Routes ====================

// Get all accommodations
router.get('/accommodations', async (req, res) => {
    try {
        const accommodations = await Accommodation.find();
        res.json({
            success: true,
            data: accommodations
        });
    } catch (error) {
        console.error('Get accommodations error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch accommodations',
            error: error.message
        });
    }
});

// Get single accommodation
router.get('/accommodations/:id', async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id);
        
        if (!accommodation) {
            return res.status(404).json({
                success: false,
                message: 'Accommodation not found'
            });
        }

        res.json({
            success: true,
            data: accommodation
        });
    } catch (error) {
        console.error('Get accommodation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch accommodation',
            error: error.message
        });
    }
});

// ==================== Blog Routes ====================

// Get all blog posts
router.get('/blog', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            data: blogs
        });
    } catch (error) {
        console.error('Get blog posts error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch blog posts',
            error: error.message
        });
    }
});

// Get single blog post
router.get('/blog/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        // Increment views
        blog.views += 1;
        await blog.save();

        res.json({
            success: true,
            data: blog
        });
    } catch (error) {
        console.error('Get blog post error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch blog post',
            error: error.message
        });
    }
});

// Create blog post (admin only)
router.post('/blog', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();

        res.status(201).json({
            success: true,
            message: 'Blog post created successfully',
            data: blog
        });
    } catch (error) {
        console.error('Create blog post error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create blog post',
            error: error.message
        });
    }
});

// Update blog post (admin only)
router.put('/blog/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        res.json({
            success: true,
            message: 'Blog post updated successfully',
            data: blog
        });
    } catch (error) {
        console.error('Update blog post error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update blog post',
            error: error.message
        });
    }
});

export default router;