import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "database", "products.json");

    const data = fs.readFileSync(filePath, "utf8");

    const users = JSON.parse(data);

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(request: Request, response: NextResponse) {
  const product = await request.json();
  console.log(product);

  const filePath = path.join(process.cwd(), "database", "products.json");

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  data.push(product);

  fs.writeFileSync(filePath, JSON.stringify(data), "utf-8");

  return NextResponse.json({ message: "Thêm thành công" });
}
