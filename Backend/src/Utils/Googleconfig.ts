import {google} from "googleapis"
import configKeys from "../Utils/Config";

exports.oath2ClientId=new google.auth.OAuth2(
    configKeys.Google_client_id,
    configKeys.Google_secret,
    "postmessage"
)