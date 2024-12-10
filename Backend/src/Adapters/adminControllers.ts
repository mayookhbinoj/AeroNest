import {Request,Response,NextFunction} from "express"
import { adminLogins,adminairlines,tripfind,tripVerify } from "../App/User/Auth/Read&Update/adminAuth"
import { adminInterface } from "../App/Interface/AdminDbRepository"
import { adminRepositoryMongoType } from "../Frameworks/Database/Repositories/adminRepository"
import { isConditionalExpression } from "typescript"


const adminControllers=(adminDbRepository:adminInterface,adminReposityImpl:adminRepositoryMongoType)=>{

   const dbRepositoryAdmin=adminDbRepository(adminReposityImpl())
    const adminLogin=async(req:Request,res:Response)=>{
        try {
            console.log("enter int to the adminLogin",req.body)
            const admin=req.body
            const newAdmin=await adminLogins(admin,dbRepositoryAdmin)
            console.log(newAdmin)
            res.status(200).json({newAdmin,message:"suceesfull"})
        } catch (error) {
            console.log(error)
        }
        
    }

    const getAirlines=async(req:Request,res:Response)=>{
        try {
            const airlines=await adminairlines(dbRepositoryAdmin)
            res.status(200).json({airlines})
        } catch (error) {
            console.log(error)
        }
    }
    const getTrips=async(req:Request,res:Response)=>{
        try {
           const id=req.query
           const trips=await tripfind(id,dbRepositoryAdmin)
           res.status(200).json({trips})
        } catch (error) {
            console.log(error)
        }
    }

    const verifyTrip=async(req:Request,res:Response)=>{
        try {
            const {id}=req.query
            const trips=await tripVerify(id,dbRepositoryAdmin)
            res.status(200).json({trips})
        } catch (error) {
            
        }
    }
    return{
        adminLogin,
        getAirlines,
        getTrips,
        verifyTrip
    }

}

export default adminControllers