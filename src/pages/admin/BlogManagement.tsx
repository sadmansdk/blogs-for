import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBlogPosts, addBlogPost, deleteBlogPost, updateBlogPost } from "@/lib/firestore";
import { BlogPost, Author } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Clock, ArrowRight, Image, User, Timer, FileText, Layout, Tag } from "lucide-react";
import AlertDialog from "@/components/ui/AlertDialog";

const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    postId: string | null;
  }>({
    isOpen: false,
    postId: null,
  });
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    coverImage: "",
    readTime: 5,
    author: {
      name: "",
      avatar: "",
    } as Author,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getBlogPosts();
      console.log("Fetched posts:", fetchedPosts);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      coverImage: post.coverImage,
      readTime: post.readTime,
      author: post.author,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const postData = {
        ...formData,
        createdAt: editingPost?.createdAt || new Date().toISOString(),
      };

      if (editingPost) {
        await updateBlogPost(editingPost.id, postData);
      } else {
        await addBlogPost(postData);
      }

      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        coverImage: "",
        readTime: 5,
        author: {
          name: "",
          avatar: "",
        },
      });
      setShowForm(false);
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteDialog({ isOpen: true, postId: id });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.postId) return;

    try {
      await deleteBlogPost(deleteDialog.postId);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setDeleteDialog({ isOpen: false, postId: null });
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPost(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      coverImage: "",
      readTime: 5,
      author: {
        name: "",
        avatar: "",
      },
    });
  };

  // Get the background color class based on the category
  const getCategoryColorClass = (category: string) => {
    if (category.includes("Climate Change")) return "bg-red-500";
    if (category.includes("Sustainable Living")) return "bg-green-500";
    if (category.includes("Renewable Energy")) return "bg-blue-500";
    if (category.includes("Pollution")) return "bg-yellow-600";
    if (category.includes("Biodiversity")) return "bg-purple-500";
    if (category.includes("Environmental Technology")) return "bg-indigo-500";
    if (category.includes("Green Business")) return "bg-emerald-500";
    if (category.includes("Environmental Laws")) return "bg-cyan-500";
    if (category.includes("Agriculture")) return "bg-orange-500";
    if (category.includes("Water")) return "bg-teal-500";
    return "bg-gray-500"; // default color
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-blog-primary hover:bg-blog-secondary text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Add/Edit Post Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden transition-all duration-300">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blog-primary to-blog-secondary p-6 text-white">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {editingPost ? <Pencil className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
              {editingPost ? "Edit Post" : "Create New Post"}
            </h2>
            <p className="text-white/80 mt-1">Fill in the details to {editingPost ? 'update' : 'create'} your blog post</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Title */}
                <div className="group">
                  <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
                    <Layout className="w-4 h-4 text-blog-primary" />
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blog-primary/20 focus:border-blog-primary transition-all duration-200"
                    placeholder="Enter post title..."
                    required
                  />
                </div>

                {/* Author Section */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <h3 className="font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-blog-primary" />
                    Author Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-600">Name</label>
                    <input
                      type="text"
                      value={formData.author.name}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        author: { ...formData.author, name: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blog-primary/20 focus:border-blog-primary"
                      placeholder="Author's name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-600">Avatar URL</label>
                    <input
                      type="text"
                      value={formData.author.avatar}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        author: { ...formData.author, avatar: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blog-primary/20 focus:border-blog-primary"
                      placeholder="https://example.com/avatar.jpg"
                      required
                    />
                  </div>
                </div>

                {/* Category & Read Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-blog-primary" />
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blog-primary/20 focus:border-blog-primary appearance-none bg-white"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Climate Change & Global Warming">Climate Change & Global Warming</option>
                      <option value="Sustainable Living">Sustainable Living</option>
                      <option value="Renewable Energy">Renewable Energy</option>
                      <option value="Pollution & Waste Management">Pollution & Waste Management</option>
                      <option value="Biodiversity & Conservation">Biodiversity & Conservation</option>
                      <option value="Environmental Technology & Innovation">Environmental Technology & Innovation</option>
                      <option value="Green Business & Economy">Green Business & Economy</option>
                      <option value="Environmental Laws & Policies">Environmental Laws & Policies</option>
                      <option value="Agriculture & Food Sustainability">Agriculture & Food Sustainability</option>
                      <option value="Water & Ocean Conservation">Water & Ocean Conservation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
                      <Timer className="w-4 h-4 text-blog-primary" />
                      Read Time
                    </label>
                    <input
                      type="number"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blog-primary/20 focus:border-blog-primary"
                      required
                      min="1"
                      placeholder="Minutes"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Cover Image */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
                    <Image className="w-4 h-4 text-blog-primary" />
                    Cover Image
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blog-primary/20 focus:border-blog-primary"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                    {formData.coverImage && (
                      <div className="mt-2 relative h-[120px] rounded-lg overflow-hidden">
                        <img
                          src={formData.coverImage}
                          alt="Cover preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blog-primary" />
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blog-primary/20 focus:border-blog-primary resize-none"
                    rows={3}
                    required
                    placeholder="Brief summary of the post..."
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blog-primary" />
                    Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blog-primary/20 focus:border-blog-primary resize-none"
                    rows={8}
                    required
                    placeholder="Write your post content here..."
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="px-6 py-2 border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-6 py-2 bg-blog-primary hover:bg-blog-secondary text-white flex items-center gap-2"
              >
                {editingPost ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {editingPost ? "Update Post" : "Create Post"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col relative group">
            {/* Image Container with Gradient Overlay */}
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10" />
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span 
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full text-white backdrop-blur-sm shadow-lg ${getCategoryColorClass(post.category)} transition-transform duration-300 group-hover:scale-105`}
                >
                  {post.category}
                </span>
              </div>
              
              {/* Admin Actions */}
              <div className="absolute top-4 right-4 z-20 flex space-x-2">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(post);
                  }}
                  size="sm"
                  className="bg-white/90 hover:bg-white text-gray-700 backdrop-blur-sm"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(post.id);
                  }}
                  size="sm"
                  className="bg-white/90 hover:bg-white text-red-600 backdrop-blur-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow">
              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blog-primary transition-colors duration-300 line-clamp-2">
                {post.title}
              </h2>
              
              {/* Excerpt */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                {/* Author Info */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{post.author.name}</span>
                    <div className="flex items-center text-xs text-gray-500 space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </div>

                {/* View Post Link */}
                <Link 
                  to={`/blog/${post.id}`}
                  className="text-blog-primary hover:translate-x-1 transition-transform duration-300"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, postId: null })}
        onConfirm={confirmDelete}
        title="Delete Post"
        description="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default BlogManagement; 