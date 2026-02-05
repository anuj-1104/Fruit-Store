import React from "react";
import { useAppContext } from "../context/Appcontext";
import Product_Card from "../component/Product_Card";
import Loader from "../component/Loading/Loading";

const Products = () => {
  const { data } = useAppContext();

  return (
    <>
      <div className="bg-black  col-span-full select-none p-4 ">
        <p className="text-white text-2xl font-semibold  text-center  ">
          All Fruites & Vegetables
        </p>

        <div className=" m-2 grid grid-cols-2 md:grid-cols-6 mt-5 md:ml-5 sm:grid-cols-5 gap-6 justify-center">
          {data.length > 0 ? (
            data.map(
              (
                item,
                key, //like a for loop
              ) => (
                <Product_Card
                  key={item.p_id || key} //pass a unique key prop
                  image={item.image_url}
                  name={item.p_name}
                  id={item.p_id}
                  qty={item.p_qty}
                  price={item.p_price}
                  offerprice={item.p_offerprice}
                />
              ),
            )
          ) : (
            <div className=" bg-black min-h-45 m-5  text-white justify-center items-center">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
