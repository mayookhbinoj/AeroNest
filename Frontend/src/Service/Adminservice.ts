import axios from "axios"

const API_URL='http://localhost:4001/api/admin'
const airlineService=axios.create({
    baseURL:API_URL,
    headers:{
          "Content-Type":"application/json"
    }
})

const adminServiceMehood={
    login:(url:string,data:{[key:string]:string|number})=>{return  airlineService.post(url,data)},
    getAirlines:(url:string)=>{return airlineService.get(url)},
    getTrips:(url:string)=>{return airlineService.get(url)},
    verifyTrips:(url:string)=>{return airlineService.get(url)}
}
export default adminServiceMehood