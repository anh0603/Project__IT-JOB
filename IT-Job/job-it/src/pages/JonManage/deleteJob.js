import { Button, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { delJob } from "../../services/JobServices";

function DelJob(props) {
    const { record, onReload } = props;

    const handleDelete = async () => {
         const response = await  delJob(record.id);
         if(response) {
            onReload();
         }
    }
    return (
        <>
            <Tooltip title='Xóa'>
                <Popconfirm
                    title="Bạn có chắc muốn xóa không?" 
                    okText="Có"
                    cancelText="Không"
                    onConfirm={handleDelete}
                >
                    <Button danger ghost icon={<DeleteOutlined />}></Button>
                </Popconfirm>
            </Tooltip>
        </>
    )
}
export default DelJob;