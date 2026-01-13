import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  featuredImage: { type: String, required: true },
  images: [{ type: String }],
  tags: [{ type: String }],
  category: { type: String, required: true },
  featured: { type: Boolean, default: false },
  readTime: { type: Number, min: 1 }, // in minutes
  published: { type: Boolean, default: false },
  publishedDate: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// Virtual for formatted published date
blogPostSchema.virtual('formattedDate').get(function() {
  return this.publishedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Virtual for reading time text
blogPostSchema.virtual('readTimeText').get(function() {
  return `${this.readTime} min read`;
});

// Increment views middleware
blogPostSchema.pre('save', function(next) {
  if (this.isModified('views')) {
    // Additional view logic if needed
  }
  next();
});

// Indexes
blogPostSchema.index({ title: 'text', content: 'text', excerpt: 'text' });
blogPostSchema.index({ category: 1 });
blogPostSchema.index({ tags: 1 });
blogPostSchema.index({ featured: 1 });
blogPostSchema.index({ published: 1 });
blogPostSchema.index({ publishedDate: -1 });
blogPostSchema.index({ views: -1 });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;