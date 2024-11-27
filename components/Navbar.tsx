"use client";
import React, { useState } from "react";

import { BookOpen, Menu, Search, ShoppingCart } from "lucide-react";

import Form from "next/form";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = ({ query }: { query?: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between pt-8 px-5 lg:px-12">
      <Link href="/" className="flex items-center gap-x-4">
        <BookOpen className="h-8 w-8" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-black to-transparent text-transparent bg-clip-text">
          Bookworm&apos;s paradis
        </h1>
      </Link>
      {/* search  */}
      <Form
        action="/search"
        scroll={false}
        className="hidden bg-white md:flex items-center gap-x-2 px-4 py-2 border border-gray-300 focus:border-gray-700
         rounded-lg"
      >
        <Search className="w-4 h-4 text-gray-400" />
        <input
          name="query"
          defaultValue={query}
          placeholder="Search books, ebooks, music..."
          className="md:w-[300px] outline-none placeholder:text-sm"
        />
      </Form>
      {/* links  */}
      <section className="hidden md:flex items-center gap-x-2">
        <Link href="/type/0">
          <Button variant="ghost">Books</Button>
        </Link>
        <Link href="/type/1">
          <Button variant="ghost">Ebooks</Button>
        </Link>
        <Link href="/type/2">
          <Button variant="ghost">Music</Button>
        </Link>
        <Link href="/cart">
          <Button variant="outline" size="icon">
            <ShoppingCart className="w-5 h-5 " />
          </Button>
        </Link>
      </section>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* mobile links  */}
      <section
        className={`absolute ${
          isMenuOpen ? "left-0" : "left-[-600px]"
        }  top-[80px] w-full md:hidden flex flex-col gap-y-3 px-4 py-2 bg-gray-100 transition-all duration-200 ease-linear`}
      >
        <Link href="/type/0">
          <Button variant="ghost">Books</Button>
        </Link>
        <Link href="/type/1">
          <Button variant="ghost">Ebooks</Button>
        </Link>
        <Link href="/type/2">
          <Button variant="ghost">Music</Button>
        </Link>
        <Link href="/cart">
          <Button variant="outline" size="icon">
            <ShoppingCart className="w-5 h-5 " />
          </Button>
        </Link>
        <Form
          action="/"
          scroll={false}
          className="bg-white flex items-center gap-x-3 px-4 py-2 border border-gray-300 focus:border-gray-700
         rounded-lg w-full"
        >
          <Search className="w-4 h-4 text-gray-400" />
          <input
            name="query"
            defaultValue={query}
            placeholder="Search books, ebooks, music..."
            className="w-full outline-none placeholder:text-sm"
          />
        </Form>
      </section>
    </nav>
  );
};

export default Navbar;
