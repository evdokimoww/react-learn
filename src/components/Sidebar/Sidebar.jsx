import React from "react";
import s from "./Sidebar.module.css";
import Friends from "./Friends/Friends";
import Navbar from "./Navbar/Navbar";

const Sidebar = (props) => {

    return (
        <div className={s.sidebar}>
            <Navbar />
            <Friends state={props.state}/>
        </div>
    );
}

export default Sidebar;