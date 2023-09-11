import {Grid, Rating, Stack, Tooltip} from "@mui/material";
import "../css/user-messages.css";
import {Link} from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import {useEffect, useState} from "react";
import Chat from "./Chat";
import axios from "axios";

function UserMessages() {

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [userFrom, setUserFrom] = useState('');
    const [conversationId, setConversationId] = useState('');


    useEffect(() => {
        fetch('http://localhost:8888/api/v1/conversations/' + username, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                setConversations(data);
            })
            .catch(error => console.error(error))
    }, [conversations]);

    function sendToChat(messages, userFrom, conversationId) {

        const elements = document.getElementsByClassName('conversation-peek');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('focused');
        }
        document.getElementById(conversationId).classList.add("focused");
        axios.post('http://localhost:8888/api/v1/conversations/unreadMessage/' + conversationId,null, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                setMessages(messages);
                setUserFrom(userFrom);
                setConversationId(conversationId);
            })
            .catch(error => console.error(error))
    }


    const allConversations = conversations.map((conversation) =>
        <div key={conversation.conversationId}
             onClick={() => sendToChat(conversation.messages, conversation.userFrom, conversation.conversationId)}
             className="conversation-peek" id={conversation.conversationId}>
            <img className="me-4 mt-3 rounded-circle" src="../images/profilePics/izuna-test1.jpg" width="70"
                 height="70"/>
            <Stack className="mt-2">
                <h4>{conversation.userFrom}</h4>
                <p>{conversation.messages[conversation.messages.length - 1].message}</p>
            </Stack>
            {conversation.hasUnreadMessage ? (<PriorityHighIcon className="unread-message"/>
                )
                : null}
        </div>
    );
    return (
        <>

            <div className="conversations-peek-container">
                <Link to="/" style={{textDecoration: "none", color: "white"}}><h2 className="pt-3">My-Advisor</h2>
                </Link>
                <Grid className="position" container>
                    <Link to=""><Tooltip disableFocusListener title="Notifications"><NotificationsIcon
                        className="navitem ms-4" fontSize="medium"/></Tooltip></Link>
                    <Link to="/messages"><Tooltip disableFocusListener title="Messages"><ChatIcon
                        className=" navitem ms-4" fontSize="medium"/></Tooltip></Link>
                    <Link to="/favorites"><Tooltip disableFocusListener title="Favorites"><FavoriteIcon
                        className=" navitem ms-4" fontSize="medium"/></Tooltip></Link>
                    <Link to=""><Tooltip disableFocusListener title="Account"><PersonIcon className=" navitem ms-4"
                                                                                          fontSize="medium"/></Tooltip></Link>
                </Grid>
                <Stack className="mt-4">
                    {allConversations}
                </Stack>
            </div>
            <Chat messages={messages} userFrom={userFrom} conversationId={conversationId}/>
        </>
    );
}

export default UserMessages;