import React from "react";
import {
  ChevronRight,
  Twitter,
  Facebook,
  Instagram,
  Phone,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-12 py-4 px-8">
          {/* ... (previous code remains unchanged) ... */}
          <div>
            {/* <h2 className="text-2xl font-bold mb-4">Artify</h2> */}
            {/* <p className="mb-2">A108 Adam Street</p>
            <p className="mb-2">New York, NY 535022</p>
            <p className="mb-2">United States</p> */}
            <img src="images/logo2.png" className="w-48" alt="logo" />
            {/* <p className="mb-2">
              <strong>Phone:</strong> +1 5589 55488 55
            </p>
            <p>
              <strong>Email:</strong> info@artify.com
            </p> */}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              {[
                "Home",
                "About us",
                "Services",
                "Terms of service",
                "Privacy policy",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-blue-500 mr-2" />
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                "Web Design",
                "Web Development",
                "Product Management",
                "Marketing",
                "Graphic Design",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-blue-500 mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Our Social Networks</h3>
            <p className="mb-4">
              Cras fermentum odio eu feugiat lide par naso tierra videa magna
              derita valies
            </p>
            <div className="flex space-x-2">
              <a
                href="#"
                className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-blue-100 py-4 w-full">
        <div className="flex justify-between items-center px-4">
          <p>
            &copy; Copyright <strong>Artify</strong>. All Rights Reserved
          </p>
          <p>
            Designed by{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Akshay Kumar S
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
