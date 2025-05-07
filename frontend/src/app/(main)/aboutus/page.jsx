import React from "react";

export default function AboutUs() {
  return (
    <div className="bg-pink-500 text-white font-sans">
      {/* Hero Section */}
      <section className="text-center py-20 bg-cover bg-center" style={{ backgroundImage: 'url(/hero-bg.jpg)' }}>
        <h1 className="text-5xl font-bold">About Us</h1>
        <p className="mt-2 text-gray-400">Home / About Us</p>
      </section>

      {/* Main Info */}
      <section className="py-16 px-4 md:px-20 grid md:grid-cols-2 gap-10 items-center">
        <img src="/editor.jpg" alt="Video Editing" className="rounded-xl" />
        <div>
          <h2 className="text-3xl font-bold mb-4">We Always Make The Best</h2>
          <p className="mb-6 text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id odio posuere, pellentesque nulla nec, pulvinar ligula.
          </p>
          <button className="bg-white bg-pink-300 px-6 py-2 rounded-full font-semibold">Contact Us</button>
        </div>
      </section>

      {/* Our Skills */}
      <section className="py-16 px-4 md:px-20 bg-gray-900">
        <h3 className="text-2xl font-bold mb-6">Our Skills</h3>
        <p className="mb-8 text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className="space-y-6">
          <div>
            <p>Video Editing</p>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
              <div className="bg-white h-2.5 rounded-full" style={{ width: "85%" }}></div>
            </div>
          </div>
          <div>
            <p>Videography</p>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
              <div className="bg-white h-2.5 rounded-full" style={{ width: "100%" }}></div>
            </div>
          </div>
          <div>
            <p>Branding</p>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
              <div className="bg-white h-2.5 rounded-full" style={{ width: "77%" }}></div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center">
          <div>
            <p className="text-3xl font-bold">20+</p>
            <p className="text-gray-400">Year Experience</p>
          </div>
          <div>
            <p className="text-3xl font-bold">1,000+</p>
            <p className="text-gray-400">Project Done</p>
          </div>
          <div>
            <p className="text-3xl font-bold">300+</p>
            <p className="text-gray-400">Satisfied Client</p>
          </div>
          <div>
            <p className="text-3xl font-bold">64</p>
            <p className="text-gray-400">Certified Award</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-cover bg-center text-center" style={{ backgroundImage: 'url(/cta-bg.jpg)' }}>
        <h2 className="text-3xl md:text-4xl font-bold">We Are Always Ready To Take A Perfect Shot</h2>
        <button className="mt-6 bg-white text-black px-6 py-2 rounded-full font-semibold">Get Started</button>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 px-4 md:px-20 grid md:grid-cols-3 gap-10">
        <div>
          <h4 className="text-white font-bold text-xl mb-4">VISGRAPH</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error.</p>
        </div>
        <div>
          <h5 className="text-white font-bold mb-3">Our Store</h5>
          <ul className="space-y-2">
            <li>About</li>
            <li>Features</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-bold mb-3">Get In Touch</h5>
          <ul className="space-y-2">
            <li>264-253-5696 Chicago, CA, 60604</li>
            <li>info@visgraph.com</li>
            <li>www.visgraph.com</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
