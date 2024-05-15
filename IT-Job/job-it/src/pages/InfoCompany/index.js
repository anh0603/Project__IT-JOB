import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { editCompany, getDetailCompany } from "../../services/CompanyService";
import { Button, Card, Col, Form, Input, Row, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import './infoCompany.css';


function InfoCompany() {
    const idCompany = getCookie('id');
    const [info, setInfo] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [form] = Form.useForm()
    const [mess, contexHolder] = message.useMessage();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getDetailCompany(idCompany);
            if (response) {
                setInfo(response);
                form.setFieldsValue(response); // Thiết lập giá trị form
            }
        }
        fetchApi();
    }, [])
    console.log(info);
    const handleEdit = () => {
        setIsEdit(true);
    }
    const handleCancel = () => {
        setIsEdit(false);
        form.resetFields();
    }
    const handleFinish = async (values) => {
         const response = await editCompany(idCompany, values)
         if(response) {
            mess.success('Cập nhật thành công!');
            setIsEdit(false);
         }
    }

    return (
        <>
            {contexHolder}
            <div className="boxCompany">
            <Card
                title="Thông tin công ty"
                extra={
                    !isEdit ? (
                        <Button onClick={handleEdit}>Chỉnh sửa</Button>
                    ) : (
                        <Button onClick={handleCancel}>Hủy</Button>
                    )
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={info}
                    disabled={!isEdit}
                    onFinish={handleFinish}
                >
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <Form.Item
                                label='Tên công ty' name='companyName'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label='Email' name='email'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label='Số điện thoại' name='phone'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label='Địa chỉ' name='address'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label='Số lượng nhân sự' name='quantityPeople'
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label='Thời gian làm việc' name='workingTime'
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label='Link website' name='website'
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item label='Mô tả ngắn' name='description'>
                                <TextArea rows={6} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item label='Mô tả chi tiết' name='detail'>
                                <TextArea rows={10} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button htmlType='submit' type="primary" className="save">Cập nhật</Button>
                                <Button   onClick={handleCancel}>Hủy</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
            </div>
        </>
    )
}
export default InfoCompany;