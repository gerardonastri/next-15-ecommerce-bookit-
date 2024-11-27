"use client";

import React from "react";
import { Button } from "./ui/button";
import useCartStore from "@/store";
import { Product } from "@/store";



const AddToCart = ({product}: {product: Product}) => {
  const { cart, addProduct } = useCartStore();
  console.log(cart);
  
  const handleAddToCart = () => {
    product[0].quantity = 1;
    addProduct(product[0])
    
  };

  return (
    <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
};

export default AddToCart;
