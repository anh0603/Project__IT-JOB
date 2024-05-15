import { Button, Table, Tag, Tooltip } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getListCv } from "../../services/CvServices";
import CvName from "./CvName";
import { Link, redirect } from "react-router-dom";
import { EyeOutlined } from '@ant-design/icons';

function CvList() {
    const idCompany = getCookie('id');
    const [data, setData] = useState([]);

    const columns = [
        {
            title: 'Tên job',
            dataIndex: 'idJob',
            key: 'idJob',
            render: (_, record) => 
                (
                    <CvName record={record}/>
                )
        },
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
             
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            
        },
        {
            title: 'Ngày gửi',
            dataIndex: 'createAt',
            key: 'createAt',
            
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <>
                    {record.statusRead ? (
                        <Tag color="green">Đã đọc</Tag>
                    ) : (
                        <Tag color="gray">Chưa đọc</Tag>
                    )}
                </>
            )
            
        },
        {
            title: 'Hành động',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <>
                     <Link to={`/cv-detail/${record.id}`}>
                        <Tooltip title='xem chi tiết'>
                            <Button icon={<EyeOutlined />}></Button>
                        </Tooltip>
                    </Link><br />
                     
                </>
            )
             
        },
    ]

    const fetchApi = async () => {
        const response = await getListCv(idCompany);
        if(response){
            setData(response.reverse());
        }
    };

    useEffect(() => { 
        fetchApi();
    },[])
    // console.log(data)
    return (
        <>
            <Table rowKey='id' pagination={{ pageSize: 5 }} columns={columns} dataSource={data}/>
        </>
    )
}
export default CvList;