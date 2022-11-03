import React from "react";

import { Link } from "react-router-dom";

import "./sidebar.css";

import logo from "../../assets/images/logo.jpg";
import sidebar_items from "../../assets/JsonData/sidebar_routes.json";
import Iconify from "../iconify/Iconify";

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <Iconify icon={props.icon} width={25} height={25} />
        <span style={{ margin: 10, paddingTop: 3 }}>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  const activeItem = sidebar_items.findIndex(
    (item) => item.route === props.location.pathname
  );

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="company logo" />
      </div>
      {sidebar_items.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={index === activeItem}
          />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
