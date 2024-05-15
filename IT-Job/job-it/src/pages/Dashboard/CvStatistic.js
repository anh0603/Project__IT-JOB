import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getListJob } from "../../services/JobServices";
import { Card } from "antd";
import { getListCv } from "../../services/CvServices";

function CvStatistic () {
    const idCompany = getCookie('id');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListCv(idCompany);
            if (response) {
                let obj = {
                    total: 0,
                    statusTrue: 0,
                    statusFalse: 0,
                };
                obj.total = response.length;
                response.forEach((item) => {
                    item.statusRead ? obj.statusTrue++ : obj.statusFalse++
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
                 <Card title='Hồ Sơ CV' size="small" className="cardDashBoarr">
                    <div>
                        Số lượng CV: <strong>{data.total}</strong>
                    </div>
                    <div>
                        CV chưa đọc: <strong>{data.statusTrue}</strong>
                    </div>
                    <div>
                        CV đã đọc: <strong>{data.statusFalse}</strong>
                    </div>
                 </Card>
            )}
        </>
    )
}
export default CvStatistic;