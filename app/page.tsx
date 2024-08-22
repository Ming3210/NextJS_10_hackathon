"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function page() {
  const [editId, setEditId] = useState<any>(0);
  const [buttonName, setButtonName] = useState("Add");
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState<any>({
    id: Math.floor(Math.random() * 99999999999999999999999),
    name: "",
    price: "",
    quantity: 1,
    image: "",
  });
  const [products, setProducts] = useState<any>();
  useEffect(() => {
    axios.get("http://localhost:3000/api/products").then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  }, []);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValue((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const del = (id: number) => {
    const confirmDelete = window.confirm("Are you sure to delete this item?");
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:3000/api/products/${id}`)
      .then(() => {
        return axios.get("http://localhost:3000/api/products");
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Failed to delete product:", error);
      });
  };

  const add = () => {
    if (!editing) {
      let a = inputValue;
      a.price = Number(inputValue.price);
      axios
        .post("http://localhost:3000/api/products", a)
        .then(() => {
          return axios.get("http://localhost:3000/api/products");
        })
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Failed to add product:", error);
        });
    } else {
      let a = inputValue;
      a.price = Number(inputValue.price);
      axios
        .put(`http://localhost:3000/api/products/${editId}`, a)
        .then(() => {
          return axios.get("http://localhost:3000/api/products");
        })
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Failed to edit product:", error);
        });
      setButtonName("Add");
    }
  };

  const edit = (id: number) => {
    setEditing(true);
    setButtonName("Save");
    setEditId(id);
    const productToEdit = products.find((product: any) => product.id === id);
    setInputValue(productToEdit);
  };

  return (
    <>
      <div className="relative flex justify-evenly overflow-x-auto">
        <table className=" w-[60%] border-collapse text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                Tên sản phẩm
              </th>
              <th scope="col" className="px-6 py-3">
                Hình ảnh
              </th>
              <th scope="col" className="px-6 py-3">
                Giá
              </th>
              <th scope="col" className="px-6 py-3">
                Số lượng
              </th>
              <th scope="col" className="px-6 py-3">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product: any, index: number) => {
              return (
                <tr
                  key={product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="mb-3 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {+index + 1}
                  </th>
                  <td className="mb-3 px-6 py-4">{product.name}</td>
                  <td>
                    <img
                      className="mb-3 w-auto h-[90px]"
                      src={product.image}
                      alt=""
                    />
                  </td>
                  <td className="mb-3 px-6 py-4">
                    {product.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td className="mb-3 px-6 py-4">{product.quantity}</td>
                  <td>
                    <Button
                      onClick={() => edit(product.id)}
                      variant={"default"}
                    >
                      Sửa
                    </Button>
                    <Button
                      onClick={() => del(product.id)}
                      variant={"destructive"}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Add product</CardTitle>
              <CardDescription>Add your product here</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Tên</Label>
                    <Input
                      name="name"
                      value={inputValue.name}
                      onChange={handleChanges}
                      id="text"
                      placeholder=""
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Hình ảnh</Label>
                    <Input
                      name="image"
                      value={inputValue.image}
                      onChange={handleChanges}
                      id="text"
                      placeholder=""
                    />{" "}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Giá</Label>
                    <Input
                      name="price"
                      value={inputValue.price}
                      onChange={handleChanges}
                      id="number"
                      placeholder=""
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Số lượng</Label>
                    <Input
                      name="quantity"
                      value={inputValue.quantity}
                      onChange={handleChanges}
                      id="number"
                      placeholder="Tên"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={add}>{buttonName}</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
