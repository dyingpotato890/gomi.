import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import exif from 'jpeg-exif';

export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'uploads');
  form.keepExtensions = true;

  try {
    await fs.promises.mkdir(form.uploadDir, { recursive: true }); // Use async method
  } catch (error) {
    console.error("Error creating upload directory:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({ error: 'Error parsing the file' });
    }

    if (!files.image) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = files.image;
    const filePath = Object.hasOwnProperty.call(file, "filepath") ? file.filepath : file.path;

    try {
      const fileBuffer = fs.readFileSync(filePath);
      const data = exif.parse(fileBuffer);

      if (data?.GPSInfo?.GPSLatitude && data?.GPSInfo?.GPSLongitude) {
        const { GPSLatitude, GPSLongitude } = data.GPSInfo;
        const location = {
          latitude: GPSLatitude[0] + GPSLatitude[1] / 60 + GPSLatitude[2] / 3600,
          longitude: GPSLongitude[0] + GPSLongitude[1] / 60 + GPSLongitude[2] / 3600,
        };
        return res.status(200).json({ location });
      }

      return res.status(404).json({ error: 'No GPS data found in the image' });
    } catch (error) {
      console.error("Error processing file:", error);
      return res.status(500).json({ error: "Error processing the file" });
    }
  });
}

// Location data: { latitude: 9.928563972222221, longitude: 76.30360697222221 }