import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="bg-primary text-black py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Bookworm&apos;s Paradise
        </h1>
        <p className="text-xl mb-8">
          Discover your next favorite book, ebook, or album
        </p>
        <Button size="lg" variant="secondary">
          Start Browsing
        </Button>
      </div>
    </section>
  );
};

export default Hero;
