import axios from 'axios';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface ErrorResponse {
  error: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<LoginResponse | ErrorResponse | string>) {
  if (req.method === 'POST') {
    const { email, password }: LoginRequestBody = req.body;

    try {
      const response = await axios.post('http://localhost:8080/login', { email, password });
      
      // Generate JWT token
      const token = jwt.sign({ email }, 'your_secret_key', { expiresIn: '1d' });
      res.status(200).json({ token });
    } catch (err) {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}