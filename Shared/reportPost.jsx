import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore functions
import { db } from "../Config/FirebaseConfig"; // Firebase configuration

export const reportPost = async (postId, userId, reason,ownerInfo) => {
  try {
    // Reference the 'reports' collection
    const reportsCollection = collection(db, "reports");

    // Add a new report document
    await addDoc(reportsCollection, {
      postId,
     
      userId,
      reason,
      ownerInfo, // Include owner information
      timestamp: serverTimestamp(), // Use server-generated timestamp
    });

    console.log("Post reported successfully!");
  } catch (error) {
    console.error("Error reporting post:", error);
  }
};
