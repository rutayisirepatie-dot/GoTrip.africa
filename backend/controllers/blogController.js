// backend/controllers/blogController.js
import Blog from "../models/Blog.js";
import slugify from "slugify";

// Get all blogs (with pagination, filtering, and sorting)
export const getBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      author,
      featured,
      published,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build query
    let query = {};

    // Filter by category
    if (category) {
      query.categories = category;
    }

    // Filter by author
    if (author) {
      query.author = author;
    }

    // Filter by featured
    if (featured !== undefined) {
      query.isFeatured = featured === "true";
    }

    // Filter by published status
    if (published !== undefined) {
      query.isPublished = published === "true";
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Execute query
    const blogs = await Blog.find(query)
      .populate("author", "name email profileImage")
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const total = await Blog.countDocuments(query);

    // Increment views for each blog if not admin
    if (req.query.view !== "false") {
      await Promise.all(
        blogs.map(async (blog) => {
          await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });
        })
      );
    }

    res.json({
      success: true,
      count: blogs.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: blogs,
    });
  } catch (error) {
    console.error("❌ Get blogs error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get single blog by ID or slug
export const getBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if id is a valid ObjectId or a slug
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    const query = isObjectId ? { _id: id } : { slug: id };

    const blog = await Blog.findOne(query)
      .populate("author", "name email profileImage")
      .populate("comments.user", "name email profileImage");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Increment views
    await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("❌ Get blog error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Create new blog
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      featuredImage,
      categories,
      tags,
      isPublished,
      isFeatured,
      metaTitle,
      metaDescription,
    } = req.body;

    // Generate slug from title
    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({
        success: false,
        message: "A blog with similar title already exists",
      });
    }

    // Create blog
    const blog = new Blog({
      title,
      slug,
      author: req.user?._id || req.body.author, // Use authenticated user or provided author
      excerpt,
      content,
      featuredImage,
      categories: categories || ["Travel"],
      tags: tags || [],
      isPublished: isPublished || false,
      publishedAt: isPublished ? new Date() : null,
      isFeatured: isFeatured || false,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt.substring(0, 150),
    });

    await blog.save();

    // Populate author info
    const populatedBlog = await Blog.findById(blog._id).populate(
      "author",
      "name email profileImage"
    );

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: populatedBlog,
    });
  } catch (error) {
    console.error("❌ Create blog error:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create blog",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // If title is being updated, generate new slug
    if (updates.title) {
      updates.slug = slugify(updates.title, {
        lower: true,
        strict: true,
        trim: true,
      });
    }

    // If publishing for the first time, set publishedAt
    if (updates.isPublished === true) {
      const existingBlog = await Blog.findById(id);
      if (existingBlog && !existingBlog.publishedAt) {
        updates.publishedAt = new Date();
      }
    }

    const blog = await Blog.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate("author", "name email profileImage");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    console.error("❌ Update blog error:", error);
    res.status(400).json({
      success: false,
      message: "Failed to update blog",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete blog error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete blog",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Like/Unlike blog
export const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check if user already liked the blog
    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike: remove user from likes array
      blog.likes = blog.likes.filter(
        (likeId) => likeId.toString() !== userId.toString()
      );
    } else {
      // Like: add user to likes array
      blog.likes.push(userId);
    }

    await blog.save();

    res.json({
      success: true,
      message: alreadyLiked ? "Blog unliked" : "Blog liked",
      data: {
        liked: !alreadyLiked,
        likeCount: blog.likes.length,
      },
    });
  } catch (error) {
    console.error("❌ Toggle like error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle like",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Add comment to blog
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!comment || comment.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Comment is required",
      });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Add comment
    blog.comments.push({
      user: userId,
      comment: comment.trim(),
      isApproved: false, // Comments need approval by admin
    });

    await blog.save();

    // Populate user info in the new comment
    const updatedBlog = await Blog.findById(id).populate(
      "comments.user",
      "name email profileImage"
    );

    const newComment = updatedBlog.comments[updatedBlog.comments.length - 1];

    res.status(201).json({
      success: true,
      message: "Comment added successfully (pending approval)",
      data: newComment,
    });
  } catch (error) {
    console.error("❌ Add comment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add comment",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Moderate comment (approve/reject)
export const moderateComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const { action } = req.body; // 'approve' or 'reject'

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const comment = blog.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (action === "approve") {
      comment.isApproved = true;
    } else if (action === "reject") {
      comment.isApproved = false;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid action. Use 'approve' or 'reject'",
      });
    }

    await blog.save();

    res.json({
      success: true,
      message: `Comment ${action}d successfully`,
      data: comment,
    });
  } catch (error) {
    console.error("❌ Moderate comment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to moderate comment",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get blog statistics
export const getBlogStats = async (req, res) => {
  try {
    const [
      totalBlogs,
      publishedBlogs,
      totalViews,
      totalLikes,
      featuredBlogs,
      blogsByCategory,
      recentBlogs,
      popularBlogs,
    ] = await Promise.all([
      Blog.countDocuments(),
      Blog.countDocuments({ isPublished: true }),
      Blog.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
      Blog.aggregate([{ $group: { _id: null, total: { $sum: { $size: "$likes" } } } }]),
      Blog.countDocuments({ isFeatured: true }),
      Blog.aggregate([
        { $unwind: "$categories" },
        { $group: { _id: "$categories", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      Blog.find({ isPublished: true })
        .sort({ publishedAt: -1 })
        .limit(5)
        .populate("author", "name"),
      Blog.find({ isPublished: true })
        .sort({ views: -1 })
        .limit(5)
        .populate("author", "name"),
    ]);

    res.json({
      success: true,
      data: {
        totalBlogs,
        publishedBlogs,
        unpublishedBlogs: totalBlogs - publishedBlogs,
        totalViews: totalViews[0]?.total || 0,
        totalLikes: totalLikes[0]?.total || 0,
        featuredBlogs,
        blogsByCategory,
        recentBlogs,
        popularBlogs,
        engagementRate:
          totalBlogs > 0
            ? Math.round(((totalLikes[0]?.total || 0) / totalBlogs) * 100) / 100
            : 0,
      },
    });
  } catch (error) {
    console.error("❌ Get blog stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog statistics",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};