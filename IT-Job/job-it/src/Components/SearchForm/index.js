import { Form, Button, Row, Col, Select, Input } from 'antd';
import { useEffect, useState } from 'react';
import { getListCity } from '../../services/CityServices';
import { useNavigate } from 'react-router-dom';
function SearchForm() {
    const navigate = useNavigate();
    const [city, setCity] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListCity();
            // console.log( response);
            if(response) {
                const objAll = {
                    key: 0,
                    value: 'All',
                }
                setCity([objAll, ...response]);
            }
           
        }
        fetchApi();
    },[])
    // console.log(city)
    const handeFinish = (values) => {
        let city = values.city || ""; 
        city = values.city === "All" ? "" : city;
        const keyword = values.keyword || "";
        navigate(`/search?city=${city}&keyword=${keyword}`);
        // console.log(values);
    }
    return (
        <>
            <h1>1000+ IT Jobs For Developers</h1>
            <Form onFinish={handeFinish}>
                <Row gutter={[12, 12]}>
                    <Col xxl={6} xl={6} lg={6}>
                        <Form.Item name="city">
                            <Select options={city} placeholder="Chọn thành phố" />
                        </Form.Item>
                    </Col>
                    <Col xxl={12} xl={12} lg={12}>
                        <Form.Item name="keyword">
                            <Input placeholder='Nhập từ khóa...' />
                        </Form.Item>
                    </Col>
                    <Col xxl={3} xl={3} lg={3}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Tìm kiếm
                            </Button>
                        </Form.Item>
                    </Col> 
                </Row>
            </Form >
        </>
    )
}
export default SearchForm;