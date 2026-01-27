import mongoose from 'mongoose';
import slugify from 'slugify';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    index: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  },
  author: {
    type: String,
    required: [true, 'Author is required']
  },
  authorImage: {
    type: String,
    required: [true, 'Author image is required']
  },
  authorRole: String,
  authorBio: String,
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  featuredImage: {
    type: String,
    required: [true, 'Featured image is required']
  },
  gallery: [String],
  category: {
    type: String,
    required: [true, 'Category is required'],
    index: true
  },
  subcategory: String,
  featured: {
    type: Boolean,
    default: false,
    index: true
  },
  published: {
    type: Boolean,
    default: true,
    index: true
  },
  readTime: {
    type: Number,
    default: 5
  },
  wordCount: {
    type: Number,
    default: 0
  },
  publishedDate: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedDate: {
    type: Date,
    default: Date.now
  },
  tags: [String],
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String],
  relatedPosts: [{
    id: String,
    title: String
  }],
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  language: {
    type: String,
    default: 'en',
    enum: ['en', 'fr', 'rw']
  },
  difficultyLevel: String,
  targetAudience: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Auto-create slug before saving
blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// Auto-calculate word count
blogSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const words = this.content.split(/\s+/).length;
    this.wordCount = words;
    this.readTime = Math.ceil(words / 200); // 200 words per minute
  }
  next();
});

// Indexes for performance
blogSchema.index({ slug: 1, published: 1 });
blogSchema.index({ category: 1, published: 1 });
blogSchema.index({ featured: 1, published: 1 });
blogSchema.index({ publishedDate: -1 });
blogSchema.index({ views: -1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ title: 'text', content: 'text', excerpt: 'text' });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;