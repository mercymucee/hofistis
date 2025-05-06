import React from 'react';

const Guides = () => {
  return (
    <div className="container">
      <h1>Guides</h1>
      <ul>
        <li><a href="/guides/how-to-choose-a-hockey-stick">How to Choose a Hockey Stick</a></li>
        <li><a href="/guides/maintaining-your-hockey-stick">Maintaining Your Hockey Stick</a></li>
        <li><a href="/guides/hockey-stick-sizing-guide">Hockey Stick Sizing Guide</a></li>
      </ul>
    </div>
  );
};

// Change this:
export default Guides; // ✅ Corrected export
