export const mockQuizzes = [
  // --- MATH CATEGORY ---
  {
    id: 1,
    title: "Basic Arithmetic",
    description: "Warm up with simple addition and subtraction.",
    category: "Math",
    difficulty: "Easy",
    questions: [
      { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: "4" },
      { question: "What is 10 - 3?", options: ["6", "7", "8", "9"], correctAnswer: "7" },
      { question: "What is 5 + 5?", options: ["10", "15", "20", "25"], correctAnswer: "10" }
    ],
  },
  {
    id: 2,
    title: "Multiplication Master",
    description: "Test your times tables.",
    category: "Math",
    difficulty: "Medium",
    questions: [
      { question: "What is 12 × 12?", options: ["124", "144", "164", "184"], correctAnswer: "144" },
      { question: "What is 7 × 8?", options: ["54", "56", "58", "62"], correctAnswer: "56" },
      { question: "What is 9 × 6?", options: ["54", "56", "52", "58"], correctAnswer: "54" }
    ],
  },
  {
    id: 3,
    title: "Algebra Advanced",
    description: "Solve for X in these tricky equations.",
    category: "Math",
    difficulty: "Hard",
    questions: [
      { question: "If 2x + 5 = 15, what is x?", options: ["5", "10", "2.5", "7.5"], correctAnswer: "5" },
      { question: "Solve: 3(y - 4) = 12", options: ["6", "8", "10", "0"], correctAnswer: "8" }
    ],
  },

  // --- SCIENCE CATEGORY ---
  {
    id: 4,
    title: "Our Solar System",
    description: "Explore the planets and stars.",
    category: "Science",
    difficulty: "Easy",
    questions: [
      { question: "Which is the closest star to Earth?", options: ["Proxima Centauri", "The Sun", "Sirius", "Polaris"], correctAnswer: "The Sun" },
      { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: "Mars" }
    ],
  },
  {
    id: 5,
    title: "Biology Basics",
    description: "Learn about cells and life.",
    category: "Science",
    difficulty: "Medium",
    questions: [
      { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Cytoplasm"], correctAnswer: "Mitochondria" },
      { question: "What molecule carries genetic instructions?", options: ["RNA", "DNA", "ATP", "Protein"], correctAnswer: "DNA" }
    ],
  },
];