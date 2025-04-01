import React from "react";

const About = () => {
    return (
        <div className="bg-gradient-to-r from-gray-950 to-gray-900 min-h-screen text-white">
            <main className="container mx-auto p-8 text-center">
                <h2 className="text-4xl font-bold mb-6 text-gray-200">About Our LMS</h2>
                <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                    Our Learning Management System (LMS) is designed to revolutionize online education by providing a seamless and interactive learning experience. We empower educators and learners with cutting-edge tools to make learning accessible, engaging, and effective.
                </p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-1 gap-12 items-center">
                    <div>
                        <h3 className="text-3xl font-semibold mb-4 text-gray-200">Our Mission</h3>
                        <p className="text-gray-400 text-lg">
                            We aim to bridge the gap between students and quality education by offering a dynamic platform for online learning. Our mission is to enhance digital education through innovative technology and user-friendly solutions.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default About;