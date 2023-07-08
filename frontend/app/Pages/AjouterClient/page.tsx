"use client";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewClientForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");
  const [profession, setProfession] = useState("");
  const [salary, setSalary] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const generateRandomId = () => {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      return array[0];
    };

    const id = generateRandomId();

    const numericSalary = Number(salary);
    const numericAge = Number(age);

    console.log("Form Data:", {
      id,
      Prénom: firstName,
      Nom: lastName,
      Email: email,
      Région: region,
      Profession: profession,
      Salaire: numericSalary,
      Âge: numericAge,
      Genre: gender,
    });

    try {
      const response = await axios.post("http://localhost:8000/CreateClient", {
        id,
        Prénom: firstName,
        Nom: lastName,
        Email: email,
        Région: region,
        Profession: profession,
        Salaire: numericSalary,
        Âge: numericAge,
        Genre: gender,
      });
      console.log(response.data);

      toast.success("Client was created with success ", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setRegion("");
      setProfession("");
      setSalary("");
      setAge("");
      setGender("");
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        console.log(error.response.data);
      }
      setErrorMessage("Error creating client. Please try again.");
    }
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <div className="container mx-auto max-w-md p-4 mb-[100px]">
        <div>
          <h1 className="text-2xl font-bold mb-4 mt-[100px]">
            Create a New Client
          </h1>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="block">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="region" className="block">
                Region:
              </label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              >
                <option value="">Select a region</option>
                <option value="Tunis">Tunis</option>
                <option value="Ariana">Ariana</option>
                <option value="Ben Arous">Ben Arous</option>
                <option value="Bizerte">Bizerte</option>
              </select>
            </div>
            <div>
              <label htmlFor="profession" className="block">
                Profession:
              </label>
              <input
                type="text"
                id="profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="salary" className="block">
                Salary:
              </label>
              <input
                type="number"
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="age" className="block">
                Age:
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="gender" className="block">
                Gender:
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              >
                <option value="">Select a gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Client
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewClientForm;
