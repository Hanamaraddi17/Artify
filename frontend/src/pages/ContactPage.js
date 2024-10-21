import React, { useState, useEffect } from "react";
import { MapPin, Mail, Phone } from "lucide-react";

const IconWrapper = ({ children }) => (
  <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full transition-all duration-300 hover:bg-blue-500 group">
    {children}
  </div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://artifybackend.vercel.app/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMessage("Failed to send message, please try again.");
      }
    } catch (error) {
      setErrorMessage("Failed to send message, please try again.");
    }
  };

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 2000); // 2 seconds

      // Cleanup the timeout
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

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
                  St. Joseph Engineering College, Mangaluru
                </p>
              </div>
            </div>
            <div className="flex items-center mb-6">
              <IconWrapper>
                <Mail className="w-6 h-6 text-blue-500 transition-all duration-300 group-hover:text-white" />
              </IconWrapper>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Email:</h3>
                <p className="text-gray-600">akshaykumars9108@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center mb-6">
              <IconWrapper>
                <Phone className="w-6 h-6 text-blue-500 transition-all duration-300 group-hover:text-white" />
              </IconWrapper>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Call:</h3>
                <p className="text-gray-600">+91 9108083054</p>
              </div>
            </div>
            <div className="h-64 bg-gray-300 rounded-sm shadow-md">
              {/* Add Google Maps embed here */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.9520361378604!2d74.89610237403181!3d12.910804316210394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba359dfac132663%3A0xa7bf228838232d32!2sSt%20Joseph%20Engineering%20College!5e0!3m2!1sen!2sus!4v1728500428155!5m2!1sen!2sus"
                width="600"
                height="450"
                style={{
                  border: 0,
                  width: "100%",
                  height: "280px",
                  borderRadius: "4px",
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          {/* Contact Form Section */}
          <div className="border-t-4 border-b-4 border-blue-500 shadow-xl py-10 px-8 mr-10 bg-white transition-all duration-700 ease-in-out hover:-translate-y-2 hover:shadow-2xl relative">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 my-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 my-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 my-2 border border-gray-300 focus:outline-none focus:border-blue-500 mb-4"
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                rows="10"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 my-2 border border-gray-300 focus:outline-none focus:border-blue-500 mb-4"
                required
              ></textarea>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 my-2 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Send Message
                </button>
              </div>
              {successMessage && (
                <p className="text-green-500 text-center mt-4">
                  {successMessage}
                </p>
              )}
              {errorMessage && (
                <p className="text-red-500 text-center mt-4">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
