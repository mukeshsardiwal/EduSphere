import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Testimonials from '../../components/testimonials/Testimonials';
import Courses from '../courses/Courses';
import Companies from '../../components/companies/Companies';

const Home = () => {
  const navigate = useNavigate();

  // Animation variants for the text
  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white font-sans relative">
      {/* Sparkles effect */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/sparkles.png')] bg-cover bg-center opacity-10"></div>

      <div className="flex flex-col items-center justify-center text-center py-20 z-10 space-y-8">
        <motion.h1
          className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient"
          initial="hidden"
          animate="visible"
          variants={headingVariants}
        >
          Unlock the Future <br />
          <span>of Education</span>
        </motion.h1>
        <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
          Learn, Grow, and Excel in an environment designed to help you succeed.
        </p>
        <motion.button
          className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={() => navigate('/courses')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Get Started
        </motion.button>
      </div>

      <Courses />
      <Companies/>

      {/* Testimonials*/}
      <div className="mt-16 z-10">
        <motion.h2
          className="text-4xl font-bold text-center text-white mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1.2 } }}
        >
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-6 px-8">
          <Testimonials />
        </div>
      </div>
    </div>
  );
};
export default Home
