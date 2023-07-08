





import React from 'react';
import { Navbar } from '@/components'

const HomePage = () => {
  return (
    <div>

    <div className="bg-gray-100 min-h-screen flex justify-center pt-[100px]">

      <div className="max-w-4xl mx-auto px-6 mt-[10px]">
        <h1 className="text-4xl font-bold text-center mb-8">Clients Management System</h1>
        <p className="text-lg text-gray-700 text-center">
          Welcome to the Client Management System! This application provides useful powerful tools to manage clients
          efficiently and gain valuable insights into your client data.
        </p>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>Create, update, and delete client records</li>
            <li>Visualize client data with interactive charts and graphs</li>
          </ul>
        </div>
      </div>
    </div>
    </div>

  );
};

export default HomePage;
