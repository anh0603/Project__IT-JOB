import { useNavigate } from "react-router-dom"

function GoBack() {
    const navigate = useNavigate();
    const handleClick = ()=> {
        navigate(-1)
    }

    return (
        <>
            <button className="goback" onClick={handleClick}>Trở lại</button>
        </>
    )
}
export default GoBack