import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getListJob } from "../../services/JobServices";
import { Card } from "antd";

function JobStatistic() {
    const idCompany = getCookie('id');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListJob(idCompany);
            if (response) {
                let obj = {
                    total: 0,
                    statusTrue: 0,
                    statusFalse: 0,
                };
                obj.total = response.length;
                response.forEach((item) => {
                    item.status ? obj.statusTrue++ : obj.statusFalse++
                });
                setData(obj);
            }
        };
        fetchApi();
    }, [])
    // console.log(data);
    return (
        <>
            {data && (
                 <Card title='Job' size="small" className="cardDashBoarr">
                    <div>
                        Số lượng job: <strong>{data.total}</strong>
                    </div>
                    <div>
                        Job đang bật: <strong>{data.statusTrue}</strong>
                    </div>
                    <div>
                        Job đang tắt: <strong>{data.statusFalse}</strong>
                    </div>
                 </Card>
            )}
        </>
    )
}
export default JobStatistic;