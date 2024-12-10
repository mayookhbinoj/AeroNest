import {z} from "zod"

export const userSchema=z.object({
    title:z.string().min(1,"title is required"),
    name:z.string().min(1,"Name is required"),
    lastName:z.string().min(1,"Last Name is required"),
    email:z.string().email("Email is required"),
    phoneNumber:z.string().min(1,"Number is Required"),
    password: z.string().min(8, "Password must be at least 8 characters long").regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
    
    

})
export const loginSchema=z.object({
    email:z.string().email("Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters long").regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character")

})
export const airlineLogine=z.object({
  email:z.string().email("Email is required")
})
export const Step1Schema = z.object({
    airlineName: z.string().nonempty("Airline Name is required"),
    countryRegistration: z.string().nonempty("Country is required"),
    IATA: z.string().length(3, "IATA code must be 3 characters"),
    ICAO: z.string().length(4, "ICAO code must be 4 characters"),
  });
  
  export const Step2Schema = z.object({
    email: z.string().email("Invalid email address"),
    phone: z.string().nonempty("Phone number is required"),
    role: z.string().nonempty("Role is required"),
   adress: z.string().nonempty("Address is required"),
    fax: z.string().nonempty("fax is required")
  });
  

  export const adminSchema=z.object({
    email:z.string().email("Email is required"),
    password:z.string().min(1,"Password is required")
   
  })


export type adminSchema=z.infer<typeof adminSchema>
export type Step1Schema =z.infer<typeof Step1Schema>
export type Step2Schema =z.infer<typeof Step2Schema>
export type userSchema=z.infer<typeof userSchema>
export type loginSchema=z.infer<typeof loginSchema> 
export type airlineLogine=z.infer<typeof airlineLogine>