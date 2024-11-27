"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import {InputFile} from 'node-appwrite/file'
import { constructFileUrl } from "../utils";


export const createProduct = async ({
    title,
    type,
    price,
    stock,
    description,
    author,
    category,
    image
  }: {
    title: string;
    type: string;
    price: number;
    stock: number;
    description: string;
    author: string;
    category: string;
    image: File;
  }) => {
  
      const { databases, storage } = await createAdminClient();

      const inputFile = InputFile.fromBuffer(image, image.name);

      const bucketFile = await storage.createFile(
        appwriteConfig.bucketId,
        ID.unique(),
        inputFile,
      );


      const product = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.productColletionId,
        ID.unique(),
        {
            title,
            type,
            price,
            stock,
            description,
            author,
            category,
            image: constructFileUrl(bucketFile.$id),
        }
      );
  
      return product;
  };


//get products
export const getProducts = async () => {
  const { databases } = await createAdminClient();

  try {
    const products = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.productColletionId,
    );

    return products
  } catch (error) {
    console.log(error);
    
  }
}

//get featuredProducts
export const getFeaturedProducts = async () => {
  const { databases } = await createAdminClient();

  try {
    const products = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.productColletionId,
      [Query.equal("featured", [true])]
    );

    return products
  } catch (error) {
    console.log(error);
    
  }
}

//get products by category
export const getProductsByType = async (type: string) => {
  const { databases } = await createAdminClient();
  

  try {
    const products = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.productColletionId,
      [Query.equal("type", [type])]
    );

    return products
  } catch (error) {
    console.log(error);
    
  }
}

//get products by category
export const getProductsById = async (id: string) => {
  const { databases } = await createAdminClient();
  

  try {
    const products = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.productColletionId,
      [Query.equal("$id", [id])]
    );

    return products
  } catch (error) {
    console.log(error);
    
  }
}