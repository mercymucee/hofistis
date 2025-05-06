import React, { useState } from 'react';

// Define the FAQ questions and answers related to Field Hockey Sticks
const faqData = [
  {
    question: 'What is the best type of field hockey stick for beginners?',
    answer:
      'For beginners, a fiberglass stick is ideal because it offers a good balance of flexibility and durability at a lower price point.'
  },
  {
    question: 'How do I choose the right field hockey stick?',
    answer:
      'To choose the right stick, consider the length, weight, and composition (wood, fiberglass, or carbon). A lighter stick is better for quick maneuvers, while a heavier one offers more power.'
  },
  {
    question: 'What is the difference between a wood and a carbon field hockey stick?',
    answer:
      'A wood stick is heavier and offers better ball control, while a carbon stick is lighter, providing more power and speed, but can sacrifice some control.'
  },
  {
    question: 'How long do field hockey sticks last?',
    answer:
      'The lifespan of a field hockey stick depends on how often you play. If you play regularly, you may need to replace your stick every 1-2 years. Over time, the stick may lose its flexibility and shape.'
  },
  {
    question: 'What is the best length for a field hockey stick?',
    answer:
      'The length of your stick should reach somewhere between your hip and the top of your thigh. Shorter sticks are good for control, while longer sticks are better for reach and power.'
  },
  {
    question: 'Can I use a field hockey stick on both grass and turf?',
    answer:
      'Yes, most field hockey sticks are designed for use on both grass and turf. However, some players prefer using specific sticks designed for either surface, depending on their playing style.'
  },
  {
    question: 'Do field hockey sticks come with a warranty?',
    answer:
      'Some brands offer warranties on their sticks, typically covering defects in materials or craftsmanship. Make sure to check the specific warranty details when purchasing.'
  }
];

const FAQPage = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  // Handle the click event to reveal the answer
  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="container py-4">
      <h1 className="text-center" style={{ color: '#28a745' }}>
        Field Hockey Stick FAQs
      </h1>

      <div className="list-group mt-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="list-group-item"
            style={{
              backgroundColor: '#f8f9fa',
              border: '1px solid #e63946',
              borderRadius: '8px',
              marginBottom: '10px',
              cursor: 'pointer',
            }}
            onClick={() => toggleAnswer(index)}
          >
            <h5 style={{ color: '#212529' }}>{faq.question}</h5>
            {activeQuestion === index && (
              <p style={{ color: '#6c757d' }}>{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
