import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getListJob } from "../../services/JobServices";
import { Button, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditJob from "./EditJob";
import DelJob from "./deleteJob";

function JobList(props) {
    const { className = '' } = props;
    const idCompany = getCookie('id');
    const [jobs, setJobs] = useState([]);

    const fetchApi = async () => {
        const response = await getListJob(idCompany);
        if (response) {
            setJobs(response.reverse());
        }
    }

    useEffect(() => { 
        fetchApi();
    }, [])

    const handleReload = () => {
       fetchApi();
    }

    const columns = [
        {
            title: 'Tên job',
            dataIndex: 'name',
            key: 'name',
        },  
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render: (_, record) =>
                (record.tags || []).map((item, index) => (
                    <Tag color="blue" key={index}>{item}</Tag>
                ))

        },
        {
            title: 'Mức lương',
            dataIndex: 'salary',
            key: 'salary',
        },
        {
            title: 'Thời gian',
            key: 'createAt',
            render: (_, record) =>
                <>
                    <small>Ngày tạo: {record.createAt}</small>
                </>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) =>
            (record.status ? (
                <Tag color="green">Đang bật</Tag>
            ) : (
                <Tag color="red">Đang tắt</Tag>
            ))
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) =>
            (
                <>
                    <Link to={`/detail-job/${record.id}`}>
                        <Tooltip title='xem chi tiết'>
                            <Button icon={<EyeOutlined />}></Button>
                        </Tooltip>
                    </Link><br />
                    <EditJob record={record} onReload={handleReload}/>
                    <DelJob record={record} onReload={handleReload}/>
                </>
            )
        },
    ];


    return (
        <>
            <Table dataSource={jobs} columns={columns} rowKey='id'
                 pagination={{ pageSize: 5 }}
            />
        </>
    )
}
export default JobList;