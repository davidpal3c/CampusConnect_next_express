// // Example using AWS S3 (adjust for your storage solution)
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// const s3Client = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

// export async function uploadFileToStorage(
//   fileBuffer: Buffer,
//   fileName: string,
//   contentType: string
// ): Promise<string> {
//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET_NAME!,
//     Key: fileName,
//     Body: fileBuffer,
//     ContentType: contentType,
//     ACL: 'public-read', // Adjust permissions as needed
//   };

//   try {
//     await s3Client.send(new PutObjectCommand(params));
//     return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
//   } catch (error) {
//     console.error('Error uploading to S3:', error);
//     throw error;
//   }
// }




// handler logic

// import { NextApiRequest, NextApiResponse } from 'next';
// import formidable from 'formidable';
// import fs from 'fs';
// import { v4 as uuidv4 } from 'uuid';
// import { uploadFileToStorage } from '@/lib/storage'; // You'll need to implement this

// export const config = {
//   api: {
//     bodyParser: false, // Disable default bodyParser to handle FormData
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     // Parse the form data
//     const form = formidable({});
//     const [fields, files] = await form.parse(req);

//     const file = files.image?.[0];
//     if (!file) {
//       return res.status(400).json({ message: 'No image file provided' });
//     }

//     // Upload to your storage solution (S3, Cloudinary, etc.)
//     const fileBuffer = fs.readFileSync(file.filepath);
//     const fileName = `${uuidv4()}-${file.originalFilename}`;
//     const fileUrl = await uploadFileToStorage(fileBuffer, fileName, file.mimetype);

//     // Clean up the temporary file
//     fs.unlinkSync(file.filepath);

//     return res.status(200).json({ url: fileUrl });
//   } catch (error) {
//     console.error('Upload error:', error);
//     return res.status(500).json({ message: 'Error uploading image', error: error.message });
//   }
// }