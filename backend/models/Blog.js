import mongoose from 'mongoose';
import slugify from 'slugify';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: String,
    createdAt: { type: Date, default: Date.now },
    tags: [String],
    slug: { type: String, unique: true }, // unique slug
  },
  {
    collection: 'blogs', // 🔑 bind to the existing Atlas collection
  }
);

// Pre-save hook to generate unique slug
blogSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('title')) {
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    while (await mongoose.models.Blog.exists({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    this.slug = slug;
  }
  next();
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
export default Blog;