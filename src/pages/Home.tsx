
import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import TeamMember from "@/components/TeamMember";
import Background3D from "@/components/Background3D";
import { ErrorBoundary } from "react-error-boundary";

const FallbackBackground = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black -z-10"></div>
);

const Home = () => {
  const teamMembers = [
    { name: 'Ashutosh Dixit', role: 'Blockchain Developer', image: '' },
    { name: 'Aditya Umathe', role: 'Frontend Developer', image: '' },
    { name: 'Shounak Gan', role: 'Backend Developer', image: '' },
  ];

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <ErrorBoundary fallback={<FallbackBackground />}>
        <Suspense fallback={<FallbackBackground />}>
          <Background3D />
        </Suspense>
      </ErrorBoundary>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <div className="animate-float">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">BlokDok</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
              Secure Document Verification System Powered by Blockchain Technology
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button className="bg-blokdok-purple hover:bg-blokdok-darkPurple text-white px-8 py-6 rounded-lg text-lg" asChild>
              <Link to="/login">Get Started</Link>
            </Button>
            <Button variant="outline" className="border-blokdok-blue text-blokdok-blue hover:bg-blokdok-blue/10 px-8 py-6 rounded-lg text-lg">
              Learn More
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gradient">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl">
              <div className="w-16 h-16 mb-6 rounded-full bg-blokdok-purple/20 flex items-center justify-center">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Upload Document</h3>
              <p className="text-gray-300">Securely upload your document to be verified and hashed.</p>
            </div>
            
            <div className="glass-card p-8 rounded-xl">
              <div className="w-16 h-16 mb-6 rounded-full bg-blokdok-purple/20 flex items-center justify-center">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Generate Hash</h3>
              <p className="text-gray-300">We generate a unique cryptographic hash for your document.</p>
            </div>
            
            <div className="glass-card p-8 rounded-xl">
              <div className="w-16 h-16 mb-6 rounded-full bg-blokdok-purple/20 flex items-center justify-center">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Blockchain Verification</h3>
              <p className="text-gray-300">Verify document authenticity using immutable blockchain records.</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gradient">Our Team</h2>
          <p className="text-center text-gray-300 mb-12">The minds behind BlokDok</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamMember 
                key={member.name}
                name={member.name}
                role={member.role}
                image={member.image}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 mt-20 border-t border-gray-800">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gradient mb-4">BlokDok</h2>
            <p className="text-gray-400">© 2025 BlokDok. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
