"use client";

import React from "react";
import { Header, Footer } from "@/components/Layout";
import { GLBOptimizerUpload } from "@/components/optimizer/GLBOptimizerUpload";

export default function OptimizePage() {
  return (
    <div className="min-h-screen flex flex-col container w-full mx-auto">
      <Header />

      <main className="flex-1 px-4 py-10">
        <GLBOptimizerUpload />
      </main>

      <Footer />
    </div>
  );
}
