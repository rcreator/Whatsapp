import { Avatar, IconButton } from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import AttachFile from "@material-ui/icons/AttachFile"
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import SendIcon from '@material-ui/icons/Send';
import React, { useState } from 'react'
import "../style/Chat.css";
import axios from './axios';

export default function Chat({messages}) {

    const [input,setInput] = useState("");

    const sendMessage = async (e) =>
    {
         e.preventDefault();

         axios.post("/v1/messages/new",{
             name:"Dipikia",
             message: input,
             timeStamp: "justnow",
             received: true
         })
        setInput('');
    }

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar />
                <div className='chat__headerInfo'>
                    <h3>Name</h3>
                    <p>Last seen</p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className='chat__body'>

                {messages.map((message)=>
                ( <p className={`chat__message ${message.received ? 'chat__receiver' : '' }`} >
                    <span className='chat__name'>{message.name}</span>
                    {message.message}
                    <span className='chat__timestamp'>
                        {message.timeStamp}
                    </span>
                </p>
                ))}
            
            </div>

            <div className='chat__footer'>
                <InsertEmoticonIcon />
                <form>
                    <input  
                    placeholder='Type a message' 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)} />
                    <button 
                    type='submit'
                    onClick={sendMessage}
                    >
                        <SendIcon />
                    </button>
                </form>
            </div>
        </div>
    )
}
