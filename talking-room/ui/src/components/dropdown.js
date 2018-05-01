import React, {Component} from 'react';
import { Menu, Dropdown, Icon } from 'antd/lib';
import 'antd/lib/menu/style/css';
import 'antd/lib/dropdown/style/css';
import 'antd/lib/icon/style/css';


const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
    </Menu.Item>
  </Menu>
);

class DropdownMenu extends Component {
  render() {
    return (
        <Dropdown overlay={menu} >
          <a className="ant-dropdown-link" href="#">
           <Icon type="menu-fold" /> 
           <Icon type="down" />
          </a>
        </Dropdown>
      );
  }
}

export default DropdownMenu;