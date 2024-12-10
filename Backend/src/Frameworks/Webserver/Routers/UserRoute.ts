import express from "express"
import passport from "passport"
import userController from "../../../Adapters/UserController"
import { userRepositoryMongodb } from "../../Database/Repositories/UserRepository"
import { userDbRepository } from "../../../App/Interface/UserDbRespository"
import {authService} from "../../../Frameworks/service/authService"
import {authServiceInterface} from "../../../App/Interface/service-Interface/authInterface"

const userRoute =()=>{
    const router=express.Router()

    const controller=userController(userDbRepository,userRepositoryMongodb,authServiceInterface,authService)

    router.post("/register",controller.register)
    router.post("/verifyOtp",controller.verifyOtp)
    router.post("/login",controller.login)

    //google
    router.post("/googleLogin",controller.googleLogin)

    //profileUpdate
    router.post("/ProfileUpdate",controller.profilUpdate)
    router.post("/contactEdit",controller.contactEdit)
    router.post("/passportEdit",controller.passport)
   

    return router
}


export default userRoute
