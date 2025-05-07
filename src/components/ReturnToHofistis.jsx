import React from 'react';
import { Link } from 'react-router-dom';

const ReturnToHofistis = () => {
  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000
    }}>
      <Link
        to="/"
        className="btn btn-success shadow"
        style={{
          borderRadius: '30px',
          padding: '10px 25px',
          fontWeight: 'bold',
          fontSize: '1rem'
        }}
      >
        ⬅ Return to Hofistis
      </Link>
    </div>
  );
};

export default ReturnToHofistis;
