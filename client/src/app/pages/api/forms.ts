import { PrismaClient } from '@prisma/client' //google says I could try const {PrismaClient} = require('@prisma/client') but should run like this too
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { title, questions, author_id } = req.body;

      // Create the form in the database
      const newForm = await prisma.form.create({
        data: {
          title,
          questions,
          //Can add more fields here if I want
        }
      });

      res.status(201).json(newForm);
    } catch (error) {
      console.error('Form creation error:', error);
      res.status(500).json({ 
        error: 'Unable to create form', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}