import bcrypt from "bcryptjs";
export const passwordHash = (str: string) =>
	bcrypt.hashSync(str, bcrypt.genSaltSync(10));

export const decryptHash = async (hashed: string, plain: string) =>
	await bcrypt.compareSync(plain, hashed);
