import { adminRepositoryMongoType } from "../../Frameworks/Database/Repositories/adminRepository"



export const adminDbRepository=async(repository:ReturnType<adminRepositoryMongoType>)=>{

    const adminLog=async(data:any)=>await repository.loginAdmin(data)
     const adminGetAirline=async()=>await repository.adminGetAirlines()
     const loadTrips=async(data:any)=>await repository.getTripsTrips(data)
     const verifytrip=async(id:any)=>await repository.verifytrips(id)
    return {
        adminLog,
        adminGetAirline,
        loadTrips,
        verifytrip
    }

}

export type adminInterface=typeof adminDbRepository