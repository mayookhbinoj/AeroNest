import {Application} from "express"
import userRoute from "./UserRoute"
import airlineRoute from "./airlineRoute"
import adminRoute from "./AdminRoute"

const routes=(app:Application)=>{
    app.use("/api/user",userRoute())
    app.use("/api/airline",airlineRoute())
    app.use("/api/admin",adminRoute())
}
export default  routes