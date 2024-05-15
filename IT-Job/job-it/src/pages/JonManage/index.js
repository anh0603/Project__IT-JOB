import { Button } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';
import JobList from "./JobList";

function JobManage() {
    return (
        <>
            <div className="boxJobManage">
                <h2>Danh sách việc làm</h2>
                <Link to='/create-job'>
                    <Button icon={<PlusOutlined />}>Tạo việc mới</Button>
                </Link>
                <div>
                    <JobList />
                </div>
            </div>
        </>
    )
}
export default JobManage;