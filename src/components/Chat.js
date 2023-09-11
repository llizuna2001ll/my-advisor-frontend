import {Grid, IconButton, Stack, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

function Chat(props) {
    const [inputValue, setInputValue] = useState("");
    const username = localStorage.getItem("username");
    const userFrom = props.userFrom;
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [scrolling, setScrolling] = useState(true);


    const token = localStorage.getItem("token");


    function handleScroll() {
        setScrolling(false);
    }


    useEffect(() => {
        if (scrolling) {
            if (!isLoading) {
                const myDiv = document.getElementById('chat-messages');
                myDiv.scrollTop = myDiv.scrollHeight;
            }
        }
    }, [messages])

    useEffect(() => {
        if (!isLoading) {
            const myDiv = document.getElementById('chat-messages');
            myDiv.scrollTop = myDiv.scrollHeight;
        }
    }, [messages])

    useEffect(() => {
        if (userFrom) {
            fetch(  
                "http://localhost:8888/api/v1/conversations/messages/" +
                username +
                "/" +
                userFrom,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    setMessages(data);
                })
                .catch((error) => console.error(error))
                .finally(() => setIsLoading(false));
        }
    }, [messages, userFrom]);

    let allMessages = messages.map((message) => {
        if (message.sender === username) {
            return (
                <div className="forPosition mb-2">
                    <div className="user-message " key={message.messageId}>
                        <p>{message.message}</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="forPosition-userFrom mb-2">
                    <div className="userFrom-message " key={message.messageId}>
                        <p>{message.message}</p>
                    </div>
                </div>
            );
        }

    });

    function refreshChat() {
        fetch(
            "http://localhost:8888/api/v1/conversations/messages/" +
            username +
            "/" +
            userFrom,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setMessages(data);
            })
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    }

    function sendMessage() {
        if (inputValue !== "") {
            const url =
                "http://localhost:8888/api/v1/conversations/addMessage/" +
                username +
                "/" +
                userFrom;
            let message = inputValue;
            let sender = username;
            const data = {sender, message};
            axios
                .post(url, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    setInputValue('');
                    axios.post('http://localhost:8888/api/v1/conversations/unreadMessage/' + props.conversationId, null, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    })
                        .then((response) => {
                        })
                        .catch(error => console.error(error))
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => refreshChat());
        }
    }


    return (

        <div className="chat-container" onScroll={handleScroll}>
            <Stack>
                <div className="chat-header">
                    <Grid container>
                        <img
                            className="me-4 mt-2 rounded-circle"
                            src={`https://myadvisorbucket.s3.eu-north-1.amazonaws.com/${props.userFromImg}`}
                            width="70"
                            height="70"
                        />
                        <h2 className="profile-chat-name">{userFrom}</h2>
                    </Grid>
                </div>
                {isLoading ? (<h2>Now Loading</h2>
                    )
                    : (
                        <Stack className="chat-messages" id="chat-messages">{allMessages}</Stack>
                    )}
                <Grid container className="send-container">
                    <div className="input-form">
                        <TextField
                            fullWidth
                            label="message"
                            variant="filled"
                            type="text"
                            value={inputValue}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    sendMessage();
                                }
                            }}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="message-input"
                            placeholder="Type a message..."
                        />
                        <IconButton
                            onClick={() => sendMessage()}
                            className="ms-1"
                            color="primary"
                            aria-label="add to shopping cart"
                        >
                            <SendIcon/>
                        </IconButton>
                    </div>
                </Grid>
            </Stack>
        </div>
    );
}

export default Chat;