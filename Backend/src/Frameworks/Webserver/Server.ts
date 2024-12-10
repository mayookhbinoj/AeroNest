import {Server} from "http"
import configKeys from "../../Utils/Config"

const serverConfig=(server:Server)=>{
    return server.listen(configKeys.Port,()=>{
        console.log("running in 4001")
    })
}
export default serverConfig