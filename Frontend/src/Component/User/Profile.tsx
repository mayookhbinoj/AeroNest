import React from 'react'
import Navbar from './Navbar/Navbar';
import Profiler from "./Profileruser/profilerUser"
import ProfilerUpdater from "./Profileruser/ProfileUpdate"

const Profile:React.FC = () => {
  return (
    <div>
      <Navbar/>
      <Profiler/>
      <ProfilerUpdater/>
    </div>
  )
}

export default Profile