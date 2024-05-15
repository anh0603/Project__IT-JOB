import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie"; 
import { Card } from "antd";
import { getDetailCompany } from "../../services/CompanyService";

function InfoCompany () {
    const idCompany = getCookie('id');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getDetailCompany(idCompany);
            setData(response)
        };
        fetchApi();
    }, [])
    // console.log(data);
    return (
        <>
            {data && (
                 <Card title='Thông tin công ty' size="small" className="cardDashBoarr">
                    <div>
                        Tên công ty: <strong>{data.companyName}</strong>
                    </div>
                    <div>
                        Email: <strong>{data.email}</strong>
                    </div>
                    <div>
                        Số điện thoại: <strong>{data.phone}</strong>
                    </div>
                    <div>
                        Nhân viên: <strong>{data.quantityPeople}</strong>
                    </div>
                 </Card>
            )}
        </>
    )
}
export default InfoCompany;