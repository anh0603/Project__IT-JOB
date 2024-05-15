import { useEffect, useState } from "react";
import { getAllJob, getJobDetail } from "../../services/JobServices"; 
import { detailCv, getListCv } from "../../services/CvServices"; 

function CvName({ record }) {
    const [jobName, setJobName] = useState('');

    useEffect(() => {
        const fetchJobName = async () => {

            const jobDetail = await getJobDetail(record.idJob);
            if (jobDetail) {
                setJobName(jobDetail);
            }
        };

        fetchJobName();
    }, [record.id]);
    // console.log(jobName);
    return (
        <>
            <li>{jobName.name}</li>
        </>
    )
}

export default CvName;
