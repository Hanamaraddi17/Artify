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
          <div>
            <img src="images/logo2.png" className="w-48" alt="logo" />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", link: "/" },
                { name: "About Us", link: "/about" },
                { name: "Gallery", link: "/gallery" },
                { name: "Our Artists", link: "/artists" },
                { name: "Privacy Policy", link: "/privacy" },
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-blue-500 mr-2" />
                  <a
                    href={item.link}
                    className="hover:text-blue-500 transition-all transform hover:translate-x-1"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                "Artwork Submission",
                "Art Marketplace",
                "Artist Profiles",
                "Order Tracking",
                "Community Engagement",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="hover:text-blue-500 transition-all transform hover:translate-x-1">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Our Social Networks</h3>
            <p className="mb-4">
              Follow us on our social media platforms for the latest updates,
              art inspiration, and community events.
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
      <div className="mt-8 bg-blue-100 py-4 w-full text-sm">
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
