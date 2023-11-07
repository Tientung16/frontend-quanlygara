import React from "react";
import "./header.css";
import { Avatar, Popover } from "antd";
// import classNames from "classnames";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import UserDropdown from "./userDropDown";
const Header = () => {
    const handleLogout = () => {

    }
    return(
    // <header className = 'wrapper' >
    <header style={{height:"50px"}}>
        <div
      style={{ display: 'flex', justifyContent: 'end', marginRight: '15px' }}
    >
      <Popover
        placement="bottomRight"
        content={<UserDropdown />}
        trigger="click"
        // style={{marginTop:"10px"}}
      >
        <div style={{ cursor: 'pointer' ,marginTop:"10px"}}>
        {/* <span>Xin chào, {user?.info?.name}</span> */}
        <span>Xin chào Đức</span>
          <Avatar
            style={{ marginLeft: '5px' }}
            shape="circle"
            icon={<UserOutlined />}
          />
        </div>
      </Popover>
    </div>
    </header>
    // </header>
    )
}
export default Header;