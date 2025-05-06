import React from "react";

const Carousel = () => {
  return (
    <section className="row">
      <div className="col-md-12">
        {/* Bootstrap Carousel */}
        <div id="mycarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {/* First Slide (Active) */}
            <div className="carousel-item active">
              <div className="row">
                <div className="col-md-4">
                  <img
                    src="/images/IMG_20250322_150246.jpg"
                    alt="Slide 1"
                    className="w-100"
                    height="200"
                  />
                </div>
                <div className="col-md-4">
                  <img
                    src="/images/pexels-jon-254413258-13311525.jpg"
                    alt="Slide 2"
                    className="w-100"
                    height="200"
                  />
                </div>
                <div className="col-md-4">
                  <img
                    src="/images/IMG_20250322_150549.jpg"
                    alt="Slide 3"
                    className="w-100"
                    height="200"
                  />
                </div>
              </div>
            </div>

            {/* Second Slide */}
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-4">
                  <img
                    src="/images/IMG_20250322_152629.jpg"
                    alt="Slide 4"
                    className="w-100"
                    height="200"
                  />
                </div>
                <div className="col-md-4">
                  <img
                    src="/images/pexels-case-originals-3679440.jpg"
                    alt="Slide 5"
                    className="w-100"
                    height="200"
                  />
                </div>
                <div className="col-md-4">
                  <img
                    src="/images/IMG_20250322_150352.jpg"
                    alt="Slide 6"
                    className="w-100"
                    height="200"
                  />
                </div>
              </div>
            </div>

            {/* Third Slide */}
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-4">
                  <img
                    src="/images/IMG_20250322_152336.jpg"
                    alt="Slide 7"
                    className="w-100"
                    height="200"
                  />
                </div>
                <div className="col-md-4">
                  <img
                    src="/images/IMG_20250322_150246.jpg"
                    alt="Slide 8"
                    className="w-100"
                    height="200"
                  />
                </div>
                <div className="col-md-4">
                  <img
                    src="/images/IMG_20250322_145836.jpg"
                    alt="Slide 9"
                    className="w-100"
                    height="200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <a className="carousel-control-prev" href="#mycarousel" role="button" data-bs-slide="prev">
            <span className="carousel-control-prev-icon bg-danger" aria-hidden="true"></span>
          </a>

          <a className="carousel-control-next" href="#mycarousel" role="button" data-bs-slide="next">
            <span className="carousel-control-next-icon bg-danger" aria-hidden="true"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Carousel;

