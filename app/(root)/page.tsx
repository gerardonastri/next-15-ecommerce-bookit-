import React from "react";


import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Categories from "@/components/Categories";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import { getFeaturedProducts } from "@/lib/actions/product.action";

const Home = async () => {

  // const {user} = await getServerSession()
  
  const {documents: products} = await getFeaturedProducts()
  
  return (
    <div className="">
      <Hero />
      {/* featued products  */}
      <h2 className="mt-3 text-center text-3xl mb-5 font-bold">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-x-10 max-w-[1200px] mx-4 lg:mx-auto">
        {products.map((item, i) => (
          <ProductCard key={i} item={item} />
        ))}
      </div>

      <Categories />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
