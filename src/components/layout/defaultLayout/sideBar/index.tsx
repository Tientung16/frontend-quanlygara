import React from 'react';
import "./sideBar.css"
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
// import { LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
const {  Content, Footer, Sider } = Layout;

// const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
//     (icon, index) => {
//       const key = String(index + 1);
  
//       return {
//         key: `sub${key}`,
//         icon: React.createElement(icon),
//         label: `subnav ${key}`,
  
//         children: new Array(4).fill(null).map((_, j) => {
//           const subKey = index * 4 + j + 1;
//           return {
//             key: subKey,
//             label: `option${subKey}`,
//           };
//         }),
//       };
//     },
//   );
  type MenuItem = Required<MenuProps>['items'][number];
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    to?: string,
    icon?: React.ReactNode,
    children?: MenuItem[], 
  ): MenuItem {
    return {
        key,
        icon,
        children,
        path: to,
        label: to ? <Link to={to}>{label}</Link> : label
    } as MenuItem;
  }
  const items: MenuItem[] = [
    // getItem('Customer', '1','/Flo', <UserOutlined />),
    // getItem('Option 2', '2','/upload' ,<DesktopOutlined />),
   
    getItem('Các loại phiếu', 'sub2', '',<TeamOutlined />, [
      // getItem('Phiếu nhập', '5','/upload'), 
      getItem('Phiếu tiếp nhận', '6','/ReceiveCar'), 
      getItem('Phiếu sửa chữa', '7','/RepairCar'), 
      // getItem('phiếu thu tiền', '8','/upload')
    ]),
    getItem('Quản lý thông tin', 'sub1','',<DesktopOutlined />, [   //<PieChartOutlined />
    getItem('Khách hàng', '1','/customer'),
    getItem('Nhà cung cấp', '2','/Supplier'),
    getItem('Phụ tùng thay thế', '3','/Accessory'),
    // getItem('Xe khách hàng', '4','/vehicle'),
    getItem('Hãng xe', '5','/Automaker'),
    ]),
    getItem('Thống kê', 'sub3','', <PieChartOutlined />, [
      getItem('Doanh thu', '9','/Chart'), 
      getItem('Hàng tồn kho', '10','/Inventory'), 
    ]), //<FileOutlined />
  ];
const SideBar = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    return (
        <aside className='wrapperss' >
            <Layout>
            {/* style={{marginTop:'2px'}} */}
                <Content >
                    <Layout style={{ background: colorBgContainer }}>
                    <Sider style={{ height:'1000px', background: colorBgContainer }} width={250}>
                        <Menu
                            mode="inline"
                            // defaultSelectedKeys={['1']}
                            // defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                            items={items}
                        />
                    </Sider>
                    </Layout>
                </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
                </Layout>
        </aside>
  
   
    );
}

export default SideBar;