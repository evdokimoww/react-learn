import React from "react";
import s from "./Sidebar.module.css";
import Navbar from "./Navbar/Navbar";
import FriendsContainer from "./Friends/FriendsContainer";

const Sidebar = (props) => {
debugger
    return (
        <div className={s.sidebar}>
            <Navbar />
            <FriendsContainer />
        </div>
    );
}

export default Sidebar;