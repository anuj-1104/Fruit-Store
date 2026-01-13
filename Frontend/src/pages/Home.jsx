import React from "react";
import Banner from "../component/Banner";
import InfoSection from "../component/Features";

const Home = () => {
  return (
    <div className="bg-black ">
      <Banner />

      <section>
        <h3>Menu</h3>
        <div className="grid grid-cols-1 "></div>
      </section>

      <InfoSection />
    </div>
  );
};

export default Home;
