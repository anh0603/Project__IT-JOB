import React, { useState } from 'react';
import { Affix, Button, Layout } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';
import './layoutAdmin.css';
import { Content } from 'antd/es/layout/layout';
import MenuSider from '../Components/Menu';
import Sider from 'antd/es/layout/Sider';
import Logo from '../Components/Image/IT Admin.png';
import Logo_fold from '../Components/Image/IT Admin (1).png';
import { getCookie } from '../helpers/cookie';
import { useSelector } from 'react-redux';

function LayoutAdmin() {
    const token = getCookie('token');
    const isLogin = useSelector(state => state.loginReducers);
    const [collapse, setCollapse] = useState(false)
    return (
        <>
            <Layout className='layout-default__admin'>
                <Affix offsetTop={0}>
                    <header className='header'>
                        <div className={"header_logo " + (collapse && " header-collapseed")}>
                            <img src={collapse ? (Logo_fold) : (Logo)} alt='logo' />
                        </div>
                        <div className='header_nav'>
                            <div className='header_collapse' onClick={() => setCollapse(!collapse)}>
                                {collapse ? <MenuUnfoldOutlined style={{ fontSize: '21px' }} /> : <MenuFoldOutlined style={{ fontSize: '21px' }} />}
                            </div>
                            {token ? (
                                <>
                                    <div className='header__Button'>
                                        <Link to={`/`}>
                                            <Button className='home' >
                                                <HomeOutlined />
                                                Trang chủ
                                            </Button>
                                        </Link>
                                        <Link to={`/logout`}>
                                            <Button type='primary' className='logout' >
                                                <LogoutOutlined />
                                                Đăng xuất</Button>
                                        </Link>
                                    </div>
                                </>) : (
                                <>
                                    <div className='header__Button'>
                                        <Link to={`/login`}>
                                            <Button className='login' >Đăng Nhập</Button>
                                        </Link>
                                        <Link to={`/register`}>
                                            <Button type='primary' className='login' >Đăng Ký</Button>
                                        </Link>
                                    </div>
                                </>)}
                        </div>
                    </header>
                </Affix>
                <Layout>
                    <Sider
                        className='sider'
                        collapsed={collapse}
                        theme='light'
                    >
                        <MenuSider />
                    </Sider>
                    <Content className='content'>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
export default LayoutAdmin;