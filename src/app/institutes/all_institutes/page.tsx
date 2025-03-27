"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { institutes as localInstitutes } from "@/tempdata/insdata"; // Fallback data

const API_URL = "/api/v1/institutes"; // Correct API route

const Institutes = () => {
  const [institutes, setInstitutes] = useState(localInstitutes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log("API Response:", response.data); 
        // setInstitutes(response.data);
      } catch (err) {
        console.error("Failed to fetch data, using local data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutes();
  }, []);


  return (
    <DefaultLayout>
      <div className="mx-auto max-w-full">
        {/* Breadcrumb and Page Title */}
        <div>
          <Breadcrumb pageName="All Institutes/Colleges" />
        </div>

        {/* Loading Message */}
        {loading && <p className="text-center py-4">Loading...</p>}

        {/* Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {institutes.map((institute, index) => (
              <div
                key={institute.id}
                className="relative group border dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 
                bg-white dark:bg-gray-900 p-5 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {index + 1}. {institute.institute_name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    📍 {institute.address}, {institute.city}, {institute.state} - {institute.pincode}
                  </p>
                  <p className="mt-2">
                    ✉️{" "}
                    <a
                      href={`mailto:${institute.contact_email}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {institute.contact_email}
                    </a>
                  </p>
                  <p className="mt-1">
                    📞{" "}
                    <a href={`tel:${institute.contact_phone}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      {institute.contact_phone}
                    </a>
                  </p>
                </div>

                {/* Edit & Delete Buttons (Shown on Hover) */}
                <div className="absolute inset-0 flex justify-center items-center space-x-4 opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300 rounded-lg p-4">
                  <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg shadow hover:bg-red-600 transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Institutes;
