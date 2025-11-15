"use client";
import React from "react";
import toast from "react-hot-toast";

import { Button, Footer, Navbar } from "./components";

export default function ErrorPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        {toast.error("An error occurred")}
        <main className="wrapper grow min-h-[40vh] mt-24 place-content-center gap-6 flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-2xl sm:text-4xl font-medium text-secondary mb-2">
              Oops! An error occured...
            </h1>
            <p className="sm:text-3xl font-semibold text-secondary text-lg">
              An error occurred
            </p>
          </div>
          <Button
            onClick={() => window.location.reload()}
            className={`py-5 text-2xl font-semibold min-w-[200px] hover:shadow-2xl`}
          >
            Reload page
          </Button>
        </main>
      </div>
      <Footer />
    </>
  );
}
