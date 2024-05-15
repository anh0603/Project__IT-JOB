import { Button, Col, Form, Input, Row, Select, Switch, message, notification } from "antd";
import GoBack from "../../Components/GoBack";
import { rules } from '../../Components/Contants';
import TextArea from "antd/es/input/TextArea";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getListTags } from "../../services/tagsService";
import { getListCity } from "../../services/CityServices";
import { getTimeCurrent } from "../../helpers/getTime";
import { createJob } from "../../services/JobServices";
import { useNavigate } from "react-router-dom";

function CreateJob() {
    const [form] = Form.useForm();
    const idCompany = getCookie('id');
    const [tags, setTags] = useState([]);
    const [city, setCity] = useState([]);
    const [noti, contextHolder] = notification.useNotification();
    const navigate = useNavigate();

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

    const handleFinish = async (values) => {
        values.idCompany = idCompany;
        values.createAt = getTimeCurrent();
        const response = await createJob(values);
        if (response) {
            form.resetFields();
            noti.success({
                message: `Gửi yêu cầu thành công!`,
                description:
                    "Nhà tuyển dụng sẽ liên hệ với bạn trong thời gian sớm nhất",
            });
            navigate('/job-manage')
        } else {
            noti.error({
                type: "error",
                content: "Tạo mới không thành công!",
                duration: 3
            })
        }
    }

    // console.log(tags);
    // console.log(city);
    return (
        <>
            <div className="boxJobManage">
                <GoBack />
                {contextHolder}
                <h2>Tạo job mới</h2>
                <Form
                    layout="vertical"
                    form={form}
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
                                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked={false} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item  >
                                <Button type='primary' htmlType='submit'>
                                    Tạo mới
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    )
}
export default CreateJob;