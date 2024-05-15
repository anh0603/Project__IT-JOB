import { useEffect, useState } from "react";
import GoBack from "../../Components/GoBack";
import { getDetailCompany } from "../../services/CompanyService";
import { useParams } from "react-router-dom";
import './company.css'
import { getListJob } from "../../services/JobServices";
import JobItem from "../../Components/JobItem";
import { Col, Row } from "antd";

function CompanyDetail() {
    const params = useParams();
    const [infoCompany, setInfoCompany] = useState([]);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getDetailCompany(params.id);
            setInfoCompany(response);
        }
        fetchApi();
    }, [])
    // console.log(infoCompany);
    useEffect(() => {
        const fetchApi = async ()=> {
            const response = await getListJob(params.id);
            setJobs(response);
        }
        fetchApi();
    },[])
    // console.log(jobs);
    return (
        <>
            <GoBack />
            {infoCompany && (
                <>
                    <h1>{infoCompany.companyName}</h1>
                    <div className="company__detail">
                        Địa chỉ: <strong>{infoCompany.address}</strong>
                    </div>
                    <div className="company__detail">
                        Số lượng nhân sự: <strong>{infoCompany.quantityPeople}</strong>
                    </div>
                    <div className="company__detail">
                        Thời gian làm việc: <strong>{infoCompany.workingTime}</strong>
                    </div>
                    <div className="company__detail">
                        Link website: <strong>{infoCompany.website}</strong>
                    </div>
                    <div className="company__detail">
                        Mô tả ngắn: <br/> <strong>{infoCompany.description}</strong>
                    </div>
                    <div className="company__detail">
                        Mô tả chi tiết: <br/> <strong>{infoCompany.detail}</strong>
                    </div>

                <p>Danh sách các job:</p>
                <div className="company__detail">
                    <Row gutter={[20,20]}>
                        {jobs.map((item) => (
                            <Col span={8} key={item.id}>
                                <JobItem item={item}/>
                            </Col>
                        ))}
                    </Row>
                </div>
                </>

            )}
        </>
    )
}
export default CompanyDetail; 