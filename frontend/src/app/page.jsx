'use client';
import { useState, useEffect } from 'react';
import { Heart, Lightbulb, Hammer, Paintbrush, Home, Flower2, MoreHorizontal, Camera, Scissors, Bookmark, Search, Star } from 'lucide-react';

export default function DIYHomepage() {
  const [hoverCategory, setHoverCategory] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Hide welcome message after 3 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto rotate hero images
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: "Electronics", icon: <Lightbulb className="animate-pulse" />, color: "bg-pink-100"  },
    { name: "Wood Working", icon: <Hammer className="animate-bounce" />, color: "bg-pink-200" },
    { name: "Crafts", icon: <Paintbrush className="animate-wiggle" />, color: "bg-pink-300" },
    { name: "Home Decor", icon: <Home className="animate-bounce" />, color: "bg-pink-400" },
    { name: "Gardening", icon: <Flower2 className="animate-pulse" />, color: "bg-pink-500" },
    { name: "Other", icon: <MoreHorizontal className="animate-spin-slow" />, color: "bg-pink-600" }
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
              className="w-full p-4 pl-6 pr-12 rounded-full border-2 border-pink-300 focus:outline-none focus:border-pink-500"
            />
            <button className="absolute right-4 top-4 text-pink-500">
              <Search size={20} />
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
      </div>

      {/* Featured Projects */}
      <div className=" p-12 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-black text-center">Featured Projects</h2>

        {/* First featured project */}
        <div className="bg-pink-50 rounded-lg p-6 max-w-4xl mx-auto shadow-lg flex flex-col md:flex-row items-center mb-8">
          <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-6 relative overflow-hidden rounded-lg">
            <img src="https://i.pinimg.com/736x/a4/e3/07/a4e3077804b92452b4054e94ffe7c113.jpg" alt="Handcrafted Wall Art" className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110" />
            <div className="absolute top-2 right-2 bg-pink-500 text-white rounded-full p-2">
              <Camera size={20} />
            </div>
            <div className="absolute bottom-0 left-0 bg-pink-500 text-white px-3 py-1">Popular</div>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold mb-2 text-black">Handcrafted Wall Art</h3>
            <p className="text-black mb-4">Transform your living space with this beautiful DIY wall art that combines modern aesthetics with personal creativity.</p>
            <div className="flex items-center text-pink-500 mb-4">
              <span className="ml-1 text-black">(128 reviews)</span>
            </div>
            <button className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors">
              View Tutorial
            </button>
          </div>
        </div>

        {/* Second featured project */}
        <div className="bg-pink-50 rounded-lg p-6 max-w-4xl mx-auto shadow-lg flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-6 relative overflow-hidden rounded-lg">
            <img src="https://i.pinimg.com/736x/4b/95/28/4b9528aeddb011e81f7ead122b9a5816.jpg" alt="DIY Plant Stand" className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110" />
            <div className="absolute top-2 right-2 bg-pink-500 text-white rounded-full p-2">
              <Bookmark size={20} />
            </div>
            <div className="absolute bottom-0 left-0 bg-black text-white px-3 py-1">New</div>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold mb-2 text-black">Modern Plant Stand</h3>
            <p className="text-black mb-4">Create this elegant and functional plant stand using basic woodworking techniques. Perfect for indoor plants and small spaces.</p>
            <div className="flex items-center text-pink-500 mb-4">
              <Star className="text-pink-500" size={20} />
              <Star className="text-pink-500" size={20} />
              <Star className="text-pink-500" size={20} />
              <Star className="text-pink-500" size={20} />
              <span className="ml-1 text-black">(86 reviews)</span>
            </div>
            <button className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors">
              View Tutorial
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white p-12">
        <h2 className="text-3xl font-bold mb-8 text-black text-center">Explore Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <div 
              key={index}
              className={`${category.color} rounded-lg p-6 text-center shadow-md transform transition-all duration-300 hover:scale-105 cursor-pointer ${hoverCategory === index ? 'ring-4 ring-pink-500' : ''}`}
              onMouseEnter={() => setHoverCategory(index)}
              onMouseLeave={() => setHoverCategory(null)}
            >
              <div className="relative">
                <img 
                  src={'https://i.pinimg.com/736x/5e/80/94/5e80948c3d6cc1b02e8d9efd2b50e7f2.jpg'} 
                  alt={category.name} 
                  className="rounded-lg w-full h-40 object-cover mb-4" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center mx-auto text-pink-500">
                    {category.icon}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-black">{category.name}</h3>
              <p className="mt-2 text-black">Discover amazing {category.name.toLowerCase()} projects</p>
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
                    className="flex-1 p-4 rounded-l-full text-black focus:outline-none"
                  />
                  <button className="bg-pink-500 px-6 py-4 rounded-r-full hover:bg-pink-600 transition-colors">
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
        <div className="flex flex-nowrap overflow-x-auto gap-6 pb-6 max-w-6xl mx-auto hide-scrollbar">
          {trendingProjects.map((project) => (
            <div key={project.id} className="flex-none w-64">
              <div className="bg-pink-50 rounded-lg overflow-hidden shadow-md">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={`${project.title}`} 
                    className="w-full h-40 object-cover" 
                  />
                  <div className="absolute top-2 right-2 bg-pink-500 text-white rounded-full p-1">
                    <Scissors size={16} />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-black">{project.title}</h3>
                  <p className="text-sm text-black mb-2">{project.description}</p>
                  <div className="flex items-center text-pink-500">
                    <span className="ml-1 text-xs text-black">({project.likes})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}