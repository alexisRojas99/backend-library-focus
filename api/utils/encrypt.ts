import bcryptjs from 'bcryptjs';

const encrypt = async (password: string) => {
  const salt = await bcryptjs.genSalt();

  const cryptData = await bcryptjs.hash(password, salt);

  return cryptData;
};

export default encrypt;
