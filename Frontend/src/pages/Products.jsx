import React from "react";
import { useAppContext } from "../context/Appcontext";
import Product_Card from "../component/Product_Card";
import Loader from "../component/Loading/Loading";

const Products = () => {
  const { data, error, loading } = useAppContext();

  // Show error
  if (error) {
    return (
      <div className=" flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }
  {
    loading && <Loader />;
  }
  return (
    <div className="bg-black min-h-screen col-span-full select-none ">
      <p className="text-white text-2xl font-semibold  text-center items-center pt-8 pb-4">
        All Fruites & Vegetables
      </p>

      <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-10">
        {data.length > 0
          ? data.map(
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
          : "No Products Found"}
      </div>
    </div>
  );
};

export default Products;
