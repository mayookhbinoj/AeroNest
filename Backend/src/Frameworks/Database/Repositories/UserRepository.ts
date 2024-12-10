import User from "../Model/User"
import Otp from "../Model/Otp"
import {userEntityType} from"../../../Entities/UserEntity"
import { create } from "domain"

export const userRepositoryMongodb=()=>{
    const addUser=async(user:userEntityType)=>{
       
        const newUser=new User({
            title:user.title(),
            name:user.name(),
            email:user.email(),
            lastName:user.lastName(),
            phoneNumber:user.phoneNumber(),
            password:user.password()

        
        })
           await newUser.save()
        return newUser
    }
    const getEmail=async(email:string)=>{
      const findEmail=  await User.findOne({email})
      return findEmail
    }
    const addOtp=async(otp:string,id:string)=>{
       const createOtp= await Otp.create({id,otp})
       return createOtp
    }
    const OtpCheck=async(data:any)=>{
        console.log(data.userid)
        const findOtp=await Otp.findOne({otp:data.otp})
        return findOtp
    }
    const verifyuser=async(data:any)=>{
        const {email,password}=data
        const findUser=await User.findOne({email:email})
        if(findUser?.password==password){
            console.log("enter")
            return findUser
        }

    }
    const addGoog=async(user:userEntityType)=>{
        console.log("enter")
        console.log(user.email())
        const findEmail=  await User.findOne({email:user.email()})
        if(findEmail){
           return findEmail
        }else{
            const newUser=new User({
                title:user.title(),
                name:user.name(),
                email:user.email(),
                lastName:user.lastName(),
                phoneNumber:user.phoneNumber(),
                password:user.password()
            
            })
               await newUser.save()
               return newUser

        }


    }
    const prUpdate=async(user:any)=>{
        
        const Update=await User.findByIdAndUpdate({_id:user._id},{name:user.name,title:user.title,lastName:user.lastName},{new:true})
        console.log(Update)
        return Update
        
    }
    const cntUpdate=async(user:any)=>{
        
          const update=await  User.findByIdAndUpdate({_id:user._id},{email:user.email,phoneNumber:user.phoneNumber},{new:true})
          console.log(update)
          return update
    }
    const updatePassport=async(user:any)=>{
        const findUser=await User.findOne({_id:user._id})
        if(findUser){
    
            if(findUser.passportDetails){
              findUser.passportDetails={
                passportNumber:user.passportNumber,
                nationality:user.nationality,
                dateOfIssue:user.dateOfIssue,
                dateOfExpiry:user.dateOfExpiry

              }
              const updateUser=await findUser.save()
    
              return updateUser
            }
         
        }
    }
    
    return{
        addUser,
        getEmail,
        addOtp,
        OtpCheck,
        verifyuser,
        addGoog,
        prUpdate,
        cntUpdate,
        updatePassport
    }

}

export type userRepositoryMongodbType=typeof userRepositoryMongodb