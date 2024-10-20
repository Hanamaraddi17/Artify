import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [isArtist, setIsArtist] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentButtonLink, setCurrentButtonLink] = useState("");

  useEffect(() => {
    const storedUserName = sessionStorage.getItem("username");
    if (storedUserName) {
      setUserName(storedUserName);
    }
    checkArtistStatus();

    // Auto-advance carousel
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update the button link based on the current slide
    setCurrentButtonLink(carouselItems[currentSlide].buttonLink);
  }, [currentSlide]);

  // ... (keep all your existing functions like checkArtistStatus, handleButtonClick, etc.)
  const checkArtistStatus = async () => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) return;

    try {
      const response = await fetch(
        "http://localhost:5000/artist/check/artist",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsArtist(data.isArtist);
      } else {
        console.error("Failed to check artist status:", response.statusText);
      }
    } catch (error) {
      console.error("Error checking artist status:", error);
    }
  };

  const handleButtonClick = () => {
    navigate("/signup");
  };

  const handleRegistration = () => {
    if (isArtist) {
      setModalMessage("You are already a registered artist!");
    } else if (!userName) {
      setModalMessage("First you should create an account in Artify");
    } else {
      navigate("/artist-registration");
      return;
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCarouselButtonClick = () => {
    if (currentButtonLink === "/artist-registration") {
      handleRegistration();
    } else {
      navigate(currentButtonLink); // Use the current button link
    }
  };

  const carouselItems = [
    {
      image: "/images/village.jpg",
      title: "Discover Unique Artworks",
      description:
        "Explore our curated collection of paintings, sculptures, and digital art from talented artists worldwide.",
      buttonLink: "/gallery",
      buttonText: "Explore Gallery",
    },
    {
      image: "/images/nature1.jpg",
      title: "Join Our Artist Community",
      description:
        "Showcase your artwork, connect with art enthusiasts, and grow your artistic career with Artify.",
      buttonLink: "/artist-registration",
      buttonText: "Become an Artist",
    },
    {
      image: "/images/night.jpg",
      title: "Collect Your Favorite Pieces",
      description:
        "Start your art collection today. Find pieces that speak to you and support emerging artists.",
      buttonLink: "/gallery",
      buttonText: "Start Collecting",
    },
  ];

  return (
    <div>
      {/* Keep your existing hero section */}
      <div className="bg-blue-100 py-20">
  <div className="pl-6 md:pl-36 flex flex-col md:flex-row items-center min-h-[420px] max-h-[520px]">
    <div className="text-content md:w-1/2 mb-8 md:mb-0">
      {userName && (
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-800">
          Hi, <span>{userName}</span>! Welcome to Artify
        </h2>
      )}
      <h1 className="text-2xl md:text-5xl font-bold mb-4 text-blue-400 drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-blue-950">
        Discover, Collect, and
      </h1>
      <h1 className="text-2xl md:text-5xl font-bold mb-4 text-blue-400 drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-blue-950">
        Celebrate Art
      </h1>
      <p className="text-base md:text-lg mb-6">
        Explore our curated collection of unique artworks
      </p>
      <div className="flex space-x-4 mb-6">
  <button
    className="px-2 py-1 bg-blue-500 text-white md:px-6 md:py-2 rounded transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    onClick={handleButtonClick}
  >
    Register Now
  </button>
  <button
    className="px-2 py-1 bg-white text-blue-500 md:px-6 md:py-2 rounded border border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
    onClick={handleRegistration}
  >
    Join as an Artist
  </button>
</div>

    </div>

    <div className="image-content w-full md:w-1/2">
      <img 
        src="/images/HomePage.png"
        alt="Artist painting"
        className="w-full h-auto max-h-[300px] md:max-h-[400px] object-contain animate-float mb-4"
      />
    </div>
  </div>
</div>


      {/* Custom Carousel Section */}
      <section className="bg-gray-50 relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto">
          <div className="relative h-[400px] md:h-[560px]">
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="pl-20 absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-6">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="mb-4">{item.description}</p>
                  {console.log(item.buttonLink)}
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={handleCarouselButtonClick}
                  >
                    {item.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${
                  index === currentSlide ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="mb-8">
            Stay updated with the latest artworks and events
          </p>
          <form className="max-w-md mx-auto flex shadow-lg">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 rounded-l-md"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-center">{modalMessage}</p>
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={closeModal}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
