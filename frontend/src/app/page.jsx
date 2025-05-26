'use client';
import { useState, useEffect } from 'react';
import { Heart, Lightbulb, Hammer, Paintbrush, Home, Flower2, MoreHorizontal, Camera, Scissors, Bookmark, Search, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/navbar/Navbar';

export default function DIYHomepage() {
  const [hoverCategory, setHoverCategory] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFavorite, setIsFavorite] = useState({}); // Track favorites by project ID
  const [email, setEmail] = useState(''); // Add email state for newsletter
  const router = useRouter();

  // Handler for newsletter subscription
  const handleSubscribe = () => {
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email address');
      return;
    }

    toast.success('Thanks for subscribing to our newsletter!');
    setEmail(''); // Clear the input after successful subscription
  };

  // Handler for search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    router.push(`/browse-kits?search=${encodeURIComponent(searchQuery.trim())}`);
    toast.success(`Searching for ${searchQuery}...`);
  };

  // Handler for view tutorial
  const handleViewTutorial = (projectTitle) => {
    router.push(`/browse-kits?search=${encodeURIComponent(projectTitle)}`);
    toast.success(`Opening tutorial for ${projectTitle}`);
  };

  // Handler for category click
  const handleCategoryClick = (categoryName) => {
    // Navigate to browse-kits page with selected category
    router.push(`/browse-kits?category=${categoryName}`);
    toast.success(`Exploring ${categoryName} projects`);
  };

  // Handler for favorites
  const toggleFavorite = (projectId) => {
    setIsFavorite(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
    toast.success(isFavorite[projectId] ? 'Removed from favorites' : 'Added to favorites');
  };

  useEffect(() => {
    // Hide welcome message after 1 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto rotate hero images
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const categories = [
    { 
      name: "Electronics", 
      icon: <Lightbulb className="animate-pulse" />, 
      color: "bg-pink-200",
      image: "https://i.pinimg.com/736x/77/0f/ca/770fcaa73bf83f197026d2f3fe602eb9.jpg"
    },
    { 
      name: "Wood Working", 
      icon: <Hammer className="animate-bounce" />, 
      color: "bg-pink-200",
      image: "https://i.pinimg.com/736x/4b/95/28/4b9528aeddb011e81f7ead122b9a5816.jpg"
    },
    { 
      name: "Crafts", 
      icon: <Paintbrush className="animate-wiggle" />, 
      color: "bg-pink-200",
      image: "https://i.pinimg.com/736x/1f/af/90/1faf90382fd0cc5ab30d7c7a2852bb75.jpg"
    },
    { 
      name: "Home Decor", 
      icon: <Home className="animate-bounce" />, 
      color: "bg-pink-200 h-full",
      image: "https://i.pinimg.com/736x/a4/e3/07/a4e3077804b92452b4054e94ffe7c113.jpg"
    },
    { 
      name: "Gardening", 
      icon: <Flower2 className="animate-pulse" />, 
      color: "bg-pink-200",
      image: "https://i.pinimg.com/736x/6a/96/dc/6a96dc1f864cb4ed3cea560d69964caa.jpg"
    },
    { 
      name: "Other", 
      icon: <MoreHorizontal className="animate-spin-slow" />, 
      color: "bg-pink-200",
      image: "https://i.pinimg.com/736x/ed/da/51/edda514a45ebdd0dae8014b3f2995408.jpg"
    }
  ];

  const trendingProjects = [
    
     { 
      id: 1,
      title: "Electronics",
      description: "Craftes bulbs",
      image:  "https://i.pinimg.com/736x/77/0f/ca/770fcaa73bf83f197026d2f3fe602eb9.jpg",
      likes: 47
    },
    {
      id: 2,
      title: "Wood working",
      description: "study plants",
      image: "https://i.pinimg.com/736x/f0/c1/11/f0c111c83ac8d26b454880f7abc8630a.jpg", 
      likes: 32
    },
    {
      id: 3,
      title: "Quilt Pattern",
      description: "Traditional design with a twist",
      image: "https://i.pinimg.com/736x/1f/af/90/1faf90382fd0cc5ab30d7c7a2852bb75.jpg",
      likes: 65
    },
    {
      id: 4,
      title: "Knitted Scarf",
      description: "Beginner-friendly pattern",
      image: "https://i.pinimg.com/736x/1d/77/7a/1d777a74e7acdf68bf674873a42aeced.jpg",
      likes: 28
    },
    {
      id: 5,
      title: "DIY Fabric Flowers",
      description: "Quick decorative project",
      image: "https://i.pinimg.com/736x/ed/da/51/edda514a45ebdd0dae8014b3f2995408.jpg",
      likes: 51
    }

  ];

  return (
    <>
    < Navbar />
    <div className="min-h-screen bg-white flex flex-col">
      {/* Welcome Animation */}
      {showWelcome && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-4xl text-white font-bold flex items-center animate-bounce">
            Welcome to DIY World
            <Heart className="text-pink-500 ml-2 animate-pulse" size={40} />
          </div>
        </div>
      )}

      {/* Hero Section with Image Slider */}
      <div className="bg-pink-100 p-12 text-center relative overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0 opacity-20">
          <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 0 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="h-full w-full bg-[url('/api/placeholder/1200/600')] bg-cover bg-center"></div>
          </div>
          <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 1 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="h-full w-full bg-[url('/api/placeholder/1200/600')] bg-cover bg-center"></div>
          </div>
          <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 2 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="h-full w-full bg-[url('/api/placeholder/1200/600')] bg-cover bg-center"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4 text-black">Create. Make. Inspire.</h2>
          <p className="text-lg mb-8 text-black max-w-2xl mx-auto">Discover amazing DIY projects and unleash your creativity with our step-by-step guides!</p>
          <div className="relative w-full max-w-lg mx-auto">            
            <input 
              type="text" 
              placeholder="Search for projects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full p-4 pl-6 pr-12 rounded-full border-2 border-pink-300 focus:outline-none focus:border-pink-500 transition-all duration-300 hover:shadow-lg focus:shadow-xl"
              aria-label="Search projects"
            />
            <button 
              onClick={handleSearch}
              className="absolute right-4 top-4 text-pink-500 hover:text-pink-600 transition-all duration-300 transform hover:scale-110 active:scale-95"
            >
              <Search size={20} className="animate-pulse" />
            </button>
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {[0, 1, 2].map((index) => (
              <button 
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-8 rounded-full transition-all ${currentSlide === index ? 'bg-pink-500' : 'bg-pink-300'}`}
              />
            ))}
          </div>
        </div>
      </div>      {/* Featured Projects */}
      <div className="p-12 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-black text-center">Featured Projects</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-pink-50 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl">
            <div className="relative">
              <img 
                src="https://i.pinimg.com/736x/a4/e3/07/a4e3077804b92452b4054e94ffe7c113.jpg" 
                alt="Handcrafted Wall Art" 
                className="w-full h-[300px] object-cover transition-transform duration-700 hover:scale-110" 
              />
              <div className="absolute top-4 right-4 bg-pink-500 text-white rounded-full p-2 transform transition-all duration-300 hover:scale-110 hover:rotate-12">
                <Camera size={20} className="animate-pulse" />
              </div>
              <div className="absolute bottom-4 left-4 bg-pink-500 text-white px-4 py-2 rounded-full">Popular</div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-black">Handcrafted Wall Art</h3>
              <p className="text-gray-600 mb-6">Transform your living space with this beautiful DIY wall art that combines modern aesthetics with personal creativity.</p>
              <div className="flex items-center mb-6 text-pink-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">(28 reviews)</span>
              </div>
              <button 
                onClick={() => handleViewTutorial("Handcrafted Wall Art")}
                className="w-full bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition-all transform hover:scale-105 active:scale-100 text-lg"
              >
                View Tutorial
              </button>
               
            </div>
          </div>

          <div className="bg-pink-50 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl">
            <div className="relative">
              <img 
                src="https://i.pinimg.com/736x/4b/95/28/4b9528aeddb011e81f7ead122b9a5816.jpg" 
                alt="DIY Plant Stand" 
                className="w-full h-[300px] object-cover transition-transform duration-700 hover:scale-110" 
              />
              <div className="absolute top-4 right-4 bg-pink-500 text-white rounded-full p-2 transform transition-all duration-300 hover:scale-110 hover:rotate-12">
                <Bookmark size={20} className="animate-bounce" />
              </div>
              <div className="absolute bottom-4 left-4 bg-pink-500 text-white px-4 py-2 rounded-full">New</div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-black">Modern Plant Stand</h3>
              <p className="text-gray-600 mb-6">Create this elegant and functional plant stand using basic woodworking techniques. Perfect for indoor plants and small spaces.</p>
               <div className="flex items-center mb-6 text-pink-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">(24 reviews)</span>
              </div>
              <button 
              
                onClick={() => handleViewTutorial("Modern Plant Stand")}
                className="w-full bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition-all transform hover:scale-105 active:scale-100 text-lg"
              >
                View Tutorial
              </button>
            </div>
          </div>
        </div>

        
      </div>{/* Categories */}      <div className="bg-white p-12">
        <h2 className="text-3xl font-bold mb-8 text-black text-center">Explore Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <div 
              key={index}
              className={`${category.color} rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 cursor-pointer ${hoverCategory === index ? 'ring-2 ring-pink-500' : ''}`}
              onMouseEnter={() => setHoverCategory(index)}
              onMouseLeave={() => setHoverCategory(null)}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className=" h-full w-full object-contain transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg transform transition-all duration-300 hover:scale-125 hover:rotate-12 group-hover:bg-pink-50">
                  <div className="text-pink-500 transition-all duration-300 group-hover:text-pink-600">
                    {category.icon}
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-black mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">Discover amazing {category.name.toLowerCase()} projects</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter with Gallery */}
      <div className="bg-black text-white p-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            {/* Newsletter Section */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <Heart className="text-pink-500 animate-pulse mb-4" size={40} />
                <h2 className="text-3xl font-bold mb-4">Join Our Creative Community</h2>
                <p className="mb-6">Get weekly DIY inspiration, tips, and exclusive tutorials delivered to your inbox!</p>
                <div className="flex w-full max-w-md">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                    className="flex-1 p-4 rounded-l-full text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <button 
                    onClick={handleSubscribe}
                    className="bg-pink-500 px-6 py-4 rounded-r-full hover:bg-pink-600 transition-all transform hover:scale-105 active:scale-95"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="w-full md:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="col-span-1 row-span-1">
                <img src="https://i.pinimg.com/736x/6a/96/dc/6a96dc1f864cb4ed3cea560d69964caa.jpg" alt="DIY Project" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="col-span-1 row-span-2">
                <img src="https://i.pinimg.com/736x/aa/b6/da/aab6dafc1c1f90389d45ab9aed48d770.jpg" alt="DIY Project" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="col-span-1 row-span-1">
                <img src="https://i.pinimg.com/736x/29/68/62/296862472618771408ab7f4ef60b9a0f.jpg" alt="DIY Project" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="bg-white p-12">
        <h2 className="text-3xl font-bold mb-8 text-black text-center">Trending Now</h2>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex flex-nowrap overflow-x-auto gap-6 pb-8 scrollbar-hide scroll-smooth -mx-4">
            {trendingProjects.map((project) => (
              <div key={project.id} className="flex-none w-80">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-100/50">
                  <div className="relative overflow-hidden group aspect-[4/3]">
                    <img 
                      src={project.image} 
                      alt={`${project.title}`} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-[1.1]" 
                    />
                    <div className="absolute top-3 right-3 bg-pink-500 text-white rounded-full p-2 shadow-lg transform transition-all duration-300 hover:scale-125 hover:rotate-45">
                      <Scissors size={16} className="animate-bounce" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="text-white text-sm font-medium bg-pink-500/80 backdrop-blur-sm rounded-full px-3 py-1 inline-block">
                        {project.title}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-black mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => handleViewTutorial(project.title)}
                        className="text-pink-500 hover:text-pink-600 text-sm font-semibold transition-all hover:scale-105 flex items-center group"
                      >
                        View Project 
                        <ChevronRight size={16} className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => toggleFavorite(project.id)}
                          className={`${isFavorite[project.id] ? 'text-pink-500' : 'text-gray-400'} hover:text-pink-500 transition-all duration-300 p-1 hover:scale-125 transform`}
                        >
                          <Heart 
                            size={18} 
                            fill={isFavorite[project.id] ? "currentColor" : "none"} 
                            className={isFavorite[project.id] ? "animate-bounce" : "hover:animate-pulse"} 
                          />
                        </button>
                        <span className="text-sm font-medium text-gray-600">({project.likes})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}