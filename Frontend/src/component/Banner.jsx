import React from "react";
import Slider from "react-slick";
import banne1 from "../assets/banner1.jpg";

function Banner() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 55000,
    autoplaySpeed: 2000, //2 seconds
  };

  return (
    <div className="slider-container bg-black overflow-hidden ">
      <Slider {...settings}>
        <div>
          <img className="h-auto" src={banne1} alt="Banner 1" />
        </div>
        <div>
          <img className="" src={banne1} alt="Banner 2" />
        </div>
        <div>
          <img className="" src={banne1} alt="Banner 2" />
        </div>
        <div>
          <img className="" src={banne1} alt="Banner 2" />
        </div>
        <div>
          <img className="" src={banne1} alt="Banner 2" />
        </div>
        <div>
          <img className="" src={banne1} alt="Banner 2" />
        </div>
      </Slider>
    </div>
  );
}

export default Banner;
