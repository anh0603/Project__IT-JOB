import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/CompanyService";
import { Button, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

function CompanyList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAllCompany();
            if (response) {
                setData(response.slice(0, 3)); // Chỉ lấy 3 phần tử đầu tiên
            }
        }
        fetchApi();
    }, [])
    return (
        <>
            <h2>Danh sách một số công ty hàng đầu</h2>
            <Row gutter={[20, 20]}>
                {data.map((item) => (
                    <Col span={8}
                        key={item.id}>
                        <Link to={`/company/${item.id}`}>
                            <Card>
                                <div>
                                    Công ty: <strong>{item.companyName}</strong>
                                </div>
                                <div>
                                    Số nhân sự: <strong>{item.quantityPeople}</strong>
                                </div>
                                <div>
                                    Địa chỉ: <strong>{item.address}</strong>
                                </div>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
            <Link to={`/company`}>
                <Button className="company__btn">
                    Xem Thêm
                </Button>
            </Link>
        </>
    )
}
export default CompanyList;