import {airlinRegister} from "../../../.././Types/Airlineinterface"
import { airDbInterface} from "../../../Interface/airlineDbRespository"
export const airlinRegistere=async(data:airlinRegister,repository:ReturnType<airDbInterface>)=>{
    try {
    const result=(await repository).addAirline(data)
    return result
    } catch (error) {
        console.log("error",error)
    }
}

export const  airlineLogin=async(email:string,repository:ReturnType<airDbInterface>)=>{
    try {
        const result=(await repository).getEmail(email)
        return result
    } catch (error) {
        console.log(error)
    }
}

export const addFlight=async(data:any,repository:ReturnType<airDbInterface>)=>{
    try {
        const trip=(await repository).addTrip(data)
        return trip

    } catch (error) {
        console.log(error)
    }
}

export const getAllTrips=async(id:any,repository:ReturnType<airDbInterface>)=>{
    try {
        const resolvedRepository = await repository; 
        const trips = await resolvedRepository.getTrip(id); 
       
         return trips; 

      
    } catch (error) {
        console.log(error)
    }
}