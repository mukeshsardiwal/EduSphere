import React from "react";
import { testimonialsData } from "../../assets/assets"; // Adjust the import path if needed

const Testimonials = () => {
  return (
    <section className="py-16"> {/* Light blue background */}
      <div className="container mx-auto w-full px-4">
        <h2 className="text-3xl font-bold text-center text-white-900 mb-12">
          What Our Students Say
        </h2>

        {/* Flexbox to display testimonials in a row */}
        <div className="flex justify-center items-center space-x-8 overflow-x-auto">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-2xl text-center w-80 border border-blue-200 hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-blue-300"
              />
              <h3 className="text-xl font-semibold mb-2 text-blue-900">{testimonial.name}</h3>
              <p className="text-gray-700">{testimonial.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
