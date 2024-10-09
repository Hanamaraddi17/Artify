import React from "react";
import { Palette, Globe, Shield, Users, Calendar } from "lucide-react";
import { useSpring, animated } from "react-spring";

function AnimatedListItem({ icon: Icon, text }) {
  const [props, set] = useSpring(() => ({
    scale: 1,
    shadow: "0px 4px 10px rgba(0,0,0,0.1)",
    config: { mass: 1, tension: 350, friction: 40 },
  }));

  return (
    <animated.li
      style={{
        ...props,
        boxShadow: props.shadow,
        transform: props.scale.interpolate((s) => `scale(${s})`),
      }}
      onMouseEnter={() =>
        set({ scale: 1.01, shadow: "0px 10px 25px rgba(0,0,0,0.2)" })
      }
      onMouseLeave={() =>
        set({ scale: 1, shadow: "0px 4px 10px rgba(0,0,0,0.1)" })
      }
      className="flex items-center space-x-3 bg-white p-4 rounded-lg cursor-pointer transition-colors duration-300"
    >
      <Icon className="text-blue-500" size={24} />
      <span className="text-gray-700">{text}</span>
    </animated.li>
  );
}

function AboutPage() {
  return (
    <div className="bg-blue-100 py-16 px-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
        <div className="lg:w-5/6">
          <h1 className="text-4xl font-bold mb-4 text-center lg:text-left text-blue-400">
            About <span className="text-blue-900">Artify</span>
          </h1>
          <p className="text-xl mb-8 text-center lg:text-left text-gray-800">
            Connecting artists and art enthusiasts in a vibrant online
            marketplace
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-blue-500">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Artify was born from a shared passion for creativity and a deep
              desire to build a platform where artists from all over the world
              could present their work to a global audience. Founded in 2020,
              during a time when digital transformation was accelerating, Artify
              aimed to bridge the gap between traditional galleries and the
              digital space, offering artists more freedom and accessibility.
              Over the years, we've grown into a vibrant and thriving community,
              connecting creators with collectors and art enthusiasts alike. Our
              platform now hosts thousands of pieces of artwork, ranging from
              digital illustrations and sculptures to traditional paintings. We
              take pride in the diversity and richness of the artwork shared by
              our talented members, united by a common goal: to inspire and be
              inspired by the beauty of unique and thought-provoking creations.
            </p>
          </section>
        </div>
        <div className="lg:w-2/4 order-first lg:order-last">
          <img
            src="/images/about.png"
            alt="Artify Showcase"
            className="object-cover w-full h-auto animate-float"
          />
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          At Artify, we believe that artists deserve not only recognition but
          also the necessary tools and support to succeed in the competitive art
          world. We provide artists with an intuitive platform where they can
          easily upload, promote, and sell their work without the constraints of
          a traditional gallery. By offering customizable portfolios, pricing
          tools, and detailed analytics, we help artists manage their careers
          independently. For art lovers and collectors, we offer a curated
          selection of artwork, ensuring that there is something for every taste
          and preference. Whether you're looking for a bold contemporary piece
          to elevate your space or a more classical piece of art, our goal is to
          make the discovery and acquisition of art seamless. Artify exists to
          foster the creative economy by ensuring that artists receive fair
          compensation and that art remains accessible to all, supporting
          creativity at every level of society.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-blue-500">
          Why Choose Artify
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: Palette,
              text: "Curated selection of high-quality artworks",
            },
            {
              icon: Shield,
              text: "Secure transactions and worldwide shipping",
            },
            {
              icon: Users,
              text: "Support for emerging and established artists",
            },
            { icon: Globe, text: "Personalized art recommendations" },
            {
              icon: Calendar,
              text: "Community events and exclusive exhibitions",
            },
          ].map((item, index) => (
            <AnimatedListItem key={index} icon={item.icon} text={item.text} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AboutPage;
