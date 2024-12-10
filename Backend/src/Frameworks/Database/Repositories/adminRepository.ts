import Admin from "../Model/Admin"
import Airline from "../Model/Airline"
import Trip from "../Model/Trip"


export const adminRepositoryMongo=()=>{

    const loginAdmin=async(data:any)=>{
      try {
        const {email,password}=data
        const findAdmin=await Admin.findOne({email:email})
       
        if(findAdmin){
          if(findAdmin.password==password){
            console.log("find",findAdmin)
            return findAdmin
          }
        }
        
      } catch (error) {
        console.log("error",error)
      }
    }
    const adminGetAirlines=async()=>{
      try {
        const findAdirline= await Airline.find()
         return findAdirline
      } catch (error) {
        console.log(error)
      }
    }
    const getTripsTrips=async(data:any)=>{

     const {id}=data
     const findtrips=await Trip.find({flight:id})
     return findtrips

    }

    const verifytrips=async(id:any)=>{
      try {
        const trips=await Trip.findByIdAndUpdate({_id:id},{isVerified:true},{new:true})
         const findTrips=await Trip.find()
         return findTrips
      } catch (error) {
        
      }
    }
    return {
        loginAdmin,
        adminGetAirlines,
        getTripsTrips,
        verifytrips
    }

}

export type adminRepositoryMongoType=typeof adminRepositoryMongo