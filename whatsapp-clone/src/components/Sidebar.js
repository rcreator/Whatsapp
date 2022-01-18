import React from 'react'
import "../style/Sidebar.css"
import { Avatar, IconButton} from "@material-ui/core"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import SearchOutlined from "@material-ui/icons/SearchOutlined"
import SidebarChat from './SidebarChat'


function Sidebar() 
{
    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Avatar src='/images/1.jpg'/>
                <div className='sidebar__headerRight'>
                <IconButton>
                    <DonutLargeIcon />
                </IconButton> 
                <IconButton>
                    <ChatIcon />
                </IconButton> 
                <IconButton>
                    <MoreVertIcon />
                </IconButton>   
                </div>
            </div>
            <div className='sidebar__search'>
                <div className='sidebar__serachContainer'>
                        <SearchOutlined />
                        <input 
                        placeholder='Serach for start new chat'
                        type="text"/>
                </div>
            </div>
            <div className='sidebar__chats'>
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />

            </div>
        </div>
    )
}

export default Sidebar
