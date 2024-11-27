import { Button } from "@/components/ui/button";
import { getProductsById } from "@/lib/actions/product.action";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import React from "react";
import AddToCart from "@/components/AddToCart";

const Product = async ({ params }: { params: Promise<{ id?: number }> }) => {
  const id = (await params).id;
  const { documents: product } = await getProductsById(id);

  

  return (
    <main className="flex-1 py-12">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Image
              src={product[0].image}
              alt="product title"
              width={500}
              height={400}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product[0].title}</h1>
            <p className="text-xl text-muted-foreground mb-4">
              by {product[0].author}
            </p>
            <p className="text-2xl font-bold text-primary mb-4">
              ${product[0].price}
            </p>
            <p className="mb-6">{product[0].description}</p>
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;
