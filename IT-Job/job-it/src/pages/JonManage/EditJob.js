import { Button, Col, Form, Input, Modal, Row, Select, Switch, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { rules } from "../../Components/Contants";
import TextArea from "antd/es/input/TextArea";
import { getListTags } from "../../services/tagsService";
import { getListCity } from "../../services/CityServices";
import { updateJob } from "../../services/JobServices";


function EditJob(props) {
    const { record, onReload } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mess, contexHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [tags, setTags] = useState([]);
    const [city, setCity] = useState([]); 

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListTags();
            if (response) {
                setTags(response);
            }
        }
        fetchApi();
    }, [])

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListCity();
            if (response) {
                setCity(response);
            }
        }
        fetchApi();
    }, [])

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const handleFinish = async (values) => { 
        const response = await updateJob(record.id, values)
        if(response) {
            setIsModalOpen(false);
            onReload();
            mess.open({
                type: 'success',
                content: 'Cập nhật thành công!',
                duration: 5,
            })
        }else {
            mess.open({
                type: 'error',
                content: 'Cập nhật thất bại!',
                duration: 3,
            })
        }
    }
    return (
        <>
            {contexHolder}
            <Tooltip title='Chỉnh sửa'>
                <Button onClick={showModal} type="primary" ghost icon={<EditOutlined />}></Button>
            </Tooltip> <br />

            <Modal title="Chỉnh sửa" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>  
                    <Form
                        layout="vertical"
                        form={form} 
                        initialValues={record}
                        onFinish={handleFinish}
                    >
                        <Row gutter={[20, 20]}>
                            <Col span={24}>
                                <Form.Item label='Tên job' name='name' rules={rules}>
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={16}>
                                <Form.Item label='Tags' name='tags' rules={rules}>
                                    <Select options={tags}
                                        mode="multiple"
                                        allowClear />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item label='Mức lương' name='salary' rules={rules}>
                                    <Input addonAfter="$" />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item label='Thành phố' name='city' rules={rules}>
                                    <Select options={city}
                                        mode="multiple"
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item label='Mô tả' name='description' rules={rules}>
                                    <TextArea rows={8} />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item label='Trạng thái' name='status' >
                                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
                                </Form.Item>
                            </Col> 

                            <Col span={24}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Cập nhật</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form> 
            </Modal>
        </>
    )
}
export default EditJob;