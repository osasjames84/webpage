import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AdminLayout from "../../Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";

const Inventory = () => {
    const { inventoryItems } = usePage().props;
    const [items, setItems] = useState(inventoryItems || []);
    const [search, setSearch] = useState("");

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this item?")) {
            Inertia.delete(`/admin/inventory/${id}`);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get(
            "/admin/inventory",
            { search },
            {
                onSuccess: (page) => setItems(page.props.inventoryItems),
            }
        );
    };

    const handlePageChange = (url) => {
        if (url) {
            Inertia.get(url);
        }
    };

    return (
        <AdminLayout>
            <div style={styles.container}>
                <h1 style={styles.heading}>Inventory Management</h1>

                <form onSubmit={handleSearch} style={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Search inventory..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.searchButton}>
                        Search
                    </button>
                </form>

                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>#</th>
                            <th style={styles.th}>Item Name</th>
                            <th style={styles.th}>Quantity</th>
                            <th style={styles.th}>Price</th>
                            <th style={styles.th}>Category</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.data.map((item, index) => (
                            <tr key={item.id}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>{item.name}</td>
                                <td style={styles.td}>{item.quantity}</td>
                                <td style={styles.td}>${item.price}</td>
                                <td style={styles.td}>{item.category}</td>
                                <td style={styles.td}>
                                    <a
                                        href={`/admin/inventory/${item.id}/edit`}
                                        style={styles.editButton}
                                    >
                                        Edit
                                    </a>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        style={styles.deleteButton}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={styles.paginationContainer}>
                    {items.links.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(link.url)}
                            style={{
                                ...styles.paginationButton,
                                ...(link.active
                                    ? styles.activePaginationButton
                                    : {}),
                            }}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    heading: {
        fontSize: "28px",
        color: "#333",
        marginBottom: "20px",
    },
    searchForm: {
        marginBottom: "20px",
        display: "flex",
        gap: "10px",
    },
    input: {
        padding: "8px",
        fontSize: "14px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        flex: 1,
    },
    searchButton: {
        padding: "8px 12px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    th: {
        textAlign: "left",
        padding: "10px",
        backgroundColor: "#f5f5f5",
        border: "1px solid #ddd",
    },
    td: {
        padding: "10px",
        border: "1px solid #ddd",
    },
    editButton: {
        marginRight: "10px",
        padding: "5px 10px",
        backgroundColor: "#28a745",
        color: "#fff",
        borderRadius: "4px",
        cursor: "pointer",
    },
    deleteButton: {
        padding: "5px 10px",
        backgroundColor: "#dc3545",
        color: "#fff",
        borderRadius: "4px",
        cursor: "pointer",
    },
    paginationContainer: {
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "10px",
    },
    paginationButton: {
        padding: "8px 12px",
        border: "1px solid #ddd",
        backgroundColor: "#fff",
        color: "#007bff",
        borderRadius: "4px",
        cursor: "pointer",
    },
    activePaginationButton: {
        backgroundColor: "#007bff",
        color: "#fff",
        fontWeight: "bold",
    },
};

export default Inventory;
