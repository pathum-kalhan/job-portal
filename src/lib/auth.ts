import bcrypt from "bcryptjs";

function generateString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password: string, hashed: string) {
  const com = await bcrypt.compare(password, hashed);
  return com;
}

export async function verifyToken() {
  const verificationToken = generateString(16);
  const verificationTokenTimeStamp = new Date().getTime();
  return { verificationToken, verificationTokenTimeStamp };
}

export async function randomString(rnd: number) {
  const randomString = generateString(rnd);
  return randomString;
}