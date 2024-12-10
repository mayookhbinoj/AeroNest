import express,{Application} from "express"
import cors from "cors"
import morgan  from "morgan"

const expressconfig=(app:Application)=>{
    const corsConfig = {
        origin: 'http://127.0.0.1:5173', 
        credentials: true, 
    }
    app.use(cors(corsConfig))
    app.options('*', cors());
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(morgan("dev"))
   
    
   
     
}
export default expressconfig