import React from "react";
import { Inertia } from "@inertiajs/inertia";

const Sidebar = () => {
    const handleLogout = () => {
        Inertia.post("/admin/logout"); 
    };


    const currentPath = window.location.pathname;

    return (
        <div style={styles.sidebar}>
            <h2 style={styles.sidebarTitle}>Admin Panel</h2>
            <ul style={styles.sidebarMenu}>
                <li style={styles.sidebarItem}>
                    <a
                        href="/admin/dashboard"
                        style={{
                            ...styles.sidebarLink,
                            ...(currentPath === "/admin/dashboard"
                                ? styles.activeSidebarLink
                                : {}),
                        }}
                    >
                        Dashboard
                    </a>
                </li>
                <li style={styles.sidebarItem}>
                    <a
                        href="/admin/manage-reviews"
                        style={{
                            ...styles.sidebarLink,
                            ...(currentPath === "/admin/manage-reviews"
                                ? styles.activeSidebarLink
                                : {}),
                        }}
                    >
                        Manage Reviews
                    </a>
                </li>
                <li style={styles.sidebarItem}>
                    <a
                        href="/admin/manage-menu"
                        style={{
                            ...styles.sidebarLink,
                            ...(currentPath === "/admin/manage-menu"
                                ? styles.activeSidebarLink
                                : {}),
                        }}
                    >
                        Manage Menu Items
                    </a>
                </li>
                <li style={styles.sidebarItem}>
                    <a
                        href="/admin/messages"
                        style={{
                            ...styles.sidebarLink,
                            ...(currentPath === "/admin/messages"
                                ? styles.activeSidebarLink
                                : {}),
                        }}
                    >
                        Messages
                    </a>
                </li>
                <li style={styles.sidebarItem}>
                    <a
                        href="/admin/inventory"
                        style={{
                            ...styles.sidebarLink,
                            ...(currentPath === "/admin/inventory"
                                ? styles.activeSidebarLink
                                : {}),
                        }}
                    >
                        Stock Inventory
                    </a>
                </li>
            </ul>
            <div style={styles.logoutContainer}>
                <button onClick={handleLogout} style={styles.logoutButton}>
                    Logout
                </button>
            </div>
        </div>
    );
};


const styles = {
    sidebar: {
        width: "250px",
        backgroundColor: "#333",
        color: "#fff",
        padding: "20px",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        height: "100vh", 
        position: "fixed",
        display: "flex",
        flexDirection: "column", 
        justifyContent: "space-between", 
    },
    sidebarTitle: {
        fontSize: "24px",
        marginBottom: "20px",
    },
    sidebarMenu: {
        listStyleType: "none",
        padding: 0,
        flexGrow: 1, 
    },
    sidebarItem: {
        marginBottom: "15px",
    },
    sidebarLink: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "18px",
        display: "block",
        padding: "10px",
        borderRadius: "4px",
        backgroundColor: "#444",
        transition: "background-color 0.3s",
    },
    activeSidebarLink: {
        backgroundColor: "#19233f", 
        color: "#fff",
        fontWeight: "bold",
    },
    logoutContainer: {
        marginTop: "auto", 
    },
    logoutButton: {
        backgroundColor: "#ff4d4f",
        color: "#fff",
        border: "none",
        padding: "10px 15px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        width: "100%",
    },
};

export default Sidebar;
