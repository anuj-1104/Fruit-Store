import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../api/axios";

const Cart_page = () => {
  const [items, setItems] = useState([]);
  const cart_items = JSON.parse(localStorage.getItem("Cart_count") || []);
  console.log(cart_items[0]);
  useEffect(() => {
    const handllerCart = async () => {
      try {
        const res = await axios.post(`/product/findproduct/${cart_items[0]}`, {
          p_id: cart_items,
        });

        if (res.request?.status === 200) {
          toast.success("All order find");
        }
      } catch (error) {
        toast.success("Not Found..");
        console.log(error);
      }
    };
    if (cart_items.length > 0) {
      handllerCart();
    }
  }, [cart_items]);

  return (
    <div>
      <div className="h-98 bg-black"></div>
    </div>
  );
};

export default Cart_page;
