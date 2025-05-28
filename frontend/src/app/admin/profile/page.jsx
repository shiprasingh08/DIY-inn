'use client';
import { useState } from 'react';
import { Bell, MessageSquare, Settings, LogOut, Edit, Camera, Heart, Calendar, Eye } from 'lucide-react';

export default function AdminProfile() {
  const [activeTab, setActiveTab] = useState('projects');
  
  // Sample data
  const user = {
    name: "Shipra Singh",
    role: "Admin / DIY Creator",
    avatar: "/nest&needle.jpg",
    bio: "Passionate about upcycling and sustainable DIY projects. I love transforming old furniture and creating home decor with minimal environmental impact.",
    stats: {
      followers: 8529,
      following: 472,
      projects: 146,
      likes: 12783
    }
  };
  
  const projects = [
    {
      id: 1,
      title: "Vintage Chair Restoration",
      image: "/api/placeholder/400/250",
      likes: 487,
      views: 2341,
      date: "Apr 23, 2025"
    },
    {
      id: 2,
      title: "Mason Jar Lamp DIY",
      image: "/api/placeholder/400/250",
      likes: 329,
      views: 1876,
      date: "Apr 12, 2025"
    },
    {
      id: 3,
      title: "Pallet Wood Coffee Table",
      image: "/api/placeholder/400/250",
      likes: 563,
      views: 3245,
      date: "Mar 29, 2025"
    }
  ];
  
  const notifications = [
    { id: 1, text: "Julie liked your Vintage Chair Restoration", time: "2h ago" },
    { id: 2, text: "New comment on Mason Jar Lamp DIY", time: "5h ago" },
    { id: 3, text: "Featured: Your Pallet Wood Coffee Table was selected for the weekly newsletter", time: "1d ago" },
    { id: 4, text: "Mike started following you", time: "2d ago" }
  ];
  
  const messages = [
    { id: 1, user: "Mike Hanson", text: "Love your latest project! Could you share more details about the materials?", time: "3h ago", avatar: "/api/placeholder/40/40" },
    { id: 2, user: "Emma Lee", text: "Would you be interested in collaborating on a sustainable home decor series?", time: "1d ago", avatar: "/api/placeholder/40/40" },
    { id: 3, user: "DIY Community", text: "Your submission for the Spring DIY Contest has been received!", time: "2d ago", avatar: "/api/placeholder/40/40" }
  ];
    return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-pink-300 to-pink-500 relative">
            <button className="absolute bottom-4 right-4 bg-black bg-opacity-50 p-2 rounded-full">
              <Camera size={20} className="text-white" />
            </button>
          </div>
          
          {/* Profile Info */}
          <div className="flex flex-col md:flex-row p-6 relative">
            {/* Avatar */}
            <div className="md:absolute md:-top-16 flex flex-col items-center md:items-start">
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover" 
                />
                <button className="absolute bottom-0 right-0 bg-pink-500 p-1 rounded-full">
                  <Edit size={16} className="text-white" />
                </button>
              </div>
            </div>
            
            {/* User Info */}
            <div className="md:ml-32 flex-1 mt-6 md:mt-0">
              <div className="flex flex-col md:flex-row md:justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-gray-600">{user.role}</p>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                  Edit Profile
                </button>
              </div>
              
              <p className="mt-4 text-gray-700">{user.bio}</p>
              
              {/* Stats */}
              <div className="mt-6 flex justify-between md:w-2/3">
                <div className="text-center">
                  <p className="font-bold text-xl">{user.stats.followers.toLocaleString()}</p>
                  <p className="text-gray-600 text-sm">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-xl">{user.stats.following.toLocaleString()}</p>
                  <p className="text-gray-600 text-sm">Following</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-xl">{user.stats.projects.toLocaleString()}</p>
                  <p className="text-gray-600 text-sm">Projects</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-xl">{user.stats.likes.toLocaleString()}</p>
                  <p className="text-gray-600 text-sm">Likes</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex">
              <button 
                onClick={() => setActiveTab('projects')}
                className={`flex-1 py-4 text-center font-medium ${activeTab === 'projects' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-600 hover:text-pink-500'}`}
              >
                Projects
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`flex-1 py-4 text-center font-medium ${activeTab === 'notifications' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-600 hover:text-pink-500'}`}
              >
                Notifications
              </button>
              <button 
                onClick={() => setActiveTab('messages')}
                className={`flex-1 py-4 text-center font-medium ${activeTab === 'messages' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-600 hover:text-pink-500'}`}
              >
                Messages
              </button>
            </div>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">My Projects</h3>
                <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                  Add New Project
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                  <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                      <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white rounded-full p-1">
                        <Edit size={16} />
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold mb-2">{project.title}</h4>
                      <div className="flex justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <Heart size={16} className="text-pink-500 mr-1" />
                          <span>{project.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <Eye size={16} className="mr-1" />
                          <span>{project.views}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          <span>{project.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div>
              <h3 className="text-xl font-bold mb-6">Notifications</h3>
              <div className="divide-y divide-gray-200">
                {notifications.map(notification => (
                  <div key={notification.id} className="py-4 flex justify-between">
                    <div>
                      <p className="text-gray-900">{notification.text}</p>
                      <p className="text-sm text-gray-500">{notification.time}</p>
                    </div>
                    <button className="text-pink-500 hover:text-pink-700">
                      <Bell size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div>
              <h3 className="text-xl font-bold mb-6">Messages</h3>
              <div className="divide-y divide-gray-200">
                {messages.map(message => (
                  <div key={message.id} className="py-4 flex">
                    <img src={message.avatar} alt={message.user} className="w-10 h-10 rounded-full mr-4" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{message.user}</p>
                        <p className="text-sm text-gray-500">{message.time}</p>
                      </div>
                      <p className="text-gray-700">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button className="w-full py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors font-medium">
                  View All Messages
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-black text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-pink-400 font-bold text-lg mb-2">DIY<span className="text-white">Haven</span></p>
          <p className="text-gray-400">© 2025 DIYHaven. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}