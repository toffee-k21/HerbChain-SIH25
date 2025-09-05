import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  console.log(process.env.NEXT_PUBLIC_PINATA_KEY,process.env.NEXT_PINATA_SECRET_KEY)

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY!,
      pinata_secret_api_key: process.env.NEXT_PINATA_SECRET_KEY!,
    },
    body: formData,
  });

  
  const data = await res.json();
  console.log("data",data);
  return NextResponse.json(data);
}
