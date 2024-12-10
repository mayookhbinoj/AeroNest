    import {Request,Response,NextFunction} from "express"
    import { userRegister,VerifyOtp,verifyLogin,googleRegister,profileUpdate,contactEditer,passportEdit } from "../App/User/Auth/Read&Update/userAuth"
    import { userDbInterface } from "../App/Interface/UserDbRespository"
    import { userRepositoryMongodbType } from "../Frameworks/Database/Repositories/UserRepository"
    import  {AuthServiceInterface} from "../App/Interface/service-Interface/authInterface"
    import {AuthService} from "../Frameworks/service/authService"

  

    const userController=(
        userDbRepository:userDbInterface,
        userReposityImpl:userRepositoryMongodbType,
        authServiceInterface:AuthServiceInterface,
        AuthServiceImpl:AuthService
    )=>{
        const dbRepositoryUser = userDbRepository(userReposityImpl())
        const authservice=authServiceInterface(AuthServiceImpl())
        const register=async(req:Request,res:Response,next:NextFunction)=>{
            try {
                console.log("enter")
                console.log(req.body)
                const user=req.body
                const newUser=await userRegister(user,dbRepositoryUser,authservice)
                res.json({newUser,message:"sucess user register"})
                
            } catch (error:any) {
                console.log(error.message)
                if(error.message==="Email Already Exists"){
                    res.status(400).json({message:"Email Already Exists"})
                }
                
            }
        }
        const verifyOtp=async(req:Request,res:Response)=>{
            try {
                const data=req.body
                console.log(data)
                const checkOtp= await VerifyOtp(data,dbRepositoryUser)
                 res.json({checkOtp:"otp is valid"})
              
            } catch (error:any) {
                console.log("enter")
                console.log(error)
                if(error.message=="Wrong OTP"){
                    res.status(400).json({message:"wrong OTP"})
                    
                }
                
            }
        }
        const login=async(req:Request,res:Response)=>{
            try {
              const user=req.body
              const newUser=await verifyLogin(user,dbRepositoryUser)
              console.log(newUser,"verify")
              res.status(200).json({newUser,message:"login sucessfull"})
            } catch (error:any) {
                if(error.message==="Email Password is incorrect"){
                    res.status(400).json({message:"Email Password is incorrect"})
                }
                
            }
        }

     
        const googleLogin=async(req:Request,res:Response)=>{

            try {
             const {email,firstName,lastName}=req.body._tokenResponse
             const user={
                title:"Mr",
                name:firstName,
                lastName:lastName,
                email:email,
                phoneNumber:"123",
                password:"12345"
             }
             const newUser=await googleRegister(user,dbRepositoryUser,authservice)
             res.status(200).json({newUser,message:"suceess google "})
            } catch (error) {

                console.log("error",error)
            }
        }
        const profilUpdate=async(req:Request,res:Response)=>{
            try {
             
             const user=req.body
             const newUser=await profileUpdate(user,dbRepositoryUser,authservice)
             console.log("new user",newUser)
             res.status(200).json({newUser,message:"sucess edited"})
            } catch (error) {
                console.log(error)
                
            }
        }
        const contactEdit=async(req:Request,res:Response)=>{
            try {
                console.log("enter in to contactEdit")
                const user=req.body
                const newUser=await contactEditer(user,dbRepositoryUser,authservice)
                console.log("new user",newUser)
                res.status(200).json({newUser,message:"sucess edit"})
            } catch (error) {
                console.log(error)
            }
        }
        const passport=async(req:Request,res:Response)=>{
            try {
                console.log("enter in to passpoert")
                console.log(req.body)
                const user=req.body
                const newUser=await passportEdit(user,dbRepositoryUser,authservice)
                console.log("new user",newUser)
                res.status(200).json({newUser,message:"sucessful "})
            } catch (error) {
                console.log("passport error",error)
            }
        }

        return{
            register,
            verifyOtp,
            login,
            googleLogin,
            profilUpdate,
            contactEdit,
            passport
        }
    }
    export default userController