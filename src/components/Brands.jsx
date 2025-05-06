import React from 'react';

const Brands = () => {
  const brands = ['Bauer', 'CCM', 'Warrior', 'Easton', 'Sherwood', 'Reebok'];

  return (
    <div className="container">
      <h1>Hockey Stick Brands</h1>
      <div className="row">
        {brands.map((brand, index) => (
          <div className="col-md-4" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{brand}</h5>
                <p>Explore our {brand} hockey sticks</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
