export const appwriteConfig = {
    endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    usersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION,
    booksCollectionId: process.env.NEXT_PUBLIC_APPWRITE_BOOKS_COLLECTION,
    ebooksCollectionId: process.env.NEXT_PUBLIC_APPWRITE_EBOOKS_COLLECTION,
    musicCollectionId: process.env.NEXT_PUBLIC_APPWRITE_MUSIC_COLLECTION,
    productColletionId: process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION,
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET,
    secretKey: process.env.NEXT_APPWRITE_KEY  
}