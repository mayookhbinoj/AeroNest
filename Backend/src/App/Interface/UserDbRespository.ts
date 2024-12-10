import { userEntityType } from "../../Entities/UserEntity"
import {userRepositoryMongodbType} from "../../Frameworks/Database/Repositories/UserRepository"

export const userDbRepository=(repository:ReturnType<userRepositoryMongodbType>)=>{

        const addUser=async(user:userEntityType)=>await repository.addUser(user)
        const getEmail=async(email:string)=>await repository.getEmail(email)
        const addotp=async(otp:string,id:string)=> await repository.addOtp(otp,id)
        const getOtp=async(data:string)=>await repository.OtpCheck(data)
        const verifyUser=async(data:any)=>await repository.verifyuser(data)
        const addGoogle=async(user:userEntityType)=>await repository.addGoog(user)
        const addUpdateProfile=async(user:any)=>await repository.prUpdate(user)
        const contactEdit=async(user:any)=> await repository.cntUpdate(user)
        const editPassport=async(user:any)=>await repository.updatePassport(user)
        

        

        return{
            addUser,
            getEmail,
            addotp,
            getOtp,
            verifyUser,
            addGoogle,
            addUpdateProfile,
            contactEdit,
            editPassport
        }
  
}

export type userDbInterface=typeof userDbRepository