export interface userInterface{
    title:string,
    name:string,
    lastName:string,
    email:string,
    phoneNumber:string,
    password:string
}
export interface profileUpdater{
    title:string,
    name:string,
    lastName:string,
    _id:string
}
export interface contactEditor{
    email:string
    phoneNumber:string,
    _id:string
}
export interface passportEditor{
    _id: string
    passportNumber:string,
    nationality: string,
    dateOfIssue: string,
    dateOfExpiry: string

}