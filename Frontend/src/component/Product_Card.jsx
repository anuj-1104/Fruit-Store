import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/Appcontext";
import { SiCodefresh } from "react-icons/si";
import AOS from "aos";
import Aos from "aos";



const Product_Card = ({ id, image, name, qty, price, offerprice }) => {
  const { navigate, currency } = useAppContext();

  useEffect(()=>{
    Aos.init({
      duration:2000,
      delay:0,
      once:true,
      easing:"ease-in-out"
    })
  })

  const handlerproduct = async (id) => {
    try {
      navigate(`/fruites/${id}`);
    } catch (error) {
      console.error(`Error:${error}`);
    }
  };

  return (
    <StyledWrapper>
      <div
        data-aos="zoom-in"
        onClick={(e) => handlerproduct(id)}
        className="card w-100 m-1 bg-gray-900 rounded-lg shadow-lg"
      >
        <div className="card2 p-1  flex flex-col gap-2">
          <img
            className="w-full h-32 object-center content-fit rounded-t-lg border border-white rounded-2xl"
            src={image}
            alt={name}
          />
          <SiCodefresh className="text-white animate-pulse text-2xl absolute m-1" />
          <div className="p-3">
            <p className="text-white text-lg  font-semibold">{name}</p>
            <p className="text-gray-300 ">
              Price:{" "}
              <span className="line-through">
                {currency}
                {price}
              </span>
            </p>
            <p className="text-green-400 font-semibold">
              Offer Price: {currency}
              {offerprice}
            </p>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 190px;
    height: 254px;
    background-image: linear-gradient(151deg, #00ff75 0%, #3700ff 100%);
    border-radius: 10px;
    transition: all 0.3s;
    object-fit: cover;
  }

  .card2 {
    width: 190px;
    height: 254px;
    background-color: #1a1a1a;
    border-radius: 10px;
    transition: all 0.1s;
    border: 2px solid white;
  }

  .card2:hover {
    transform: scale(0.98);
    border-radius: 10px;
  }

  .card:hover {
    box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.3);
  }
`;

export default Product_Card;
