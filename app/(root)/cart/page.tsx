"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCartStore from "@/store";
import Image from "next/image";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Cart = () => {
  // const products = [
  //     { id: 1, title: "The Midnight Library", type: "Book", price: 19.99, image: "/placeholder.svg?height=300&width=200", author: "Matt Haig", description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived." },
  //     { id: 2, title: "Atomic Habits", type: "eBook", price: 9.99, image: "/placeholder.svg?height=300&width=200", author: "James Clear", description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day." },
  //     { id: 3, title: "Folklore", type: "Music", price: 14.99, image: "/placeholder.svg?height=300&width=200", author: "Taylor Swift", description: "Folklore is the eighth studio album by American singer-songwriter Taylor Swift." },
  //     // Add more products here...
  //   ]
  const { cart } = useCartStore();
  console.log(cart);

  const [cartItems, setCartItems] = useState(cart);

  const removeFromCart = (title: string) => {
    setCartItems(cartItems.filter((item) => item.title !== title));
  };

  const updateQuantity = (title: string, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.title === title ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
    );
    try {
      const response = await axios.post("/api/checkout", {
        priceId: "price_1QPjBeGDSBdjjDSSfHRuNnEa",
      });
      const data = response.data;
      if (!data.ok) throw new Error("Something went wrong");
      await stripe?.redirectToCheckout({
        sessionId: data.result.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex-1 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {cartItems.map((item) => (
                <Card key={item.title} className="mb-4">
                  <CardContent className="flex items-center p-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.author}
                      </p>
                      <p className="text-sm font-medium">${item.price}</p>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(
                            item.title,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.title, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-4"
                      onClick={() => removeFromCart(item.title)}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleCheckout}>Proceed to Checkout</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
