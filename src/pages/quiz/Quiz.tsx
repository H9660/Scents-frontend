import React, { useState } from 'react';
import { questions } from './questions';
import './Quiz.css';

const perfumes = [
  {
    id: 1,
    name: 'Rose Delight',
    image: 'https://via.placeholder.com/100',
    description: 'A beautiful and elegant rose perfume.',
  },
  {
    id: 2,
    name: 'Ocean Breeze',
    image: 'https://via.placeholder.com/100',
    description: 'A fresh and invigorating scent of the ocean.',
  },
  {
    id: 3,
    name: 'Sandalwood Spice',
    image: 'https://via.placeholder.com/100',
    description: 'A warm and spicy sandalwood perfume.',
  },
  {
    id: 4,
    name: 'Vanilla Dream',
    image: 'https://via.placeholder.com/100',
    description: 'A sweet and comforting vanilla perfume.',
  },
];

const Quiz = () => {
  const [answers, setAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null));
  const [recommendations, setRecommendations] = useState<typeof perfumes>([]);

  const handleAnswer = (questionIndex: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // This is a simplified recommendation logic.
    // In a real-world scenario, you would have a more sophisticated algorithm.
    const recommendedPerfumes = perfumes.slice(0, 2);
    setRecommendations(recommendedPerfumes);
  };

  const handleAddToCart = (perfumeId: number) => {
    // In a real-world scenario, you would dispatch an action to add the perfume to the cart.
    console.log(`Perfume with id ${perfumeId} added to cart.`);
  };

  return (
    <div className="quiz-container">
      {questions.map((question, index) => (
        <div key={index} className="question-container">
          <p className="question">{question.question}</p>
          <div className="options">
            {question.options.map((option) => (
              <div
                key={option}
                className={`option ${answers[index] === option ? 'selected' : ''}`}
                onClick={() => handleAnswer(index, option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit}>Get Recommendations</button>

      {recommendations.length > 0 && (
        <div className="recommendations">
          <h2>Our Recommendations for You</h2>
          {recommendations.map((perfume) => (
            <div key={perfume.id} className="recommendation">
              <img src={perfume.image} alt={perfume.name} />
              <div>
                <h3>{perfume.name}</h3>
                <p>{perfume.description}</p>
                <button onClick={() => handleAddToCart(perfume.id)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;
