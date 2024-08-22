import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

type ParamTypes = {
  params: {
    id: number;
  };
};

export async function DELETE(request: NextRequest, { params }: ParamTypes) {
  const id = { params };

  const filePath = path.join(process.cwd(), "database", "products.json");

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  //   console.log(data, 222);

  let product = data.filter((product: any) => product.id !== +params.id);

  console.log(product);
  fs.writeFileSync(filePath, JSON.stringify(product), "utf-8");

  return NextResponse.json({ message: product });
}

export async function PUT(request: NextRequest, { params }: ParamTypes) {
  const { id } = params;

  const updatedProduct = await request.json();

  // Bc 1 : Láy vị trí file cần đọc
  const filePath = path.join(process.cwd(), "database", "products.json");
  const products = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Bc 2 : Tìm kiếm vị trí cần cập nhật
  const findIndex = products.findIndex((user: any) => user.id === +params.id);

  // Bc 3 : Ghi đè lại file
  if (findIndex !== -1) {
    products[findIndex] = updatedProduct;
  }
  fs.writeFileSync(filePath, JSON.stringify(products), "utf-8");

  // Bc 4 : Trả về message cho client

  return NextResponse.json({ message: products });
}

export async function GET(request: any, { params }: ParamTypes) {
  try {
    const id = { params };

    const filePath = path.join(process.cwd(), "database", "products.json");

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    //   console.log(data, 222);

    let product = data.find((product: any) => product.id === +params.id);

    console.log(product);

    return NextResponse.json({ message: product });
  } catch (error) {
    return NextResponse.json("Tìm sản phẩm thất bại");
  }
}
