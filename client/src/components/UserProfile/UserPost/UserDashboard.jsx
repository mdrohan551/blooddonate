import React, {useEffect} from 'react';
import UserStore from "../../../store/UsersStore.js";
import SideBar from "../SideBar.jsx";
import CreatePost from "../CreatePost.jsx";
import PostRead from "./PostRead.jsx";

const UserDashboard = () => {
   return (
       <h1 className="d-flex justify-content-center">User Dashboard</h1>
   )
};

export default UserDashboard;