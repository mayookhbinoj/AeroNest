import React from 'react'
import { Provider } from 'react-redux'
import  Router from "./routes/Router"
import  store,{persistor} from "./Store/Configure.ts"
import {PersistGate} from "redux-persist/integration/react"
import toast, { Toaster } from "react-hot-toast";

const App:React.FC = () => {
  return (
    <div>
         <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Toaster  position="top-right"  />
         <Router />
         </PersistGate>
         </Provider>
     
      
    </div>
  )
}
export default App