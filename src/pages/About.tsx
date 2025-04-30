
import React from 'react';

const About = () => {
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold text-forestGreen mb-6">About TechGear</h1>
      
      <div className="glass-card p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-4">
          At TechGear, we're dedicated to providing high-quality PC components at competitive prices. 
          Our mission is to help tech enthusiasts and professionals build their perfect systems with 
          reliable parts and exceptional service.
        </p>
        <p>
          Founded by a team of passionate computer engineers, we understand what matters most when 
          it comes to selecting components for your build.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-card p-6">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-forestGreen mr-2">✓</span>
              <span>Quality-tested components from trusted brands</span>
            </li>
            <li className="flex items-start">
              <span className="text-forestGreen mr-2">✓</span>
              <span>Technical support from experienced PC builders</span>
            </li>
            <li className="flex items-start">
              <span className="text-forestGreen mr-2">✓</span>
              <span>Competitive pricing on all our products</span>
            </li>
            <li className="flex items-start">
              <span className="text-forestGreen mr-2">✓</span>
              <span>Fast shipping and hassle-free returns</span>
            </li>
          </ul>
        </div>
        
        <div className="glass-card p-6">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-forestGreen">Quality</h3>
              <p className="text-sm">We never compromise on component quality and reliability.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-forestGreen">Expertise</h3>
              <p className="text-sm">Our team consists of tech enthusiasts who know hardware inside and out.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-forestGreen">Customer Satisfaction</h3>
              <p className="text-sm">We're not happy until you're happy with your purchase.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-6 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-2">
          Have questions or need assistance? Our customer service team is available Monday through Friday, 9am to 5pm.
        </p>
        <p className="mb-2">
          <strong>Email:</strong> support@techgear.example.com
        </p>
        <p>
          <strong>Phone:</strong> (123) 456-7890
        </p>
      </div>
    </div>
  );
};

export default About;
