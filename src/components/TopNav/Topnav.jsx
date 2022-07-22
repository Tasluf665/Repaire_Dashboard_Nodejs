import React from "react";

import "./topnav.css";
import user_image from "../../assets/images/my.jpg";
import { useAuth } from "../../context/AuthContext";

const Topnav = () => {
  const { currentUser } = useAuth();

  const curr_user = {
    display_name: `${currentUser ? currentUser.email : null}`,
    image: user_image,
  };

  return (
    <div className="topnav">
      <div className="topnav__search"></div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          <div className="topnav__right-user">
            <div className="topnav__right-user__image">
              <img src={curr_user.image} alt="" />
            </div>
            <div className="topnav__right-user__name">
              {curr_user.display_name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topnav;
