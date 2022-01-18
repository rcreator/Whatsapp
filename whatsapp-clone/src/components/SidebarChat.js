import { Avatar } from '@material-ui/core'
import React from 'react'
import "../style/SidebarChat.css"

function SidebarChat() {
    return (
        <div className='SidebarChat'>
           <Avatar />
           <div className='sidebarChat_info'>
               <h2>Name</h2>
               <p>Last chat </p>
           </div>
        </div>
    )
}

export default SidebarChat
