import { Card, Col, Row, Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as company from '../../services/CompanyService'
import { setCookie } from "../../helpers/cookie";
import {checkLogin} from '../../Action/login';
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [messageApi, contexHolder] = message.useMessage();

    const onFinish = async(values) =>{
        const result = await company.login(values.email, values.password); // Thay 'Password' thành 'password'
        if(result && result.length > 0 && result[0].password === values.password) {
            const time = 1;
            setCookie('id', result[0].id, time);
            setCookie('companyName', result[0].companyName, time);
            setCookie('email', result[0].email, time);
            setCookie('token', result[0].token, time);
            dispatch(checkLogin(true));
            navigate('/');
        }else {
            messageApi.error('Tài khoản hoặc mật khẩu không đúng!');
        }
        // console.log(result);        
    }
    
    return (
        <>
        {contexHolder}
            <Row justify={"center"}>
                <Col span={8}>
                    <Card title="Đăng nhập">
                        <Form layout="vertical" onFinish={onFinish}>
                            
                            <Form.Item label="Email" name="email"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item> 

                            <Form.Item label="Password" name="password"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default Login;