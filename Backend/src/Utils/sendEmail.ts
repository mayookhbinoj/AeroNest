import transporter from "../Frameworks/service/mailService";

const sentEmail= async(email:string,content:string)=>{
    try {
        const info = await transporter.sendMail({
            from: '"AeroNest" <mayookhbinoj77@gmail.com>',
            to: email,
            subject: "  OTP ",
            html: `${content}`,
            
        });
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.log("error send",error)
    }
}
export default sentEmail