import { Outlet } from "react-router-dom";
import './Main.css';
function Main () {
    return (
        <>
            <div className="layout-default__main">
                <div className="contaienr">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default Main;