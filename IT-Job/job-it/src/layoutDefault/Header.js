import { Button, Col, Row } from 'antd';
import LogoIT from '../Components/Image/logoIT.jpg';
import './Header.css';
import { Link } from 'react-router-dom';
import { getCookie } from '../helpers/cookie';
import { useSelector } from 'react-redux';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
function Header() {
    const token = getCookie('token');
    const isLogin = useSelector(state => state.loginReducers);

    return (
        <>
            <div className="layout-defaul__header">
                <Row gutter={[12, 12]}>
                    <Col xxl={24} xl={24} lg={24} sm={24}>
                        <div className='header__box'>
                            <div className='header__img'>
                                <Link to='/'><img src={LogoIT} alt='logo' /></Link>
                            </div>
                            {token ? (
                                <>
                                    <div className='header__Button'>
                                        <Link to={`/admin`}>
                                            <Button className='login' >
                                                <UserOutlined />
                                                Quản lý
                                            </Button>
                                        </Link>
                                        <Link to={`/logout`}>
                                            <Button type='primary' className='' >
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
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default Header;