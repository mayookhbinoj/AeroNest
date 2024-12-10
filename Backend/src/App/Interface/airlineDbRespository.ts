import {airlineRepositoryMongoType}  from "../../Frameworks/Database/Repositories/airlineRepository"
import {airlinRegister} from "../../Types/Airlineinterface"

export const airlineDbReposirtory=async(repository:ReturnType<airlineRepositoryMongoType>)=>{
    
    const addAirline=async(data:airlinRegister)=>await repository.addAirlineDetails(data)
    const getEmail=async(email:string)=> await repository.login(email)
    const addTrip=async(data:any)=>await repository.addTrips(data)
    const getTrip = async (id: any) => {
        const result = await repository.getTrips(id);
        return result; 
      };
    return {
        addAirline,
        getEmail,
        addTrip,
        getTrip
    }
}

export type airDbInterface=typeof airlineDbReposirtory