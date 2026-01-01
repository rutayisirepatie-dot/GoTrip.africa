import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Safe model compilation to prevent OverwriteModelError
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;