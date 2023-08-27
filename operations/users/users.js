import { signJWT } from "../../middleware/jwt/sign"

export const getUsers = async (req, res) => {
    // get email from headers 
    
    const token = await signJWT()
}