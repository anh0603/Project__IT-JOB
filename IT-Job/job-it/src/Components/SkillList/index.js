import { useEffect, useState } from "react";
import { getListTags } from "../../services/tagsService";
import { Link } from "react-router-dom";
import { Tag } from "antd";

function SkillList () {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListTags();
            if(response) {
                setTags(response);
            }
             
        };
        fetchApi();
    },[])
    // console.log(tags);
    return (
        <>
            <div className="tags__item">
                {tags.map((item) => (
                     <Link to={`/search?keyword=${item.value || ""}`} key={item.id}>
                        <Tag color="blue">
                            {item.value}
                        </Tag>
                     </Link>
                ))}
            </div>
        </>
    )
}
export default SkillList;