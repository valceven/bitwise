// src/components/MuLoading.jsx
import React from "react";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";

const MuLoading = ({ text }) => {
  useEffect(() => {
      document.title = "Loading";
    }, []);

  return (
    <div>
      <main className="grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center flex justify-center flex-col items-center space-y-12">
          <BarLoader color="#6e61ff" height={8} width={500} radius={2} />
          <div>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Loading
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              {text}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MuLoading;
