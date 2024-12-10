export default function userEntity(title:string,name:string,email:string,lastName:string,phoneNumber:string,password:string){
    return {
        title:():string => title,
        name:():string=>name,
        lastName:():string=>lastName,
        email:():string=>email,
        phoneNumber:():string=>phoneNumber,
        password:():string=>password
    }
       
}

// export   function profilEntity(title:string,name:string,lastName:string){
//     return {
//         title:():string=>title,
//         name:():string=>name,
//         lastName:():string=>lastName

//     }
// }
// export type profileUpdateEntity=ReturnType<typeof profilEntity>
export type userEntityType=ReturnType< typeof userEntity>