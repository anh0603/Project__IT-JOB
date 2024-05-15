import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/CompanyService";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import GoBack from "../GoBack";

function Company() {
    const [company, setCompany] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAllCompany();
            if (response) {
                setCompany(response);
            }
        }
        fetchApi();
    }, [])
    return (
        <>
            <GoBack/>
            <h2>Danh sách các công ty</h2>
            <Row gutter={[20, 20]}>
                {company.map((item) => (
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
        </>
    )
}
export default Company;