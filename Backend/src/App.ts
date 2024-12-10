import expres,{Application} from "express"
import http from "http"
import serverConfig from "./Frameworks/Webserver/Server"
import expressconfig from "./Frameworks/Webserver/ExpressConfig"
import connectDB from "../src/Frameworks/Database/Connection"
import route from "../src/Frameworks/Webserver/Routers/Index"


const app:Application=expres()
const server=http.createServer(app)

expressconfig(app)
connectDB()
route(app)
serverConfig(server)