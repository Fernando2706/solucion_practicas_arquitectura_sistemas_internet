import * as bcrypt from "bcrypt"

const hashPassword= async (password: string): Promise<string> => {
    const hash = await bcrypt.hash(password)
    return hash
}

const comparePassword = async (hash: string, password:string): Promise<boolean> => {
    return await bcrypt.compare(password, hash)
}

export {
    hashPassword,
    comparePassword
}