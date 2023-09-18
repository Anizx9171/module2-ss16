import React, { useEffect, useState } from "react";
import Headerr from "../../../components/user/header/Headerr";
import axios from "axios";
import { Button } from "antd";

export default function ListProduct() {
  const [categoryId, setCategoryId] = useState(-1);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  const getCategoryId = (id) => {
    setCategoryId(id);
  };

  const getDataProduct = () => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        if (categoryId < 0) {
          setProducts(response.data);
        } else {
          setProducts(
            response.data.filter((pro) => pro.category_id == categoryId)
          );
        }
        console.log(products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDataProduct();
  }, [categoryId]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categoryes")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getDataProduct();
  }, []);

  return (
    <>
      <Headerr />

      <div className="p-4 flex gap-8">
        <div className="w-1/5 bg-white rounded-lg border bg-or shadow-lg h-screen">
          <ul>
            <li
              style={
                categoryId < 0
                  ? { background: "rgb(249, 115, 22)", color: "#fff" }
                  : {}
              }
              onClick={() => getCategoryId(-1)}
              className="p-3 hover:bg-gray-50 text-lg cursor-pointer"
            >
              Tất cả sản phẩm
            </li>
            {category.map((cat) => (
              <li
                style={
                  categoryId === cat.category_id
                    ? { background: "rgb(249, 115, 22)", color: "#fff" }
                    : {}
                }
                onClick={() => getCategoryId(cat.category_id)}
                className="p-3 hover:bg-gray-50 text-lg cursor-pointer"
                key={cat.category_id}
              >
                {cat.category_name}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-400 w-4/5 p-3 grid grid-cols-4 gap-y-4">
          {products.map((pro) => (
            <div
              className="bg-white p-6 h-80 w-60 rounded-md flex flex-col justify-between align-center"
              key={pro.id}
            >
              <img src={pro.image} alt="" className="block min-w-60 min-h-60" />
              <h2 className="text-center text-xl">{pro.product_name}</h2>
              <div className="flex justify-between flex-col">
                <span>
                  {Number(pro.price).toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
                <Button>Thêm vào giỏ hàng</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
