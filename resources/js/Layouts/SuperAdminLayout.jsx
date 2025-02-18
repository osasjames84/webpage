import React from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../Components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuperAdminLayout = ({ children }) => {
    const superAdminMenuItems = [
        { label: "Dashboard", path: "/super-admin/dashboard" },
        { label: "Manage Roles", path: "/super-admin/manage-roles" },
        { label: "Manage Permissions", path: "/super-admin/permissions" },
        { label: "Assign Permissions", path: "/super-admin/assign-permission" },
    ];

    return (
        <div className="admin-container">
            <ToastContainer />
            <Helmet>
                <title>Super Admin Panel</title>
                <link rel="stylesheet" href="/css/admin.css" />
                <link rel="stylesheet" href="/css/superadmin.css" />
            </Helmet>

            {/* Sidebar */}
            <Sidebar
                menuItems={superAdminMenuItems}
                title="Super Admin Panel"
            />

            {/* Main Content */}
            <div className="admin-main-content">{children}</div>
        </div>
    );
};

export default SuperAdminLayout;
