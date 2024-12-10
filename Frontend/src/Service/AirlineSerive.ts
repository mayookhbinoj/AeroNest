import axios from "axios"
import apiserviceMethood from "./apiService"



const API_URL='http://localhost:4001/api/airline'

const airlineService=axios.create({
    baseURL:API_URL,
    headers:{
          "Content-Type":"application/json"
    }
})

const airlineServiceMehood={
    register:(url:string,data:{[key:string]:string|number})=>{ return airlineService.post(url,data)},
    login:(url:string,email:any)=> { return airlineService.post(url,email)},
    trip:(url:string,data:{[key:string]:string|number})=>{return airlineService.post(url,data)},
    getTrips: (url: string,)=> {return airlineService.get(url)}
}
    
export default airlineServiceMehood