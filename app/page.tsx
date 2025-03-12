import { useState } from "react";

export default function Home() {
  const [flashcards, setFlashcards] = useState([
    { question: "What is React?", answer: "A JavaScript library for building user interfaces." },
    { question: "What is Next.js?", answer: "A React framework for production applications." },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const addFlashcard = () => {
    if (newQuestion && newAnswer) {
      setFlashcards([...flashcards, { question: newQuestion, answer: newAnswer }]);
      setNewQuestion("");
      setNewAnswer("");
    }
  };

  const deleteFlashcard = (index: number) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
    setCurrentIndex(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold">{flashcards[currentIndex]?.question || "No Flashcards"}</h2>
        {showAnswer && <p className="mt-4 text-gray-700">{flashcards[currentIndex]?.answer}</p>}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
        <button
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
          onClick={nextCard}
        >
          Next Card
        </button>
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
          onClick={() => deleteFlashcard(currentIndex)}
          disabled={flashcards.length === 0}
        >
          Delete Card
        </button>
      </div>
      <div className="w-96 mt-6 p-4 bg-white rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">Add Flashcard</h3>
        <input
          type="text"
          placeholder="Question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="w-full mt-2 p-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          className="w-full mt-2 p-2 border rounded-lg"
        />
        <button
          className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg"
          onClick={addFlashcard}
        >
          Add Flashcard
        </button>
      </div>
    </div>
  );
}
