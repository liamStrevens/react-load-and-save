import { Menu } from 'antd';
import React from 'react';
import { Layout } from 'antd';
import { Link } from "react-router-dom";
import {Logo} from './Logo'
const { Header} = Layout;
const setMenuItemOnLoad = () => {
  const url_string = window.location.href
  const last = url_string.substring(url_string.lastIndexOf("/") + 1, url_string.length);
  return last === 'search' ? '2' : last === 'error' ? '3' : '1'
}

class AppMenu extends React.Component {
  state = {
    current: setMenuItemOnLoad()
  }

  handleClick = (e) => {
    console.log(setMenuItemOnLoad());
    console.log(process.env.PUBLIC_URL);

    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Header>
      <Logo />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[this.state.current]}
        style={{ lineHeight: '64px', padding: "0 50px"}}
      >
        <Menu.Item key="1" onClick={this.handleClick}><Link to="/alldata"/>All Data</Menu.Item>
        <Menu.Item key="2" onClick={this.handleClick}><Link to="/search"/>Search</Menu.Item>
        <Menu.Item key="3" onClick={this.handleClick}><Link to="/error"/>Error</Menu.Item>
        
      </Menu>
      
    </Header>

    );
  }
}

export default AppMenu