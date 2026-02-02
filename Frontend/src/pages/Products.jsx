import React from "react";
import { useAppContext } from "../context/Appcontext";
import Product_Card from "../component/Product_Card";
import Loader from "../component/Loading/Loading";

const Products = () => {
  const { data, error, loading } = useAppContext();

  // Show error
  if (error) {
    return (
      <div className=" flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="bg-black min-h-screen col-span-full select-none   ">
      <p className="text-white text-2xl font-semibold  text-center  p-8  ">
        All Fruites & Vegetables
      </p>

      <div className="grid grid-cols-2 gap-3   p-4 items-center-safe sm:grid-cols-3 m-10 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 ">
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
          <>
            <div className="col-span-full flex flex-col justify-center items-center">
              <Loader />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
