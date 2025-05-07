import React from "react";

const Carousel = () => {
  // Array of image paths (for easier maintenance)
  const images = [
    "/images/IMG_20250322_150246.jpg",
    "/images/pexels-jon-254413258-13311525.jpg",
    "/images/IMG_20250322_150549.jpg",
    "/images/IMG_20250322_152629.jpg",
    "/images/pexels-case-originals-3679440.jpg",
    "/images/IMG_20250322_150352.jpg",
    "/images/IMG_20250322_152336.jpg",
    "/images/IMG_20250322_145836.jpg",
    "/images/IMG_20250322_150828.jpg",
  ];

  // Create carousel items dynamically based on the images
  const carouselItems = [];
  for (let i = 0; i < images.length; i += 3) {
    carouselItems.push(images.slice(i, i + 3)); // Group images in sets of 3
  }

  return (
    <section className="mb-4">
      <div id="mycarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        
        {/* Indicators */}
        <div className="carousel-indicators">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#mycarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {carouselItems.map((group, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
              <div className="row">
                {group.map((image, index) => (
                  <div className="col-md-4" key={index}>
                    <img src={image} alt={`Slide ${index + 1}`} className="w-100" height="200" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button className="carousel-control-prev" type="button" data-bs-target="#mycarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon bg-danger" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#mycarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon bg-danger" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

export default Carousel;
