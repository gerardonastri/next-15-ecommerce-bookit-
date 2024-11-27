"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, ChevronLeft, Upload, X } from "lucide-react";
import Link from "next/link";
import { createProduct } from "@/lib/actions/product.action";

// const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  type: z.enum(["Book", "eBook", "Music"]),
  price: z.number().min(0.01, {
    message: "Price must be at least 0.01.",
  }),
  stock: z.number().int().min(0, {
    message: "Stock must be a non-negative integer.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  author: z.string().min(2, {
    message: "Author must be at least 2 characters.",
  }),
  isbn: z.string().optional(),
  genre: z.string().min(2, {
    message: "Genre must be at least 2 characters.",
  }),
  image: z
    .any()
    .optional()
    // .refine(
    //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    //   `Max file size is 5MB.`
    // )
    // .refine(
    //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    //   ".jpg, .jpeg, .png and .webp files are accepted."
    // ),
});

function ImageUpload({ form }) {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      form.setValue("image", file, { shouldValidate: true })
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    form.setValue("image", null, { shouldValidate: true })
    setPreview(null)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {!preview ? (
        <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or WebP (MAX. 5MB)</p>
          </div>
          <input 
            id="image-upload" 
            type="file" 
            className="hidden" 
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
          />
        </label>
      ) : (
        <div className="relative">
          <img src={preview} alt="Preview" className="max-w-full h-auto max-h-64 rounded-lg" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default function AddProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "Book",
      price: 0,
      stock: 0,
      description: "",
      author: "",
      isbn: "",
      genre: "",
    },
  });



  //create product
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const {
      title,
      type,
      price,
      stock,
      description,
      author,
      genre: category,
      image,
    } = values;
    try {
      setIsSubmitting(false);

      //function
      await createProduct({
        title,
        type: type.toLowerCase(),
        price,
        stock,
        description,
        author,
        category,
        image,
      });
      
      //end of function
      setIsSuccess(true);
      toast({
        title: "Product Added",
        description:
          "The product has been successfully added to the inventory.",
      });
      // Reset form after successful submission
      form.reset();
      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.log(error);
      setIsSuccess(false);
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="flex flex-row justify-between">
            <div>
              <CardTitle>Add New Product</CardTitle>
              <CardDescription>
                Enter the details of the new product to add to the inventory.
              </CardDescription>
            </div>
            <Link href="/admin">
              <Button variant="ghost" className="mb-4">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* image  */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Image</FormLabel>
                      <FormControl>
                        <ImageUpload field={field} form={form} />
                      </FormControl>
                      <FormDescription>
                        Upload an image for the product. Accepted formats: JPG,
                        PNG, WebP. Max size: 5MB.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* title  */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product title" {...field} />
                      </FormControl>
                      <FormDescription>
                        The title of the book, ebook, or music album.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select product type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Book">Book</SelectItem>
                          <SelectItem value="eBook">eBook</SelectItem>
                          <SelectItem value="Music">Music</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the type of product you&apos;re adding.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Enter price"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        The price of the product in dollars.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter stock quantity"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        The number of items in stock.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter product description"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A detailed description of the product.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author/Artist</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter author or artist name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The name of the author or artist.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isbn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ISBN (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter ISBN" {...field} />
                      </FormControl>
                      <FormDescription>
                        The ISBN for books or ebooks (if applicable).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter genre" {...field} />
                      </FormControl>
                      <FormDescription>
                        The genre or category of the product.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting || isSuccess}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding Product
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Product Added
                    </>
                  ) : (
                    "Add Product"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
