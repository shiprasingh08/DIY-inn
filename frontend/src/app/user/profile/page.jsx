'use client';
import { useState } from 'react';
import { Heart, Edit, Plus, LogOut, Mail, Bell } from 'lucide-react';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('projects');
  
  // Sample user data
  const userData = {
    name: "Nest&Needle",
    username: "@nestandneedle",
    bio: "DIY enthusiast passionate about upcycling and sustainable crafts.",
    profileImage: "/public/images/nest&needle.jpg",
  };
  
  // Sample projects data with liked state
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      title: "Upcycled Pallet Coffee Table", 
      image: "/api/placeholder/300/200",
      liked: false
    },
    { 
      id: 2, 
      title: "Macramé Plant Hangers", 
      image: "/api/placeholder/300/200",
      liked: false
    },
    { 
      id: 3, 
      title: "DIY Terrarium", 
      image: "/api/placeholder/300/200",
      liked: false 
    }
  ]);
    // Function to toggle like state
  const toggleLike = (id) => {
    setProjects(projects.map(project => 
      project.id === id ? {...project, liked: !project.liked} : project
    ));
  };

  // Function to remove project
  const removeProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  // Function to handle notifications
  const handleNotifications = () => {
    alert("Notifications clicked");
  };

  // Function to handle messages
  const handleMessages = () => {
    alert("Messages clicked");
  };

  // Function to handle logout
  const handleLogout = () => {
    alert("Logging out...");
    // Add your logout logic here
  };
  
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <div className="w-full h-32 bg-pink-500"></div>
      
      {/* Profile Section */}
      <div className="max-w-2xl mx-auto px-4 -mt-16">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center">
            {/* Profile Picture */}
            <img 
              src={userData.profileImage} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
            
            {/* User Info */}
            <div className="mt-4 text-center">
              <h1 className="text-xl font-bold text-gray-900">{userData.name}</h1>
              <p className="text-gray-600">{userData.username}</p>
              <p className="text-gray-700 mt-2">{userData.bio}</p>
              
              <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md flex items-center text-sm font-medium mx-auto">
                <Edit size={16} className="mr-1" />
                Edit Profile
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="mt-8 border-t border-gray-200">
            <nav className="flex justify-center">
              <button 
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-3 font-medium text-sm ${activeTab === 'projects' ? 'text-pink-600 border-b-2 border-pink-500' : 'text-gray-600 hover:text-gray-900'}`}
              >
                My Projects
              </button>
              <button 
                onClick={() => setActiveTab('collections')}
                className={`px-4 py-3 font-medium text-sm ${activeTab === 'collections' ? 'text-pink-600 border-b-2 border-pink-500' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Collections
              </button>
            </nav>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="mt-6">
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">My Projects</h2>
                <button className="bg-black hover:bg-gray-800 text-white px-3 py-1 rounded-md flex items-center text-sm font-medium">
                  <Plus size={16} className="mr-1" />
                  New
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map(project => (
                  <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />                    <div className="p-3">
                      <h3 className="font-medium text-gray-900">{project.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <button 
                          onClick={() => removeProject(project.id)}
                          className="text-red-500 hover:text-red-600 text-sm flex items-center"
                        >
                          Remove
                        </button>
                        <button 
                          className={`${project.liked ? 'text-pink-500' : 'text-gray-400'} hover:text-pink-600`}
                          onClick={() => toggleLike(project.id)}
                        >
                          <Heart size={16} fill={project.liked ? "#ec4899" : "none"} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Collections Tab */}
          {activeTab === 'collections' && (
            <div className="text-center py-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">No Collections Yet</h2>
              <p className="text-gray-600 mb-4">Create your first collection to organize your favorite DIY projects</p>
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md">
                Create Collection
              </button>
            </div>
          )}
        </div>
      </div>
        {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 flex justify-around items-center">
        <button 
          className="text-gray-600 hover:text-pink-500"
          onClick={() => setActiveTab('collections')}
          title="Collections"
        >
          <Heart size={20} />
        </button>
        <button 
          className="text-gray-600 hover:text-pink-500"
          onClick={handleNotifications}
          title="Notifications"
        >
          <Bell size={20} />
        </button>
        <button 
          className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600"
          onClick={() => setActiveTab('projects')}
          title="Add New Project"
        >
          <Plus size={20} />
        </button>
        <button 
          className="text-gray-600 hover:text-pink-500"
          onClick={handleMessages}
          title="Messages"
        >
          <Mail size={20} />
        </button>
        <button 
          className="text-gray-600 hover:text-pink-500"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}
