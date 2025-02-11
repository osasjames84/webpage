// import React from "react";
// import { Helmet } from "react-helmet";

// const AdminLayout = ({ children }) => (
//     <div>
//         <Helmet>
//             <title>Admin Panel</title>

//         </Helmet>
//         <nav>
//             <h2>Admin Panel</h2>
//         </nav>
//         <main>{children}</main>
//     </div>
// );

// export default AdminLayout;

import React from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../Components/Sidebar";

const AdminLayout = ({ children }) => {
    return (
        <div style={styles.container}>
            <Helmet>
                <title>Admin Panel</title>
                <link rel="stylesheet" href="/css/admin.css" />
            </Helmet>

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div style={styles.mainContent}>{children}</div>
        </div>
    );
};

// Styles for AdminLayout
const styles = {
    container: {
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
    },
    mainContent: {
        marginLeft: "250px", // Ensure the content starts after the sidebar
        padding: "20px",
        flex: 1,
    },
};

export default AdminLayout;
