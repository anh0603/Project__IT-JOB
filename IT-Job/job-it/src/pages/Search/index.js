import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { getAllJob } from '../../services/JobServices';
import { Tag } from 'antd';
import SearchList from './SearchList';
import './search.css';

function Search() {
    const [searchParams] = useSearchParams(); // Sửa: Không cần thiết lập setSearchParams
    const [data, setData] = useState([]);
    const citySearch = searchParams.get("city") || "";
    const keywordSearch = searchParams.get("keyword") || "";

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAllJob();
            if (response) {
                const newData = response.filter((item) => {
                    const city = citySearch
                        ? item.city?.includes(citySearch)
                        : true;
                    const keyword = keywordSearch
                        ? item.tags.includes(keywordSearch)
                        : true;
                    return city && keyword; // Loại bỏ status khỏi điều kiện lọc
                });
                setData(newData.reverse());
            }
        };

        fetchApi();
    }, [citySearch, keywordSearch]);

    // console.log(data);

    return (
        <>
            <div>
                <strong>Kết quả tìm kiếm: </strong>
                {citySearch && <Tag>{citySearch}</Tag>}
                {keywordSearch && <Tag>{keywordSearch}</Tag>} 
            </div> 
            {data && (
                 <SearchList data={data}/>
            )}
           
        </>
    )
}

export default Search;
