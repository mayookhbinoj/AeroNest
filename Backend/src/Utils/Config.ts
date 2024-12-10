import dotenv from "dotenv"
dotenv.config()

const configKeys={
   Port:process.env.Port,
   MONGO_Db_URI:process.env.MONGO_URI ?? "",
   user_name:process.env.user_name,
   user_password:process.env.user_password,
   Google_client_id:process.env. Google_clienId,
   Google_secret:process.env.Google_secret 
   
}

export default configKeys