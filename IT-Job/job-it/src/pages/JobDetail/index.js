import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobDetail } from '../../services/JobServices';
import { getDetailCompany } from '../../services/CompanyService';
import GoBack from '../../Components/GoBack';
import { Button, Card, Col, Form, Input, Row, Select, Tag, notification, } from 'antd';
import './jobDetail.css';
import TextArea from 'antd/es/input/TextArea';
import { getTimeCurrent } from '../../helpers/getTime';
import { createCV } from '../../services/CvServices';


function JobDetail() {
    const [job, setJob] = useState([]);
    const params = useParams();
    const [form] = Form.useForm();
    const { Option } = Select;
    const [noti, contextHolder] = notification.useNotification();


    useEffect(() => {
        const fetchApi = async () => {

            const jobResponse = await getJobDetail(params.id);
            const companyResponse = await getDetailCompany(jobResponse.idCompany);

            // Gộp thông tin công việc và công ty thành một đối tượng dữ liệu mới
            const dataFinal = {
                ...jobResponse,
                infoCompany: companyResponse,
            };
            setJob(dataFinal);
        };

        fetchApi();
    }, []);

    const onFinish = async (values) => {
        values.idJob = params.id; // Sử dụng params.id thay vì job.id
        values.idCompany = job.infoCompany.id;
        values.createAt = getTimeCurrent();
        const response = await createCV(values);
        // console.log(response);
        if (response) {
            form.resetFields();
            noti.success({
                message: `Gửi yêu cầu thành công!`,
                description:
                    "Nhà tuyển dụng sẽ liên hệ với bạn trong thời gian sớm nhất",
            });
        }
        else {
            noti.error({
                message: `Gửi yêu cầu không thành công!`,
                description:
                    "Hệ thống đang gặp lỗi, vui lòng gửi lại yêu cầu",
            })
        }
    }

    // console.log(job)
    return (
        <>
            {contextHolder}
            <GoBack />
            {job && (
                <>
                    <h1>{job.name}</h1>
                    <Button
                        href='#formApply'
                        type='primary'
                        size='large'
                        className='btn-apply'
                    >
                        Ứng tuyển ngay
                    </Button>
                    <div className="Job__item">
                        <span>Tags: </span>
                        {(job.tags || []).map((itemjob, index) => (
                            <Tag color="blue" key={index}>
                                {itemjob}
                            </Tag>
                        ))}
                    </div>

                    <div className="Job__item">
                        <span>Thành phố: </span>
                        {(job.city || []).map((itemjob, index) => (
                            <Tag color="gold" key={index}>
                                {itemjob}
                            </Tag>
                        ))}
                    </div>

                    <div className="Job__item">
                        <span>Lương: </span>
                        <span className="salary">{job.salary}</span>
                    </div>

                    <div className="Job__item">
                        <span>Địa chỉ: </span>
                        <span className="salary">{job.infoCompany && job.infoCompany.address}</span>
                    </div>

                    <div className="Job__item">
                        <span>Thời gian đăng tuyển: </span>
                        <span className="salary">{job.createAt}</span>
                    </div>

                    <div className="Job__item">
                        <span>Mô tả công việc: </span>
                        <p className="salary">{job.description}</p>
                    </div>

                    <div className="Job__item">
                        <span>Mô tả công việc: </span>
                        <p className="salary">{job.infoCompany && job.infoCompany.description}</p>
                    </div>

                    <Card title="Ứng tuyển ngay" id="formApply">
                        <Form
                            name='form-apply'
                            layout='vertical'
                            form={form}
                            onFinish={onFinish}
                        >
                            <Row gutter={20}>
                                <Col span={6}>
                                    <Form.Item label="Họ Tên" name='name' rules={[
                                        {
                                            required: true,
                                        },
                                    ]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Số điện thoại" name='phone' rules={[
                                        {
                                            required: true,
                                        },
                                    ]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Email" name='email' rules={[
                                        {
                                            required: true,
                                        },
                                    ]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Thành phố" name='city' rules={[
                                        {
                                            required: true,
                                        },
                                    ]}>
                                        <Select>
                                            {job.city && job.city.map((item, index) => (
                                                <Option value={item} label={item} key={index}>
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item
                                        label="Giới thiệu bản thân"
                                        name="description"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <TextArea rows={6} />
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item
                                        label="Danh sách link project đã làm"
                                        name="linkPrject"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <TextArea rows={6} />
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item>
                                        <Button type='primary' htmlType='submit' >
                                            Gửi yêu cầu
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </>
            )}
        </>
    )
}
export default JobDetail;