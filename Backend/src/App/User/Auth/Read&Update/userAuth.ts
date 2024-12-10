import {userInterface,profileUpdater,contactEditor,passportEditor} from "../../../../Types/UserInterface"
import  createUserEntity,{userEntityType} from "../../../../Entities/UserEntity"
import {  userDbInterface, userDbRepository} from "../../../Interface/UserDbRespository"
import {AuthServiceInterface} from "../../../Interface/service-Interface/authInterface"
import sentEmail from "../../../../Utils/sendEmail"
import otpEmail from "../../../../Utils/UseEmail"

export const userRegister=async(user:userInterface,userRpository:ReturnType<userDbInterface>,authService:ReturnType<AuthServiceInterface>)=>{
        const {title,name,lastName,email,phoneNumber,password}=user
        console.log(user)
        const emailExist=await userRpository.getEmail(email)
        if(emailExist){
            throw new Error("Email Already Exists")
        }
        const userEntity:userEntityType=createUserEntity(
            title,
            name,   
            email,
            lastName,
            phoneNumber,
            password
        )
        const getOtp=authService.genertateOtp()
        const createUser=await userRpository.addUser(userEntity)
        const otpAdd=await userRpository.addotp(getOtp,createUser.id)
        sentEmail(createUser.email,otpEmail(getOtp,createUser.name))
        
       
         return createUser
        
}

export const googleRegister=async(user:userInterface,userRpository:ReturnType<userDbInterface>,authService:ReturnType<AuthServiceInterface>)=>{
     
        
                const {title,name,lastName,email,phoneNumber,password}=user
                const userEntity:userEntityType=createUserEntity(
                    title,
                    name,   
                    email,
                    lastName,
                    phoneNumber,
                    password
                )
          const createGoogle=await userRpository.addGoogle(userEntity)
          console.log(createGoogle)
          return createGoogle

}




export const VerifyOtp=async(data:string,UserDbRespository:ReturnType<userDbInterface>)=>{

    const getOtp=await UserDbRespository.getOtp(data)
    if(!getOtp){
        throw new Error("Wrong OTP")
    }
   

}
export const verifyLogin=async(data:any,UserDbRespository:ReturnType<userDbInterface>)=>{
     const verify=await UserDbRespository.verifyUser(data)
    
    if(!verify){
        throw new Error("Email Password is incorrect")
    }
    return verify
}

export const profileUpdate=async(user:profileUpdater,userRpository:ReturnType<userDbInterface>,authService:ReturnType<AuthServiceInterface>)=>{
    try {

        const Proupdate=await userRpository.addUpdateProfile(user)
        console.log(" 2prou",Proupdate)
        return Proupdate
        
    } catch (error) {
        console.log(error)
        
    }
}

export const contactEditer=async(user:contactEditor,userRpository:ReturnType<userDbInterface>,authService:ReturnType<AuthServiceInterface>)=>{
   
   try {
    console.log("enter in to second contactEditor")
    console.log(user)
    const contactEdit=await userRpository.contactEdit(user)
    return contactEdit
   } catch (error) {
    console.log("error",error)
    
   }
   
}
export const passportEdit=async(user:passportEditor,userRpository:ReturnType<userDbInterface>,authService:ReturnType<AuthServiceInterface>)=>{
    try {
        console.log("enter in to the next step",user)
        const passportEdito=await userRpository.editPassport(user)
        return passportEdito
    } catch (error) {
        
    }

}