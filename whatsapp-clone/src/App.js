import { useEffect, useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Pusher from "pusher-js"
import axios from './components/axios';

function App() {
const [messages,setMessages] = useState([]);

  useEffect(()=>{
      axios.get("/v1/messages/sync")
      .then(response =>
        {
          setMessages(response.data)
        });
  },[])
  

  
  useEffect(()=>
  {
    var pusher = new Pusher('34c68791b1bf0c13039c', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      setMessages([...messages, newMessage])
    });

    return () =>
    {
      channel.unbind_all();
      channel.unsubscribe();
    }

  },[messages])

  
console.log(messages)

  return (
    <div className="App">
      <div className='app__body'>
      <Sidebar />
      <Chat 
      messages={messages}/>
      </div>
     
    </div>
  );
}

export default App;
