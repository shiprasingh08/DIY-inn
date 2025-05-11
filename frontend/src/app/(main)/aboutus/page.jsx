'use client';
import { useState, useEffect } from "react";
import { ArrowRight, Heart, Users, Wrench, Instagram, Twitter, Facebook } from "lucide-react";

export default function AboutUsPage() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    mission: false,
    team: false,
    values: false,
    contact: false
  });

  useEffect(() => {
    // Simulate staggered animations on initial load
    const timer1 = setTimeout(() => setIsVisible(prev => ({ ...prev, hero: true })), 100);
    const timer2 = setTimeout(() => setIsVisible(prev => ({ ...prev, mission: true })), 400);
    const timer3 = setTimeout(() => setIsVisible(prev => ({ ...prev, team: true })), 700);
    const timer4 = setTimeout(() => setIsVisible(prev => ({ ...prev, values: true })), 1000);
    const timer5 = setTimeout(() => setIsVisible(prev => ({ ...prev, contact: true })), 1300);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & Creative Director",
      bio: "DIY enthusiast with 10+ years experience in crafting and home improvement.",
      image: "https://i.pinimg.com/736x/ee/21/e9/ee21e94f43cd24156a1812f1c8c0dc54.jpg"
    },
    {
      name: "Sam Rivera",
      role: "Lead Content Creator",
      bio: "Former interior designer who loves teaching others how to transform their spaces.",
      image: "https://i.pinimg.com/736x/f2/af/32/f2af32525d915293ff8623a50945fab8.jpg"
    },
    {
      name: "Taylor Kim",
      role: "Community Manager",
      bio: "Passionate about building communities around shared creative interests.",
      image:"https://i.pinimg.com/736x/f4/6e/6b/f46e6b5bbbbe848ec3745cced31f67f9.jpg"
    }
  ];

  const animateClass = (element) => {
    return isVisible[element] 
      ? "opacity-100 translate-y-0 transition-all duration-700" 
      : "opacity-0 translate-y-10 transition-all duration-700";
  };

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Hero Section */}
      <section className={`bg-pink-50 py-16 md:py-32 relative overflow-hidden ${animateClass('hero')}`}>
        <div className="absolute top-0 right-0 h-full w-1/3 bg-pink-500 transform -skew-x-12"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              We Make <span className="text-pink-500">DIY</span> Accessible to Everyone
            </h1>
            <p className="text-lg md:text-xl mb-8">
              More than just tutorials - we're building a community of makers, dreamers, and doers who believe in the power of creating with your own hands.
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center group">
              Our Story
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={`py-16 md:py-24 container mx-auto px-4 md:px-8 ${animateClass('mission')}`}>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg mb-6">
              We started DIYHub with a simple idea: everyone should have the confidence and skills to create, repair, and reimagine the world around them.
            </p>
            <p className="text-lg mb-6">
              In a world of mass production and disposable products, we believe in the enduring value of handmade items, the satisfaction of fixing something yourself, and the joy of personal expression through creation.
            </p>
            <p className="text-lg">
              Through accessible tutorials, supportive community, and high-quality resources, we're empowering the next generation of DIY enthusiasts.
            </p>
          </div>
          <div className="md:w-1/2 relative">
            <div className="aspect-w-16 aspect-h-9 relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://i.pinimg.com/736x/b2/29/bd/b229bd20894fabecd61ea904bfd4b584.jpg" 
                alt="DIY workshop scene" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-pink-500 opacity-20"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-pink-100 -z-10"></div>
            <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-pink-200 -z-10"></div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`bg-pink-50 py-16 md:py-24 ${animateClass('team')}`}>
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Meet Our Team</h2>
          <p className="text-lg text-center max-w-3xl mx-auto mb-12">
            We're a passionate group of creators, teachers, and DIY enthusiasts dedicated to sharing our knowledge and inspiring your next project.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg overflow-hidden shadow-lg group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-pink-500 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`py-16 md:py-24 container mx-auto px-4 md:px-8 ${animateClass('values')}`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Core Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg border border-pink-100 hover:border-pink-300 transition-colors shadow-lg hover:shadow-xl">
            <div className="rounded-full bg-pink-100 p-4 inline-block mb-6">
              <Heart className="h-8 w-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-4">Passion for Creation</h3>
            <p className="text-gray-700">
              We believe in the transformative power of making things with your own hands. Every project is an opportunity to learn, grow, and express yourself.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg border border-pink-100 hover:border-pink-300 transition-colors shadow-lg hover:shadow-xl">
            <div className="rounded-full bg-pink-100 p-4 inline-block mb-6">
              <Users className="h-8 w-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-4">Community Support</h3>
            <p className="text-gray-700">
              DIY is better together. We foster an inclusive, supportive community where makers of all skill levels can share ideas, get feedback, and find inspiration.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg border border-pink-100 hover:border-pink-300 transition-colors shadow-lg hover:shadow-xl">
            <div className="rounded-full bg-pink-100 p-4 inline-block mb-6">
              <Wrench className="h-8 w-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-4">Skill Accessibility</h3>
            <p className="text-gray-700">
              We break down complex techniques into approachable steps, making DIY skills accessible to everyone regardless of experience or background.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`bg-black text-white py-16 md:py-24 ${animateClass('contact')}`}>
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our DIY Community</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for weekly DIY inspiration, exclusive tutorials, and updates on upcoming workshops and events.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 rounded-lg focus:outline-none text-black flex-grow"
            />
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg transition-colors font-medium">
              Subscribe
            </button>
          </div>
          
          <div className="mt-12 flex justify-center space-x-6">
            <a href="#" className="text-white hover:text-pink-400 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-white hover:text-pink-400 transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-white hover:text-pink-400 transition-colors">
              <Facebook size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-2xl font-bold">
                <span className="text-pink-500">DIY</span>Hub
              </div>
              <p className="text-gray-400 mt-1">Creating tomorrow, today.</p>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-8 text-center md:text-left">
              <a href="#" className="hover:text-pink-400 mb-2 md:mb-0">Privacy Policy</a>
              <a href="#" className="hover:text-pink-400 mb-2 md:mb-0">Terms of Service</a>
              <a href="#" className="hover:text-pink-400">Contact Us</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} DIYHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
