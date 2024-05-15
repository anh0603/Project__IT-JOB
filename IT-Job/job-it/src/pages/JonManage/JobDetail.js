import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobDetail } from "../../services/JobServices";
import GoBack from "../../Components/GoBack";
import { Tag } from "antd";



function JobDetailAdmin() {
    const params = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getJobDetail(params.id);
            if (response) {
                setData(response);
            }
        }
        fetchApi();
    }, [])
    return (
        <>
            <div className="detail__jobAdmin">
                <GoBack />
                {data && (
                    <>
                        <h2>Tên job: {data.name}</h2>
                        <div>
                            <span>Trạng thái: </span>
                            {data.status ? (
                                <Tag color="green">Đang bật</Tag>
                            ) : (
                                <Tag color="red">Đang tắt</Tag>
                            )}
                        </div>
                        <div>
                            <span>Tags: </span>
                            {data.tags && data.tags.map((item, index) => (
                                <Tag color="blue" key={index}>{item}</Tag>
                            ))}
                        </div>
                        <div>
                            Mức lương: <span className="salary">{data.salary}</span>
                        </div>
                        <div>
                            Ngày tạo: <span className="salary">{data.createAt}</span>
                        </div>
                        <div>
                            Thành phố: <span className="salary">{data.city && data.city.map((item) => (
                                <Tag color="gold">{item}</Tag>
                            ))}</span>
                        </div>
                        <div>
                            Mô tả:
                            <br />
                            <span className="salary">
                                {data.description}
                            </span>
                        </div>
                    </>
                )
                }
            </div>
        </>
    )
}
export default JobDetailAdmin;