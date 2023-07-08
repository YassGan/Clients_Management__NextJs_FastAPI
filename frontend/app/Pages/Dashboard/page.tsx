"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ClientsChart from "@/components/charts/clientsChart";
import SalariesChart from "@/components/charts/salariesChart";
import PieChart from "@/components/charts/pieChart";
import DountChart from "@/components/charts/dountChart";
import ScatterChart from "@/components/charts/scatterChart";
import SalariesGenderBarChart from "@/components/charts/salariesGenderBarChart";

const Dashboard = () => {
  const [clientsDownload, setClientsDownload] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:8000/AllClients");
      setClientsDownload(response.data);
      console.table(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl mt-5 mb-8 ml-10">Dashboard page</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="chartItem">
            <ClientsChart clients={clientsDownload} />
          </div>

          <div className="chartItem">
            <SalariesChart clients={clientsDownload} />
          </div>

          <div className="chartItem">
            <PieChart clients={clientsDownload} width={200} height={200} />
          </div>

          <div className="chartItem">
            <DountChart clients={clientsDownload} width={200} height={200} />
          </div>

          <div className="chartItem">
            <ScatterChart clients={clientsDownload} />
          </div>

          <div className="chartItem">
            <SalariesGenderBarChart clients={clientsDownload} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
