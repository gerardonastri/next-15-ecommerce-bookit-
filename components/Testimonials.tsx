
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

const Testimonials = () => {
    const testimonials = [
      { id: 1, name: "Alice Johnson", text: "Bookworm's Paradise has an incredible selection. I always find what I'm looking for!", rating: 5 },
      { id: 2, name: "Bob Smith", text: "The ebook collection is vast and the prices are unbeatable. Highly recommended!", rating: 4 },
      { id: 3, name: "Carol Davis", text: "I love the music section. It's like a treasure trove of both new and classic albums.", rating: 5 },
    ]
  
    return (
      <section className="py-16 bg-background">
        <div className="md:max-w-[1200px] mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <CardTitle className="mb-2 flex items-center gap-x-2">
                    <Image src="/testimone.webp" alt="testimonier" width={60} height={60} className="!w-[50px] !h-[50px] object-cover rounded-[50%]" />
                    {testimonial.name}
                  </CardTitle>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p>&quot;{testimonial.text}&quot;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }


  export default Testimonials