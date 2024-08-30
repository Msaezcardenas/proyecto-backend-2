import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from 'bcrypt';


export const createHash = (pass) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10)); // $salt.hash

export const isValidPassword = (user, pass) => bcrypt.compareSync(pass,user.password) // user.password -> es la contraseña de la bbdd

const __filename = fileURLToPath(import.meta.url)

export const __dirname = dirname(__filename)
