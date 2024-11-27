import React from "react";

import { categories } from "@/constants/categories";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

import {getProductsByType} from '@/lib/actions/product.action.ts'

const page = async ({ params }: { params: Promise<{ id?: number }> }) => {
  const id = (await params).id;
  const types = ["book", "ebook", "music"];

  const {documents: products} = await getProductsByType(types[id])
  

  return (
    <section className="pt-16">
      <div className="md:max-w-[1200px] mx-auto">
        <h1 className="text-center text-4xl font-bold">{types[id]}</h1>
        <div className="mt-5 flex items-center justify-center gap-5 flex-wrap">
          {id &&
            categories[id].map((item: string) => (
              <Button variant="outline" key={item}>
                {item}
              </Button>
            ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-x-10 max-w-[1200px] mx-4 lg:mx-auto mt-14">
          {products.map((item, i: number) => (
            <ProductCard item={item} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
