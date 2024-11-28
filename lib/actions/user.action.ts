"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";

import bcrypt from 'bcrypt';

const hashPassword = async (password: string) => {
  const saltRounds = 10; // Numero di cicli di generazione del sale (più alto è, più è sicuro ma lento)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

export const createAccount = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {

    const { databases } = await createAdminClient();
    const hashedPassword = await hashPassword(password)
    const user = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        name,
        email,
        password: hashedPassword,
      }
    );

    return user;
};

// export const getCurrentUser = async () => {
//     try {
//       const { databases, account } = await createSessionClient();
  
//       const result = await account.get();
  
//       const user = await databases.listDocuments(
//         appwriteConfig.databaseId,
//         appwriteConfig.usersCollectionId,
//         [Query.equal("accountId", result.$id)],
//       );
  
//       if (user.total <= 0) return null;
  
//       return parseStringify(user.documents[0]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   export const signOutUser = async () => {
//     const { account } = await createSessionClient();
  
//     try {
//       await account.deleteSession("current");
//       (await cookies()).delete("appwrite-session");
//     } catch (error) {
//       handleError(error, "Failed to sign out user");
//     } finally {
//       redirect("/sign-in");
//     }
//   };