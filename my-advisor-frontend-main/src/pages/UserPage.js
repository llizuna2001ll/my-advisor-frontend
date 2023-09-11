import {useParams} from "react-router-dom";
import Navigation from "../components/Navigation";
import CoverComponent from "../components/CoverComponent";
import UserCard from "../components/UserCard";

function UserPage() {
    const token = localStorage.getItem('token');
    let {user} = useParams();
    return(
      <>
          <Navigation/>
          <UserCard/>
      </>
    );
}

export default UserPage;