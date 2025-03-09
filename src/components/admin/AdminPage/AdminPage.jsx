import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../services/state/UserContext";
import { PieChart } from '@mui/x-charts';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getRecentOrders } from "../../../services/api/orderService";

export default function AdminPage() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const columns = [
        { id: 'userEmail', label: 'User Email', minWidth: 170 },
        { id: 'orderAmount', label: 'Amount', minWidth: 100, align: 'right' },
        { id: 'orderDate', label: 'Order Date', minWidth: 170, align: 'right' },
        { id: 'orderStatus', label: 'Order Status', minWidth: 170, align: 'right' }
    ];

    const createData = (order) => {
        return {
            id: order.id,
            userEmail: order.orderEmail,
            orderAmount: `$${order.amount.toFixed(2)}`,
            orderDate: new Date(order.orderDate).toLocaleDateString(),
            orderStatus: order.orderStatus
        };
    };

    const fetchOrders = async () => {
        try {
            let data = await getRecentOrders();
    
            if (data && Array.isArray(data.body.list)) {
                const formattedOrders = data.body.list.map(order => createData(order));
                setOrders(formattedOrders);
            } else {
                console.error("Invalid API response: ", data);
            }
        } catch (err) {
            console.error("Error fetching orders: ", err);
        }
    };
    
    useEffect(() => {
        fetchOrders();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <div className="header-container">
                <h1>Furniro</h1>
                <div className="navigation-container">
                    <a href="#"><p>Products</p></a>
                    <a href="#">Users</a>
                </div>
            </div>

            <div className="main-container-admin">
                <div className="piechart-container">
                    <PieChart
                        series={[{
                            data: [
                                { id: 0, value: 10, label: 'Total Orders' },
                                { id: 1, value: 15, label: 'Revenue' },
                                { id: 2, value: 20, label: 'Products' },
                            ],
                        }]}
                        width={400}
                        height={200}
                    />
                </div>

                <div className="orders-container">
                    <h2>Recent Orders</h2>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        
                    </Paper>
                </div>
            </div>
        </>
    );
}
