import { Row, Col } from 'antd';
import JobStatistic from './JobStatistic';
import './DashBoard.css'
import CvStatistic from './CvStatistic';
import InfoCompany from './InfoCompany';

function DashBoard() {
    return (
        <>
            <div className='boxDash'>
                <h2>Tổng quan</h2>
                <Row gutter={[20, 20]} className='rowDash'>
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={20}>
                        <JobStatistic />
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={20}>
                        <CvStatistic />
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={20}>
                        <InfoCompany />
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default DashBoard;