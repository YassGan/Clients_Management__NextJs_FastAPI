"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Navbar } from "@/components";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [UpdatingErrorMessage, setUpdatingErrorMessage] = useState("");


  const [updatedData, setUpdatedData] = useState({
    firstName: selectedClient ? selectedClient.Prénom : "",
    lastName: selectedClient ? selectedClient.Nom : "",
    email: selectedClient ? selectedClient.Email : "",
    region: selectedClient ? selectedClient.Région : "",
    profession: selectedClient ? selectedClient.Profession : "",
    numericSalary: selectedClient ? selectedClient.Salaire : "",
    numericAge: selectedClient ? selectedClient.Âge : "",
    gender: selectedClient ? selectedClient.Genre : "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:8000/AllClients");
      setClients(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchClients();
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deleteClient = async (clientEmail: string) => {
    try {
      await axios.delete(`http://localhost:8000/DeleteClient/${clientEmail}`);
      await fetchClients();
      toast.error("The client with the email \''" +clientEmail + "  \''was deleted  ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateClient = (client: any) => {
    setSelectedClient(client);
    setUpdatedData({
      firstName: client.Prénom,
      lastName: client.Nom,
      email: client.Email,
      region: client.Région,
      profession: client.Profession,
      numericSalary: client.Salaire,
      numericAge: client.Âge,
      gender: client.Genre,
    });
    setShowModal(true);
  };

  const updateClientData = async (client: any) => {
   
    try {
      const response = await axios.put(
        `http://localhost:8000/UpdateClient/${updatedData.email}`,
        {
          Prénom: updatedData.firstName,
          Nom: updatedData.lastName,
          Email: updatedData.email,
          Région: updatedData.region,
          Profession: updatedData.profession,
          Salaire: updatedData.numericSalary,
          Âge: updatedData.numericAge,
          Genre: updatedData.gender,
        }
      );
      console.log(response.data);
      toast.success("The client with the email   \'' "+updatedData.email+" \'' was updated", {
        position: toast.POSITION.TOP_RIGHT,
      });      fetchClients();
      setShowModal(false)
    } catch (error) {
      console.error(error);
      setUpdatingErrorMessage("Une erreur s'est produite, réessayer ultérieurement")
      // Handle error
    }
  };

  return (
    <div className="bg-white rounded-lg  ">
      <div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
            <div
              ref={modalRef}
              className="bg-white rounded-lg shadow-lg p-6 w-96"
            >
              <h2 className="text-2xl font-bold mb-4">Update Client</h2>
              <p style={{color:"red",marginBottom:'10px'}}> {UpdatingErrorMessage} </p>
          

              <div className="mb-4">
                <input
                  type="text"
                  name="firstName"
                  value={updatedData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="lastName"
                  value={updatedData.lastName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="email"
                  value={updatedData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="region"
                  value={updatedData.region}
                  onChange={handleInputChange}
                  placeholder="Region"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="profession"
                  value={updatedData.profession}
                  onChange={handleInputChange}
                  placeholder="Profession"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  name="numericSalary"
                  value={updatedData.numericSalary}
                  onChange={handleInputChange}
                  placeholder="Salary"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  name="numericAge"
                  value={updatedData.numericAge}
                  onChange={handleInputChange}
                  placeholder="Age"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="gender"
                  value={updatedData.gender}
                  onChange={handleInputChange}
                  placeholder="Gender"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={updateClientData}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 py-2 rounded"
                >
                  Update Client
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-2 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <main className="overflow-hidden">
        <ToastContainer position={toast.POSITION.TOP_RIGHT} />

        <div className="bg-slate-200 min-h-screen">
          <h1 className="text-3xl font-bold text-center text-gray-600 pt-8">
            Page d'affichage de clients
          </h1>
          <div className=" bg-green-40 w-[72%] mx-auto mt-[30px] pb-[70px]">
            <h1 className="text-2xl font-bold mb-4">Liste des clients</h1>
            <table className="w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Prénom</th>
                  <th className="py-2 px-4 border-b">Nom</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Région</th>
                  <th className="py-2 px-4 border-b">Profession</th>
                  <th className="py-2 px-4 border-b">Salaire</th>
                  <th className="py-2 px-4 border-b">Âge</th>
                  <th className="py-2 px-4 border-b">Genre</th>
                  <th className="py-2 px-4 border-b">Opérations</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr
                    style={{ height: "70px" }}
                    className="hover:bg-slate-500 "
                    key={client.id}
                  >
                    <td className="py-2 px-4 border-b">{client.Prénom}</td>
                    <td className="py-2 px-4 border-b">{client.Nom}</td>
                    <td className="py-2 px-4 border-b">{client.Email}</td>
                    <td className="py-2 px-4 border-b">{client.Région}</td>
                    <td className="py-2 px-4 border-b">{client.Profession}</td>
                    <td className="py-2 px-4 border-b">{client.Salaire}</td>
                    <td className="py-2 px-4 border-b">{client.Âge}</td>
                    <td className="py-2 px-4 border-b">{client.Genre}</td>

                    <td
                      style={{ height: "70px", alignItems: "center" }}
                      className="py-3 px-4 border-b flex "
                    >
                      <button
                        onClick={() => updateClient(client)}
                        style={{ height: "40px" }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 mx-3 rounded"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => deleteClient(client.Email)}
                        style={{ height: "40px" }}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 mx-3 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientList;
