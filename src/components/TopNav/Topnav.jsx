import React from "react";

import "./topnav.css";

import { Link } from "react-router-dom";

import Dropdown from "../Dropdown/Dropdown";

import user_image from "../../assets/images/my.jpg";

import user_menu from "../../assets/JsonData/user_menus.json";

import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

const Topnav = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const curr_user = {
    display_name: `${currentUser ? currentUser.email : null}`,
    image: user_image,
  };

  const renderUserToggle = (user) => (
    <div className="topnav__right-user">
      <div className="topnav__right-user__image">
        <img src={user.image} alt="" />
      </div>
      <div className="topnav__right-user__name">{user.display_name}</div>
    </div>
  );

  const renderUserMenu = (item, index) => (
    <Link to="/" key={index}>
      <div
        className="notification-item"
        onClick={async () => {
          console.log(item.content);
          if (item.content === "Logout") {
            await logout();
            history.push("/login");
          }
        }}
      >
        <i className={item.icon}></i>
        <span>{item.content}</span>
      </div>
    </Link>
  );

  return (
    <div className="topnav">
      <div className="topnav__search"></div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          {/* dropdown here */}
          <Dropdown
            customToggle={() => renderUserToggle(curr_user)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
