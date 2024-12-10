import nodemailer from "nodemailer"
import configKeys from "../../Utils/Config";
const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:configKeys.user_name,
        pass:configKeys.user_password,
    },
});

export default transporter;