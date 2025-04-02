import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, orderBy, limit, where } from "firebase/firestore";
import { db } from "./firebase";
import { BlogPost } from "@/types/blog";

const COLLECTION_NAME = "blog_posts";

// Get all blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as BlogPost[];
};

// Get posts by category
export const getPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("category", "==", category)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as BlogPost[];
};

// Get latest posts
export const getLatestPosts = async (count: number = 5): Promise<BlogPost[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("createdAt", "desc"),
    limit(count)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as BlogPost[];
};

// Get popular posts (currently just returns latest posts)
export const getPopularPosts = async (count: number = 5): Promise<BlogPost[]> => {
  return getLatestPosts(count);
};

// Add a new blog post
export const addBlogPost = async (post: Omit<BlogPost, "id">): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), post);
  return docRef.id;
};

// Update an existing blog post
export const updateBlogPost = async (id: string, postData: Omit<BlogPost, "id">) => {
  try {
    const postRef = doc(db, "blog_posts", id);
    await updateDoc(postRef, postData);
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

// Delete a blog post
export const deleteBlogPost = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};

export const getBlogPost = async (id: string): Promise<BlogPost> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Post not found');
    }

    return {
      id: docSnap.id,
      ...docSnap.data()
    } as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
};

// Add a new subscription
export const addSubscription = async (email: string) => {
  try {
    const subscriptionRef = collection(db, "subscriptions");
    const q = query(subscriptionRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error("Email already subscribed");
    }

    await addDoc(subscriptionRef, {
      email,
      subscribedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error adding subscription:", error);
    throw error;
  }
};

// Get all subscriptions
export const getSubscriptions = async () => {
  try {
    const subscriptionRef = collection(db, "subscriptions");
    const q = query(subscriptionRef, orderBy("subscribedAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw error;
  }
};

// Delete a subscription
export const deleteSubscription = async (id: string): Promise<void> => {
  try {
    const subscriptionRef = doc(db, "subscriptions", id);
    await deleteDoc(subscriptionRef);
  } catch (error) {
    console.error("Error deleting subscription:", error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const postsRef = collection(db, COLLECTION_NAME);
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BlogPost[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}; 