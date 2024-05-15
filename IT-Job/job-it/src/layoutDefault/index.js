import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import './LayoutDefault.css';
import { useSelector } from 'react-redux';
import { Layout } from "antd";
 
function LayoutDefault() {
    const authen = useSelector((state) => state.authenReducer);
    return (
        <>
            <div className="layout-defaut">
                <Header/> 
                <Main/>
                <Footer/>
            </div>
        </>
    )
}
export default LayoutDefault;