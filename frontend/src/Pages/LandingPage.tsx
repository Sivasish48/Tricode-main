import { motion } from "framer-motion";
import AnimatedTestimonialsDemo from "../components/animated-testimonial-demo";
import BentoGridDemo from "../components/bento-grid-demo";
import Footer from "../components/footer";
import { LampContainer } from "../components/ui/lamp";
import { AnimatedGridPattern } from "../components/Animated-Grid-Pattern";
import triCodeLogo from "../../public/tricodeLogo.png";
import cn from "../lib/utils";

export default function App() {
  return (
    <div className="min-h-screen bg-black via-gray-900 to-gray-950">
      <AnimatedGridPattern
        numSquares={60}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[150%] skew-y-12"
        )}
      />
      {/* Header */}
      {/* <header className="container mx-auto px-14 py-6 max-w-screen-lg">
        <nav className="flex justify-between items-center mx-auto max-w-screen-lg">
          <a
            href="/"
            className="text-pink-400 text-3xl font-medium transition-colors duration-300 hover:text-pink-300"
          >
            Tricode
          </a>
          <button className="border border-pink-400/20 px-6 py-2 rounded-full text-pink-400 font-medium transition-all duration-300 hover:bg-pink-400/10 hover:border-pink-400/30">
            Create Account
          </button>
        </nav>
      </header> */}

      <header className="container mx-auto px-14 py-6 max-w-screen-lg">
        <nav className="flex justify-between items-center mx-auto max-w-screen-lg">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img
              src={triCodeLogo}
              alt="Tricode Logo"
              className="h-20 w-auto object-contain"
            />
          </a>

          {/* Button */}
          <button className="border border-pink-400/20 px-6 py-2 rounded-full text-pink-400 font-medium transition-all duration-300 hover:bg-pink-400/10 hover:border-pink-400/30">
            Create Account
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 text-center max-w-screen-lg">
        <div className="mx-auto py-8">
          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-gray-800/50 px-4 py-2 shadow-lg transition-transform duration-300 hover:scale-105 backdrop-blur-sm"
          >
            <span className="text-sm text-gray-300">
              Introducing best code editor
            </span>
            <span className="text-gray-500">›</span>
          </motion.div>

          {/* Animated Heading */}
          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6 text-center font-bold tracking-tight transform transition-all duration-500 
             hover:scale-[1.02] text-transparent bg-clip-text 
             bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500"
          >
            <span className="block text-2xl sm:text-3xl md:text-4xl text-gray-200">
              Master the Art
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl text-gray-200">
              of Code
            </span>
            <br />
            <span
              className="block text-6xl sm:text-7xl md:text-8xl font-bolder 
                   bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text"
            >
              Tricode
            </span>
            <br />
            <span className="block text-lg sm:text-xl md:text-2xl text-gray-300">
              For Seamless Development & Conducting Interviews
            </span>
          </motion.h1>

          {/* Animated Subtext */}
          {/* <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mb-12 text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500"
          >
            Granola takes your raw meeting notes and makes them awesome
          </motion.p> */}

          {/* Animated Call to Action */}
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="h-12 gap-2 rounded-full px-6 text-base font-medium text-white 
                       bg-gradient-to-r from-indigo-400 to-pink-500 
                       transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-lg"
          >
            Start Coding
          </motion.button>

          {/* Feature Section */}
          <div className="max-w-screen-lg mx-auto mt-48">
            <BentoGridDemo />
          </div>

          {/* Testimonials Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
            className="max-w-screen-lg mx-auto py-10 mt-32"
          >
            {/* Section Heading */}
            <h2
              className="text-5xl font-bold text-center text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
               bg-clip-text"
            >
              What people say about Tricode
            </h2>

            {/* Animated Testimonials */}
            <div className="mt-32">
              <AnimatedTestimonialsDemo />
            </div>
          </motion.div>

          {/* Lamp Section */}
          <div className="mt-52">
            <LampContainer>
              <motion.h1
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="mt-40 text-white text-center text-4xl font-medium tracking-tight md:text-7xl"
              >
                To Code  <br /> Collaberate & Hire
              </motion.h1>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-24 px-6 py-2 bg-gradient-to-r from-indigo-400 to-pink-500 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Try Tricode
              </motion.button>
            </LampContainer>
          </div>
        </div>
      </main>
      <div>
        <Footer />
      </div>
      {/* Footer */}
    </div>
  );
}
