import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";

interface Props{
    title: string;
    type: string;
    price: number;
    stock: number;
    description: string;
    author: string;
    category: string;
    image: string;
    featured: boolean;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
}

const ProductCard = ({item}: {item: Props}) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link href={`/product/${item.$id}`}>
        <CardHeader className="p-0">
          <Image
            src={item.image}
            alt="product title"
            width={350}
            height={192}
            className="w-full h-48 object-cover"
          />
        </CardHeader>
      </Link>
      <CardContent className="p-4">
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.author}</CardDescription>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-medium capitalize">{item.type}</span>
          <span className="font-bold text-primary">${item.price}</span>
        </div>
      </CardContent>
      <CardFooter>
        <AddToCart product={[item]} className="w-full">Add to Cart</AddToCart>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
