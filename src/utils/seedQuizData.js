// src/utils/seedQuizData.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { mockQuizzes } from "./mockQuizData";

// Function to upload mock quizzes to Firestore
export const seedQuizData = async () => {
  try {
    const quizCollection = collection(db, "quizzes");

    for (let quiz of mockQuizzes) {
      await addDoc(quizCollection, quiz);
      console.log(`✅ Added quiz: ${quiz.title}`);
    }

    console.log("🎉 All quizzes uploaded successfully!");
  } catch (error) {
    console.error("❌ Error uploading quizzes:", error);
  }
};
