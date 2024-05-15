import { useEffect, useState } from "react";
import { getAllCompany } from '../../services/CompanyService';
import { Col, Row } from "antd";
import JobItem from "../../Components/JobItem";

function SearchList(props) {
    const { data = [] } = props;
    const [dataFinal, setDataFinal] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {

            const company = await getAllCompany(); // Gọi API để lấy thông tin tất cả các công ty
            const newData = data.map((item) => {
                const infoCompany = company.find(
                    (itemCompany) => itemCompany.id == item.idCompany
                );
                return {
                    ...item,
                    infoCompany: infoCompany || {} // Nếu không tìm thấy công ty, gán giá trị mặc định là đối tượng rỗng
                };
            });
            setDataFinal(newData); // Cập nhật dữ liệu mới vào state setDataFinal

        };

        fetchApi();
    }, [data]); // Sử dụng data làm dependency để khi data thay đổi, useEffect sẽ chạy lại

    console.log(dataFinal); // In ra dữ liệu đã gộp để kiểm tra

    return (
        <>
            {dataFinal.length > 0 ? (
                <div className="search__list" >
                    <Row gutter={[20, 20]}>
                        {dataFinal.map((item, index) => (
                            <Col span={8} key={index}>
                                <JobItem item={item} />
                            </Col>
                        ))}
                    </Row>
                </div>
            ) : (
                <div className="search__list">không tìm thấy công việc nào!</div>
            )}
        </>
    );
}

export default SearchList;
