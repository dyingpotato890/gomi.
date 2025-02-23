import { NextResponse } from "next/server";
import ExifParser from "exif-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const parser = ExifParser.create(buffer);
        const result = parser.parse();

        if (!result.tags || !result.tags.GPSLatitude || !result.tags.GPSLongitude) {
            return NextResponse.json({ message: "No GPS data found in the image", tags: result.tags }, { status: 404 });
        }

        const latitude = result.tags.GPSLatitude;
        const longitude = result.tags.GPSLongitude;
        const latRef = result.tags.GPSLatitudeRef || 'N';
        const lonRef = result.tags.GPSLongitudeRef || 'E';

        const formattedLatitude = (latRef === 'S' ? -1 : 1) * latitude;
        const formattedLongitude = (lonRef === 'W' ? -1 : 1) * longitude;

        const wastepile = await prisma.wastepile.create({
            data: {
              lat: formattedLatitude,
              long: formattedLongitude,
              imageUrl: null,
              status: "PENDING",
            },
          });

        return NextResponse.json({ location: { latitude: formattedLatitude, longitude: formattedLongitude } });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Location data: { latitude: 9.928563972222221, longitude: 76.30360697222221 }