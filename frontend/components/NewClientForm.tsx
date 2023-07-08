
'use client'

import React, { useState, FormEvent } from 'react';

const NewClientForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');
  const [profession, setProfession] = useState('');
  const [salary, setSalary] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log({
      firstName,
      lastName,
      email,
      region,
      profession,
      salary,
      age,
      gender,
    });

    setFirstName('');
    setLastName('');
    setEmail('');
    setRegion('');
    setProfession('');
    setSalary('');
    setAge('');
    setGender('');
  };

  return (
    <div className='flex justify-center mt-[60px]'>
      <div className=' w-[80%] p-[50px]'>
        <form onSubmit={handleSubmit} className=" mx-auto grid grid-cols-2 gap-6">

        <form onSubmit={handleSubmit} className=" mx-auto grid grid-cols-2 gap-6">
      <div>
        <label htmlFor="firstName" className="block mb-2 font-medium">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block mb-2 font-medium">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-2 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="region" className="block mb-2 font-medium">
          Region
        </label>
        <select
          id="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Region</option>
          <option value="Tunis">Tunis</option>
          <option value="Bizerte">Bizerte</option>
          <option value="Nabeul">Nabeul</option>
          <option value="Ariana">Ariana</option>
        </select>
      </div>

      <div>
        <label htmlFor="profession" className="block mb-2 font-medium">
          Profession
        </label>
        <input
          type="text"
          id="profession"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="salary" className="block mb-2 font-medium">
          Salary
        </label>
        <input
          type="text"
          id="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="age" className="block mb-2 font-medium">
          Age
        </label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="gender" className="block mb-2 font-medium">
          Gender
        </label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>


      <button
        type="submit"
        className=" col-span-2 py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none"
      >
        Submit
      </button>






    </form>
        </form>
      </div>
    </div>
  );
};

export default NewClientForm;





