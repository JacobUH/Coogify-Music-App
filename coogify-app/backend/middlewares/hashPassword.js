import bcrypt from 'bcrypt';

export async function hashPassword(jsonData) {
  const { password } = jsonData;
  let modJson = jsonData;
  try {
    modJson.password = await bcrypt.hash(password, 10);
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
  return modJson;
}
