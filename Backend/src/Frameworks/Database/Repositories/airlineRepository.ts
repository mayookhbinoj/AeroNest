import Airline from "../Model/Airline"
import Trip from "../Model/Trip"

export const airlineRepositoryMongo=()=>{
    const addAirlineDetails=async(data:any)=>{
        const  saveAirline=await Airline.create(data)
        console.log("save",saveAirline)
        return saveAirline
    }
    const login=async(email:string)=>{
        
       const newAirline:any=await Airline.findOne({email:email})
       console.log(newAirline)
       if(!newAirline){
        throw new Error("Email not found")
       }
       return newAirline
    }

    const addTrips=async(data:any)=>{
        console.log("enter in to the last")
        const {flight,flightNumber,aircraftType,startDate,reachDate,from,to,EconomySeat,EconomyPrice,BusinessSeat,BusinessPrice}=data
       console.log(flight)
       const saveTrip= new Trip({
        flightNumber,
        flight,
        aircraftType,
        from,
        to,
        startDate,
        reachDate,
        classes: {
            economy: {
                totalSeats: EconomySeat,
                economyPrice:EconomyPrice
            },
            business: {
                totalSeats: BusinessSeat,
                BusinessPrice:BusinessPrice
                
            },
        },
       })
       await saveTrip.save()
       console.log("savetrip",saveTrip)
       return saveTrip
    }
    const getTrips=async(_id:any)=>{
        console.log("enter in to the last",)
        const {id}=_id
        const trips=await Trip.find({flight:id,isVerified:true})
        return trips
    }
    return{
        addAirlineDetails,
        login,
        addTrips,
        getTrips
    }
}

export type airlineRepositoryMongoType=typeof airlineRepositoryMongo