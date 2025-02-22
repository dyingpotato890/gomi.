import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import ExifReader from "exifreader";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const tags = await ExifReader.load(fileBuffer);

    if (tags.GPSLatitude && tags.GPSLongitude) {
      return NextResponse.json({
        latitude: tags.GPSLatitude.description,
        longitude: tags.GPSLongitude.description,
      });
    } else {
      return NextResponse.json({ error: "No GPS data found in image" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
