import { Card, Tag } from "antd";
import { Link } from "react-router-dom";

function JobItem(props) {
    const { item } = props;
    return (
        <>
            <Card 
             title={<Link to={`/job/${item.id}`}>{item.name}</Link>} className="Job__box"
             >
                <div className="Job__item">
                    <span>Ngôn ngữ: </span>
                    {item.tags.map((itemjob, index) => (
                        <Tag color="blue" key={index}>
                            {itemjob}
                        </Tag>
                    ))}
                </div>
                <div className="Job__item">
                    <span>Thành phố: </span>
                    {item.city.map((itemjob, index) => (
                        <Tag color="gold" key={index}>
                            {itemjob}
                        </Tag>
                    ))}
                </div>
                <div className="Job__item">
                    <span>Lương: </span>
                    <span className="salary">{item.salary}</span> 
                </div>

                <div className="Job__item">
                    <span>Công ty: </span>
                    <span className="salary">{item?.infoCompany?.companyName}</span> 
                </div>

                <div className="Job__item">
                    <span>Ngày tạo: </span>
                    <span className="salary">{item.createAt}</span> 
                </div>
            </Card>
        </>
    )
}
export default JobItem;