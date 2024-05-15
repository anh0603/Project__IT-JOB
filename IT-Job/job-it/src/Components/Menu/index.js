import {
    DashboardOutlined, 
    UnorderedListOutlined,
    UserOutlined, 
    PieChartOutlined

} from '@ant-design/icons';
import { Menu, Affix } from 'antd';
import { Link } from 'react-router-dom'; 

function MenuSider() {
    const items = [
        {
            label: <Link to={'/admin'}>Tổng quan</Link>,
            icon: <DashboardOutlined />,
            key: "DashBoard", 
          
        }, 
        {
            label: <Link to={'/info-company'}>Thông tin công ty</Link>,
            icon: <UserOutlined />
        },
        {
            label: <Link to={'/job-manage'}>Quản lý làm việc</Link>,
            icon: <UnorderedListOutlined />
            
        },
        {
            label: <Link to={'/cv-manage'}>Quản lý CV</Link>,
            icon: <PieChartOutlined />
            
        },
    ];
    return (
        <>
            <Affix offsetTop={82}>
                <Menu
                    mode="inline"
                    items={items}
                    defaultSelectedKeys={["/"]}
                    defaultOpenKeys={["DashBoard"]}
                />
            </Affix>
        </>
    )
}
export default MenuSider;