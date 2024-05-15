import { Card, Col, Row, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { generateToken } from "../../helpers/generateToken";
import * as Company from "../../services/CompanyService";


function Register() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        values.token = generateToken()
        const checkExitEmail = await Company.checkExit('email', values.email);
        const checkExitPhone = await Company.checkExit('phone', values.phone);

        if (checkExitEmail.length > 0) {
            messageApi.error('Email đã tồn tại!')
        }
        else if (checkExitPhone.length > 0) {
            messageApi.error('Số điện thoại đã tồn tại!')
        }
        else {
            const result = await Company.createCompany(values); 
            if (result) { 
                navigate('/login')
            }
        }
    }
    
    return (
        <>
            {contextHolder}
            <Row justify={"center"}>
                <Col span={8}>
                    <Card title="Đăng ký tài khoản">
                        <Form layout="vertical" onFinish={onFinish}>
                            <Form.Item label="Tên công ty" name="companyName"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item label="Email" name="email"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item label="Số điện thoại" name="phone"
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
                                    Đăng ký
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default Register;