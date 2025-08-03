import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiCalendar, 
  HiUser, 
  HiClock, 
  HiEye,
  HiHeart,
  HiChat,
  HiShare,
  HiArrowLeft,
  HiArrowRight,
  HiBookmark,
  HiPhone,
  HiMail,
  HiDownload,
  HiCheckCircle,
  HiTag
} from 'react-icons/hi';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaPrint } from 'react-icons/fa';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    bio: string;
    avatar: string;
    social: {
      twitter?: string;
      linkedin?: string;
    };
  };
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
  seo: {
    metaDescription: string;
    keywords: string[];
  };
  relatedPosts: string[];
}

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  publishedAt: string;
  replies?: Comment[];
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    content: ''
  });

  // Mock blog post data - replace with API call
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPost: BlogPost = {
        id: slug || '1',
        title: 'Sustainable Construction: Building for the Future in Kenya',
        slug: 'sustainable-construction-building-future-kenya',
        excerpt: 'Discover how sustainable construction practices are revolutionizing the building industry in Kenya, from eco-friendly materials to energy-efficient designs.',
        content: `
          <h2>Introduction to Sustainable Construction</h2>
          <p>Kenya's construction industry is experiencing a significant transformation as developers and contractors increasingly adopt sustainable building practices. This shift towards green construction is not just about environmental responsibility—it's about creating long-term value for property owners and communities.</p>
          
          <h2>Key Sustainable Construction Practices</h2>
          <h3>1. Eco-Friendly Materials</h3>
          <p>The use of locally sourced, renewable materials is becoming increasingly popular in Kenya. From bamboo and timber to recycled concrete and steel, these materials reduce the environmental impact while supporting local economies.</p>
          
          <ul>
            <li>Bamboo for structural elements and finishing</li>
            <li>Recycled plastic bricks for non-load bearing walls</li>
            <li>Local stone and clay for traditional aesthetics</li>
            <li>Solar-reflective roofing materials</li>
          </ul>
          
          <h3>2. Energy-Efficient Design</h3>
          <p>Modern sustainable buildings in Kenya incorporate passive design principles that reduce energy consumption:</p>
          
          <ul>
            <li>Natural ventilation systems</li>
            <li>Solar panel installations</li>
            <li>LED lighting throughout</li>
            <li>Energy-efficient appliances and systems</li>
          </ul>
          
          <h2>Water Conservation Technologies</h2>
          <p>Water scarcity is a growing concern in Kenya, making water conservation a critical aspect of sustainable construction. Modern buildings incorporate:</p>
          
          <blockquote>
            <p>"Rainwater harvesting systems can reduce water bills by up to 60% while contributing to sustainable development goals."</p>
          </blockquote>
          
          <h3>Rainwater Harvesting</h3>
          <p>Installing comprehensive rainwater collection and storage systems helps buildings become more self-sufficient and reduces strain on municipal water supplies.</p>
          
          <h3>Greywater Recycling</h3>
          <p>Advanced filtration systems allow for the reuse of greywater from sinks and showers for irrigation and other non-potable uses.</p>
          
          <h2>Economic Benefits of Sustainable Construction</h2>
          <p>While sustainable construction may require higher upfront investment, the long-term benefits are substantial:</p>
          
          <ul>
            <li><strong>Reduced Operating Costs:</strong> Lower utility bills through efficient systems</li>
            <li><strong>Increased Property Value:</strong> Green buildings command premium prices</li>
            <li><strong>Tax Incentives:</strong> Government incentives for sustainable building practices</li>
            <li><strong>Market Demand:</strong> Growing consumer preference for eco-friendly properties</li>
          </ul>
          
          <h2>Case Study: Green Office Complex in Nairobi</h2>
          <p>Our recent project in Westlands demonstrates the practical implementation of sustainable construction principles. The 8-story office complex features:</p>
          
          <ul>
            <li>Solar panels providing 40% of building energy needs</li>
            <li>Rainwater harvesting system with 50,000-liter capacity</li>
            <li>Green roof reducing cooling costs by 25%</li>
            <li>Locally sourced materials for 70% of construction</li>
          </ul>
          
          <h2>Challenges and Solutions</h2>
          <p>Implementing sustainable construction in Kenya faces several challenges, but innovative solutions are emerging:</p>
          
          <h3>Cost Concerns</h3>
          <p>While initial costs may be higher, financing options and long-term savings make sustainable construction economically viable.</p>
          
          <h3>Skill Development</h3>
          <p>Training programs for workers in sustainable construction techniques are essential for industry growth.</p>
          
          <h3>Material Availability</h3>
          <p>Building strong supply chains for sustainable materials ensures consistent availability and quality.</p>
          
          <h2>Future of Sustainable Construction in Kenya</h2>
          <p>The future looks bright for sustainable construction in Kenya, with government support, increasing awareness, and technological advancement driving growth in this sector.</p>
          
          <p>As we continue to innovate and implement these practices, we're not just building structures—we're building a sustainable future for Kenya.</p>
        `,
        featuredImage: '/images/blog/sustainable-construction.jpg',
        author: {
          name: 'James Kariuki',
          bio: 'Senior Construction Engineer with over 12 years of experience in sustainable building practices. James leads our green construction initiatives at Akibeks Construction.',
          avatar: '/images/team/james-kariuki.jpg',
          social: {
            twitter: 'https://twitter.com/jameskariuki',
            linkedin: 'https://linkedin.com/in/james-kariuki'
          }
        },
        publishedAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-16T14:30:00Z',
        readTime: '8 min read',
        category: 'Sustainable Construction',
        tags: ['Sustainability', 'Green Building', 'Kenya Construction', 'Eco-Friendly', 'Energy Efficiency'],
        views: 2847,
        likes: 156,
        comments: 23,
        featured: true,
        seo: {
          metaDescription: 'Learn about sustainable construction practices in Kenya, including eco-friendly materials, energy-efficient designs, and water conservation technologies.',
          keywords: ['sustainable construction', 'green building Kenya', 'eco-friendly construction', 'energy efficient buildings']
        },
        relatedPosts: ['2', '3', '4']
      };
      
      const mockComments: Comment[] = [
        {
          id: '1',
          author: 'Sarah Wanjiku',
          email: 'sarah@email.com',
          content: 'Excellent article! We\'re planning to build our family home and this has given us great insights into sustainable options.',
          publishedAt: '2024-01-16T09:00:00Z'
        },
        {
          id: '2',
          author: 'David Mutua',
          email: 'david@email.com',
          content: 'As a fellow contractor, I appreciate the practical examples. The Westlands case study is particularly impressive.',
          publishedAt: '2024-01-16T11:30:00Z'
        },
        {
          id: '3',
          author: 'Grace Akinyi',
          email: 'grace@email.com',
          content: 'How do you handle the higher upfront costs? Are there financing options available for sustainable construction?',
          publishedAt: '2024-01-16T15:45:00Z'
        }
      ];
      
      setPost(mockPost);
      setComments(mockComments);
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || 'Akibeks Construction Blog';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
      print: () => window.print()
    };

    if (platform === 'print') {
      shareUrls.print();
    } else if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls] as string, '_blank', 'width=600,height=400');
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.author && newComment.email && newComment.content) {
      const comment: Comment = {
        id: Date.now().toString(),
        ...newComment,
        publishedAt: new Date().toISOString()
      };
      setComments([...comments, comment]);
      setNewComment({ author: '', email: '', content: '' });
      setShowCommentForm(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return formatDate(dateString);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => navigate(-1)}
            className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-200"
          >
            <HiArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="relative h-[50vh] overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end justify-center pb-16">
            <div className="max-w-4xl mx-auto px-4 text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <span className="bg-primary-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                  {post.featured && (
                    <span className="bg-yellow-500 px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                      Featured
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
                <p className="text-lg md:text-xl mb-6 leading-relaxed max-w-3xl mx-auto">{post.excerpt}</p>
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <HiCalendar className="w-4 h-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <HiClock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <HiEye className="w-4 h-4" />
                    <span>{post.views.toLocaleString()} views</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding-small">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Social Share (Desktop) */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-8 space-y-6">
                {/* Social Share */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Share Article</h3>
                  <div className="space-y-3">
                    {[
                      { icon: FaFacebook, platform: 'facebook', color: 'text-blue-600', label: 'Facebook' },
                      { icon: FaTwitter, platform: 'twitter', color: 'text-blue-400', label: 'Twitter' },
                      { icon: FaLinkedin, platform: 'linkedin', color: 'text-blue-700', label: 'LinkedIn' },
                      { icon: FaWhatsapp, platform: 'whatsapp', color: 'text-green-600', label: 'WhatsApp' },
                      { icon: FaPrint, platform: 'print', color: 'text-gray-600', label: 'Print' }
                    ].map(({ icon: Icon, platform, color, label }) => (
                      <button
                        key={platform}
                        onClick={() => handleShare(platform)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 ${color}`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium text-gray-700">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Article Actions */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Article Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                        isLiked ? 'bg-red-50 text-red-600' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <HiHeart className="w-5 h-5" />
                      <span className="font-medium">
                        {isLiked ? 'Liked' : 'Like'} ({post.likes + (isLiked ? 1 : 0)})
                      </span>
                    </button>
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                        isBookmarked ? 'bg-primary-50 text-primary-600' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <HiBookmark className="w-5 h-5" />
                      <span className="font-medium">
                        {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 cursor-pointer transition-colors duration-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-primary-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Need Construction Services?</h3>
                  <p className="text-gray-600 text-sm mb-4">Get expert advice and a free quote for your next project.</p>
                  <div className="space-y-2">
                    <Link
                      to="/quote"
                      className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 text-center block"
                    >
                      Get Free Quote
                    </Link>
                    <a
                      href="tel:+254700123456"
                      className="w-full bg-white text-primary-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 text-center block"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <article className="bg-white rounded-xl p-8 shadow-sm">
                {/* Article Meta */}
                <div className="border-b border-gray-200 pb-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{formatDate(post.publishedAt)}</span>
                          {post.updatedAt && (
                            <span>Updated {formatRelativeTime(post.updatedAt)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <HiEye className="w-4 h-4" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <HiHeart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <HiChat className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Author Bio */}
                <div className="bg-gray-50 rounded-xl p-6 mt-8">
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">About {post.author.name}</h3>
                      <p className="text-gray-600 mb-4">{post.author.bio}</p>
                      <div className="flex space-x-3">
                        {post.author.social.twitter && (
                          <a
                            href={post.author.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-500"
                          >
                            <FaTwitter className="w-5 h-5" />
                          </a>
                        )}
                        {post.author.social.linkedin && (
                          <a
                            href={post.author.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:text-blue-800"
                          >
                            <FaLinkedin className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Comments Section */}
              <div className="bg-white rounded-xl p-8 shadow-sm mt-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Comments ({comments.length})
                  </h3>
                  <button
                    onClick={() => setShowCommentForm(!showCommentForm)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
                  >
                    Add Comment
                  </button>
                </div>

                {/* Comment Form */}
                {showCommentForm && (
                  <form onSubmit={handleCommentSubmit} className="bg-gray-50 rounded-lg p-6 mb-8">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={newComment.author}
                        onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={newComment.email}
                        onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <textarea
                      placeholder="Your Comment"
                      rows={4}
                      value={newComment.content}
                      onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent mb-4"
                      required
                    />
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
                      >
                        Post Comment
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCommentForm(false)}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold">
                            {comment.author.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                            <span className="text-sm text-gray-500">
                              {formatRelativeTime(comment.publishedAt)}
                            </span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Posts */}
              <div className="bg-white rounded-xl p-8 shadow-sm mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {post.relatedPosts.map((relatedId) => (
                    <Link
                      key={relatedId}
                      to={`/blog/sample-post-${relatedId}`}
                      className="group"
                    >
                      <img
                        src={`/images/blog/related-${relatedId}.jpg`}
                        alt="Related post"
                        className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                      <h4 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 mb-2">
                        Sample Related Article {relatedId}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Brief description of the related article content...
                      </p>
                    </Link>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Link
                    to="/blog"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View All Articles →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Construction Project?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Get expert advice and a free consultation for your next construction project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quote"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Get Your Free Quote
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;