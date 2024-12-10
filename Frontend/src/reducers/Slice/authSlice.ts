    import {createSlice,PayloadAction} from "@reduxjs/toolkit"
    import {userInterface} from "../../types/userInterface"
    import {registerUser,verifyOtp,login,googleLogin,logOut,profileEdit,contactEdit,passportEdit} from "../../actions/apiAction"
import { json } from "stream/consumers"
import { stat } from "fs"
import { act } from "react"

    interface userState{
        user?: userInterface |null,
        isError:boolean,
        isLoading:boolean,
        isOtp:boolean
        isSucess:boolean,
        message:string
    }
    let parsedUser: userInterface | null = null;

    const userFromStorage: string | null = localStorage.getItem("user");

    if (userFromStorage) {
        try {
            parsedUser = JSON.parse(userFromStorage);
        } catch (error:any) {
            console.error("Failed to parse user from storage:", error);
            parsedUser = null
        }
    }


    const initialState : userState={
        user:parsedUser,
        isError:false,
        isOtp:false,
        isLoading:false,
        isSucess:false,
        message:""
    }
    const useSlice=createSlice({
        name:"auth",
        initialState,
        reducers:{
            reset:(state)=>{
                state.isError=false
                state.isLoading=false
                state.isSucess=false
                state.message=""
                state.user=null
            },
            
            
        },
        
        extraReducers:(builder)=>{
            builder
            .addCase(registerUser.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(registerUser.fulfilled,(state:userState,action:PayloadAction<userInterface>)=>{
            if(action.payload){
                console.log("enter")
                state.isSucess=true
                state.isLoading=false
                state.user=action.payload
                state.message=""
            }

            })
            .addCase(registerUser.rejected,(state,action:any)=>{
                console.log("action payload",state,action.payload)
                state.isError=true
                state.message=action.payload
            })
            .addCase(verifyOtp.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(verifyOtp.fulfilled,(state,action :PayloadAction<any>)=>{
                state.isLoading=false
                state.isOtp=true
                state.message=""
            
            })
            .addCase(verifyOtp.rejected,(state,action:PayloadAction<any>)=>{
                state.isSucess=false
                state.isOtp=false
                state.isError=true
                state.message=action.payload
                console.log("reject",action.payload)
            })
            .addCase(login.pending,(state)=>{
                state.isLoading=true

            })
            .addCase(login.fulfilled,(state,action)=>{
                console.log("action",action.payload)
                state.isSucess=true
                state.isLoading=false
                state.user=action.payload
            })
            .addCase(login.rejected,(state,action:PayloadAction<any>)=>{
                state.isSucess=false
                state.message=action.payload||"Email and password Incorrect"
                state.user=null
            })
            .addCase(googleLogin.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(googleLogin.fulfilled,(state,action:PayloadAction<any>)=>{
                state.isLoading=false
                state.isSucess=true
                state.user=action.payload
            
            })
            .addCase(googleLogin.rejected,(state,action:PayloadAction<any>)=>{
                state.isSucess=false
                state.isError=true
                state.message=action.payload

            })
            .addCase(profileEdit.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(profileEdit.fulfilled,(state,action:PayloadAction<any>)=>{
                console.log("enter int sucess edit")
                state.isLoading=false
                state.isSucess=true
                const updateUser=action.payload
                state.user=action.payload
                localStorage.setItem("user",JSON.stringify(updateUser))
            })
            .addCase(contactEdit.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(contactEdit.fulfilled,(state,action:PayloadAction<any>)=>{
                state.isSucess=true
                state.isLoading=false
                state.user=action.payload
                localStorage.setItem("user",JSON.stringify(action.payload))
            })
            .addCase(contactEdit.rejected,(state,action:PayloadAction<any>)=>{
                state.isError=true
                state.message="failed to update contact"
            })
            .addCase(passportEdit.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(passportEdit.fulfilled,(state,action:PayloadAction<any>)=>{
               state.isLoading=true
               state.user=action.payload
               state.isSucess=true
               localStorage.setItem("user",JSON.stringify(action.payload))

            })
            .addCase(passportEdit.rejected,(state,action:PayloadAction<any>)=>{
                    state.isSucess=false
                    state.isError=true
                    state.message=action.payload
            })
            .addCase(logOut.fulfilled,(state)=>{
                state.user=null
                state.isOtp=false
            })
        
        }
    })

    export const  {reset}=useSlice.actions
    export default useSlice.reducer
