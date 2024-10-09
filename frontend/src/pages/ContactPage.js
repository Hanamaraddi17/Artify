import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";

const IconWrapper = ({ children }) => (
  <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full transition-all duration-300 hover:bg-blue-500 group">
    {children}
  </div>
);

const ContactPage = () => {
  return (
    <section className="bg-blue-100 py-16">
      <div className="px-4">
        <h2 className="text-4xl font-bold text-center text-blue-400 mb-2">
          Contact <span className="text-blue-900">Us</span>
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Get in touch with us today and start your journey with us
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information Section */}
          <div className="border-t-4 border-b-4 border-blue-500 shadow-xl py-10 px-8 ml-10 bg-white transition-all duration-700 ease-in-out hover:-translate-y-2 hover:shadow-2xl relative">
            <div className="flex items-center mb-6">
              <IconWrapper>
                <MapPin className="w-6 h-6 text-blue-500 transition-all duration-300 group-hover:text-white" />
              </IconWrapper>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Location:
                </h3>
                <p className="text-gray-600">
                  A108 Adam Street, New York, NY 535022
                </p>
              </div>
            </div>
            <div className="flex items-center mb-6">
              <IconWrapper>
                <Mail className="w-6 h-6 text-blue-500 transition-all duration-300 group-hover:text-white" />
              </IconWrapper>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Email:</h3>
                <p className="text-gray-600">info@example.com</p>
              </div>
            </div>
            <div className="flex items-center mb-6">
              <IconWrapper>
                <Phone className="w-6 h-6 text-blue-500 transition-all duration-300 group-hover:text-white" />
              </IconWrapper>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Call:</h3>
                <p className="text-gray-600">+1 5589 55488 55</p>
              </div>
            </div>
            <div className="h-64 bg-gray-300 rounded-sm shadow-md">
              {/* Add Google Maps embed here */}
            </div>
          </div>
          {/* Contact Form Section */}
          <div className="border-t-4 border-b-4 border-blue-500 shadow-xl py-10 px-8 mr-10 bg-white transition-all duration-700 ease-in-out hover:-translate-y-2 hover:shadow-2xl relative">
            <form>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 my-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 my-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-2 my-2 border border-gray-300 focus:outline-none focus:border-blue-500 mb-4"
              />
              <textarea
                placeholder="Message"
                rows="10"
                className="w-full px-4 py-2 my-2 border border-gray-300  focus:outline-none focus:border-blue-500 mb-4"
              ></textarea>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 my-2 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
