import React, { useState, useEffect } from 'react';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: '🏑 Welcome to Hofistis — your home for top field hockey stick brands!' }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Initialize the chatbot with a welcome message (Text-to-Speech)
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance('Welcome to Hofistis — your home for top field hockey stick brands!');
      window.speechSynthesis.speak(msg);
    }
  }, []);

  const toggleChatbot = () => setIsOpen(!isOpen);

  // Function to send the message and get bot's response
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    const botResponse = { from: 'bot', text: await getBotResponse(input) };

    setMessages((prev) => [...prev, userMessage, botResponse]);
    setInput('');

    // Speak the bot's response (Text-to-Speech)
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance(botResponse.text);
      window.speechSynthesis.speak(msg);
    }
  };

  // Function to handle bot's response
  const getBotResponse = async (input) => {
    const lower = input.toLowerCase();

    if (lower.includes('hello') || lower.includes('hi')) return 'Hello! 👋 Need help finding a field hockey stick?';
    if (lower.includes('brand')) return 'We offer Bauer, Adidas, Gryphon, TK, Grays, and more.';
    if (lower.includes('cost') || lower.includes('price')) return 'Field hockey sticks range from Ksh 3,500 to Ksh 25,000 depending on brand and level.';
    if (lower.includes('delivery')) return 'We deliver across Kenya in 2–4 days. Free shipping for orders over Ksh 5,000!';
    if (lower.includes('return')) return 'You may return items within 14 days if unused. Email returns@hofistis.com.';

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your actual OpenAI API key
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant that answers questions about field hockey sticks and Hofistis services.' },
            { role: 'user', content: input }
          ],
          max_tokens: 100,
        }),
      });
      const data = await response.json();
      return data.choices?.[0]?.message?.content || "I'm not sure, but I can find out for you!";
    } catch (error) {
      return "Sorry, I'm having trouble accessing my knowledge right now.";
    }
  };

  // Function to start voice-to-text input
  const startListening = () => {
    if (!recognition) return alert('Speech recognition not supported in your browser.');
    
    recognition.lang = 'en-US';
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      handleSend();  // Send the message automatically after voice input
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <>
      {/* Toggle Chatbot Button */}
      <button
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '55px',
          height: '55px',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        }}
        onClick={toggleChatbot}
      >
        💬
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div
          style={{
            width: '90%',
            maxWidth: '340px',
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            zIndex: 1000,
            background: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #ccc',
            boxShadow: '0 0 12px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header with Close Button */}
          <div
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '10px',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
            }}
          >
            Hofistis Assistant
            <button
              onClick={toggleChatbot}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>

          {/* Chat Messages */}
          <div
            style={{
              height: '220px',
              overflowY: 'auto',
              padding: '10px',
              background: '#f8f9fa',
              flex: 1,
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: '10px',
                  padding: '8px 12px',
                  borderRadius: '15px',
                  maxWidth: '80%',
                  backgroundColor: msg.from === 'bot' ? '#e1f5fe' : '#bbdefb',
                  textAlign: msg.from === 'bot' ? 'left' : 'right',
                  marginLeft: msg.from === 'bot' ? 0 : 'auto',
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div
            style={{
              display: 'flex',
              padding: '10px',
              borderTop: '1px solid #ccc',
              backgroundColor: '#fff',
              alignItems: 'center',
            }}
          >
            {/* Text Input Field */}
            <input
              type="text"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{
                flex: 1,
                padding: '6px 10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '0.9rem',
              }}
            />
            
            {/* Voice Input Button */}
            <button
              onClick={startListening}
              style={{
                marginLeft: '6px',
                padding: '6px 10px',
                backgroundColor: isListening ? '#ffc107' : '#17a2b8',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              title="Click to speak"
            >
              🎙️
            </button>

            {/* Send Button */}
            <button
              onClick={handleSend}
              style={{
                marginLeft: '6px',
                padding: '6px 10px',
                backgroundColor: '#17a2b8',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
