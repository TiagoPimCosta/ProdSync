"use client";

import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text leading-none animate-pulse">
            404
          </h1>
          <div
            className="absolute inset-0 text-9xl md:text-[12rem] font-black text-blue-200 opacity-20 animate-bounce"
            style={{ animationDelay: "0.5s", animationDuration: "3s" }}
          >
            404
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Oops! Page Not Found
        </h2>

        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
          The page you're looking for seems to have wandered off into the digital void. Don't worry
          though, we'll help you find your way back!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Home size={20} className="transition-transform group-hover:-translate-y-0.5" />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-accent  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            Go Back
          </button>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>
    </div>
  );
};

export default NotFound;
