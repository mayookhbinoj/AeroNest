

export const authService=()=>{

    const genertateOtp=()=>{
        const otp=Math.floor(100000+Math.random()*90000)
        return otp.toString()
    }
    return {
        genertateOtp    
    }
}

export type AuthService=typeof authService
export type AuthServiceReturn =ReturnType<AuthService>