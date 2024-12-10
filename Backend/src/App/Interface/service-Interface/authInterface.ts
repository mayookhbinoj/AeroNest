import { AuthServiceReturn } from "../../../Frameworks/service/authService";

export const authServiceInterface=(service:AuthServiceReturn)=>{
    const genertateOtp=()=> service.genertateOtp()
    

    return{
        genertateOtp
    }
}

export type AuthServiceInterface=typeof authServiceInterface