 import React from "react";
   const ContactUs = ()=> {
  return (
  <div className="min-h-screen bg-[#e6f0ee] flex flex-col items-center p-8">
    
    <h1 className="text-4xl font-bold text-gray-800 mb-2">Contact Us</h1>
    <p className="text-gray-600 mb-6 text-center max-w-7xl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tellus,
      luctus et interdum mattis.
    </p>
    <div className="flex max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-1/2 p-6">
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
          defaultValue={""}
        />
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">
          Submit
        </button>
      </div>
      
      <div className="w-1/2 bg-green-100 p-6 flex flex-col justify-center items-center gap-6">
        <h2 className="text-2xl font-semibold mb-4">Our Newsletters</h2>
        <p className="text-gray-600 text-center mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tellus,
          luctus et interdum.
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </div>
    
    <div className="flex flex-wrap justify-between max-w-4xl w-full mt-10 gap-0.5">
      <div className="flex items-center gap-20 bg-white shadow-md p-4 rounded-lg w-full md:w-1/3  ">
        <span className="text-lg font-semibold">📞 (+976) 765 685</span>
      </div>
      <div className="flex items-center gap-20 bg-white shadow-md p-4 rounded-lg w-full md:w-1/3  ">
        <span className="text-lg font-semibold">📧 mail@influenca.id</span>
      </div>
      <div className="flex items-center gap-20  bg-white shadow-md p-4 rounded-lg w-full md:w-1/3">
        <span className="text-lg font-semibold">📍 London Eye, London</span>
      </div>
    </div>
    
    <div className="mt-10 w-full max-w-4xl">
      <iframe
        title="Google Map"
        className="w-full h-64 rounded-lg shadow-lg"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509377!2d-0.11982468468119634!3d51.5033244796344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9b6b0d4f77ad5e6b!2sLondon%20Eye!5e0!3m2!1sen!2sus!4v1647190400010!5m2!1sen!2sus"
        allowFullScreen=""
        loading="lazy"
      />
    </div>

    <footer className="w-full bg-gray-800 text-white text-center p-6 mt-10">
      <p>© 2023 Influenca Template - All Rights Reserved.</p>
    </footer>
  </div>
  )
};

  
  
   export default ContactUs;

