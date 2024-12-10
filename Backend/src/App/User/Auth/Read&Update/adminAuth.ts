import { adminInterface } from "../../../Interface/AdminDbRepository"


export const adminLogins=async(data:any,repository:ReturnType<adminInterface>)=>{
    try {
        console.log("enter in to the second portion s",data)
        const newAdmin=(await repository).adminLog(data)
        return newAdmin
    } catch (error) {
        console.log(error)
    }
}

export const adminairlines=async(repository:ReturnType<adminInterface>)=>{
    try {
        const getAirlines=await repository
        const newFlights=await getAirlines.adminGetAirline()
         console.log("new flights",newFlights)
        return newFlights
    } catch (error) {
        
    }
}

export const tripfind=async(id:any,repository:ReturnType<adminInterface>)=>{
    try {
        const gettrips=await repository
        const loadtrips=await gettrips.loadTrips(id)
        return loadtrips
    } catch (error) {
        console.log(error)
    }
}

export const tripVerify=async(id:any,repository:ReturnType<adminInterface>)=>{
    try {
        const verify= (await repository).verifytrip(id)
        return verify
    } catch (error) {
        console.log(error)
    }
}