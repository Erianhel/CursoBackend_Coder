import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGODB_URL,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD
}