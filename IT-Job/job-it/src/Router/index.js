// Trong file routes.js
import PrivateRouter from "../Components/PrivateRouter";
import LayoutDefault from "../layoutDefault"; 
import LayoutAdmin from "../layoutAdim"; // Sửa lỗi chính tả ở đây
import Company from "../Components/Company";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";
import JobDetail from "../pages/JobDetail";
import Login from "../pages/Login";
import Logout from "../pages/Logout"; 
import Register from "../pages/Register"; 
import Search from "../pages/Search";
import CompanyDetail from "../pages/CompanyDetail";
import DashBoard from "../pages/Dashboard";
import InfoCompany from "../pages/InfoCompany";
import CreateJob from "../pages/CreateJob";
import JobManage from "../pages/JonManage";
import JobDetailAdmin from "../pages/JonManage/JobDetail";
import CvManage from "../pages/CvManage";
import CvDetail from "../pages/CvManage/CvDetail";

export const routes = [
    // Public routes
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                index: true,
                element: <Home />
            }, 
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "logout",
                element: <Logout/>
            },
            {
                path: "search",
                element: <Search />
            },
            {
                path: "job/:id",
                element: <JobDetail />
            },
            {
                path: "company",
                element: <Company />
            },
            {
                path: "company/:id",
                element: <CompanyDetail />
            },
        ]
    },
    // Private routes
    {
        element: <PrivateRouter />,
        children: [
            {
                element: <LayoutAdmin />,
                children: [
                    {
                        path: "admin",
                        element: <DashBoard/>
                    },
                    {
                        path: "info-company",
                        element: <InfoCompany/>
                    },
                    {
                        path: "job-manage",
                        element: <JobManage/>
                    },
                    {
                        path: "create-job",
                        element: <CreateJob/>
                    },
                    {
                        path: "detail-job/:id",
                        element: <JobDetailAdmin/>
                    },
                    {
                        path: "cv-manage",
                        element: <CvManage/>
                    },
                    {
                        path: "cv-detail/:id",
                        element: <CvDetail/>
                    },
                    // Add other admin routes here
                ]
            }
        ]
    },
    // 404 page
    {
        path: "*",
        element: <Error404/>
    },
];
