import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-[#eef3f2] flex flex-col items-center p-8">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-6 text-center max-w-2xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tellus,
        luctus et interdum mattis.
      </p>

      {/* Contact Form & Newsletter */}
      <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Form */}
        <div className="w-full md:w-1/2 p-6">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-3 w-full rounded mb-4"
          />
          <input
            type="text"
            placeholder="Phone"
            className="border border-gray-300 p-3 w-full rounded mb-4"
          />
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 p-3 w-full rounded mb-4"
          />
          <textarea
            placeholder="Message"
            className="border border-gray-300 p-3 w-full rounded mb-4 h-24"
          />
          <button className="bg-pink-500 hover:bg-pink-800 text-white font-bold py-2 px-4 rounded w-full">
            Submit
          </button>
        </div>

        {/* Newsletter Box */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-6 bg-white">
          <div className="bg-pink-200 w-full md:w-60 p-6 rounded-2xl text-center">
            <h2 className="text-2xl font-semibold mb-2">Our Newsletter</h2>
            <p className="text-gray-800 mb-4 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tellus.
            </p>
            <button className="bg-pink-500 hover:bg-pink-800 text-white font-bold transition-all ease-in py-2 px-6 rounded-2xl">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="flex flex-col md:flex-row justify-between max-w-4xl w-full mt-10 gap-4">
        <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg w-full md:w-1/3 text-center">
          <span className="text-lg font-semibold">📞 (+976) 765 685</span>
          <p className="text-gray-600 text-sm mt-1">Call us anytime</p>
        </div>
        <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg w-full md:w-1/3 text-center">
          <span className="text-lg font-semibold">📧 mail@influenca.id</span>
          <p className="text-gray-600 text-sm mt-1">Email for queries</p>
        </div>
        <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg w-full md:w-1/3 text-center">
          <span className="text-lg font-semibold">📍 London Eye, London</span>
          <p className="text-gray-600 text-sm mt-1">Visit our office</p>
        </div>
      </div>

      {/* Google Map */}
      <div className="mt-10 w-full max-w-4xl">
        <iframe
          title="Google Map"
          className="w-full h-64 rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509377!2d-0.11982468468119634!3d51.5033244796344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9b6b0d4f77ad5e6b!2sLondon%20Eye!5e0!3m2!1sen!2sus!4v1647190400010!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      
    </div>
  );
};

export default ContactUs;
