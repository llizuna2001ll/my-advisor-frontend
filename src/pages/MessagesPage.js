import UserMessages from "../components/UserMessages";
import {Grid} from "@mui/material";


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