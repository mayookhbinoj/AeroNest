import admin from "firebase-admin"
import path from "path"


admin.initializeApp({
    credential:admin.credential.cert(path.resolve(__dirname,"./fir-a7bbd-firebase-adminsdk-tj5zy-7bbf06ec65.json"))
})

export default admin