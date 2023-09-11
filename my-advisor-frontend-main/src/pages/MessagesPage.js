import UserMessages from "../components/UserMessages";
import {Grid} from "@mui/material";
import Chat from "../components/Chat";
import {useState} from "react";

function MessagesPage(props) {

    return (
        <>
            <Grid container>
                <UserMessages/>
            </Grid>
        </>
    );
}

export default MessagesPage;