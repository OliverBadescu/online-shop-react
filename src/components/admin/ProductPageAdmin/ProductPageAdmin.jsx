import React, { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getAllProducts, updateProduct, deleteProduct } from "../../../services/api/productsService";
import { useNavigate, Link } from 'react-router-dom';

export default function ProductPageAdmin() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editFormData, setEditFormData] = useState({
        category: '',
        description: '',
        name: '',
        price: '',
        stock: 0,
        weight: 0,
    });
    const [searchTerm, setSearchTerm] = useState(""); 

    const columns = [
        { id: "name", label: "Product Name", minWidth: 170 },
        { id: "category", label: "Category", minWidth: 100 },
        { id: "price", label: "Price ($)", minWidth: 100, align: "right" },
        { id: "stock", label: "Stock", minWidth: 100, align: "right" },
        { id: "actions", label: "Actions", minWidth: 100, align: "right" }
    ];

    const fetchProducts = async () => {
        try {
            let data = await getAllProducts();
            if (data && Array.isArray(data.body.list)) {
                setProducts(data.body.list);
                setFilteredProducts(data.body.list); 
            } else {
                console.error("Invalid API response: ", data);
            }
        } catch (err) {
            console.error("Error fetching products: ", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

   
    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setEditFormData({
            category: product.category,
            description: product.description,
            name: product.name,
            price: product.price,
            stock: product.stock,
            weight: product.weight
        });
        setOpenEditDialog(true);
    };

    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
    };

    const handleEditFormSubmit = async () => {
        try {
            await updateProduct(selectedProduct.id, editFormData);
            setOpenEditDialog(false);
            fetchProducts();
        } catch (err) {
            console.error("Error updating product: ", err);
        }
    };

    const handleDeleteClick = async (productId) => {
        try {
            await deleteProduct(productId);
            fetchProducts();
        } catch (err) {
            console.error("Error deleting product: ", err);
        }
    };

    return (
        <>
            <div className="header-container">
                <h1>Furniro</h1>
                <div className="navigation-container admin-container-nav">
                    <Link to={'/admin-page'}>Home</Link>
                    <a href="#">Orders</a>
                    <a href="#">Users</a>
                </div>
            </div>

            <div className="main-container-admin container-products-admin">
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="Search by product name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

                <div className="products-container">
                    <h2>All Products</h2>
                    <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                                    {filteredProducts
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((product) => (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={product.id}>
                                                {columns.map((column) => {
                                                    if (column.id === "actions") {
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={() => handleEditClick(product)}
                                                                >
                                                                    Edit
                                                                </Button>
                                                                <Button
                                                                    variant="contained"
                                                                    color="secondary"
                                                                    onClick={() => handleDeleteClick(product.id)}
                                                                    style={{ marginLeft: '10px' }}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </TableCell>
                                                        );
                                                    }
                                                    const value = product[column.id];
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

            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Product Name"
                        type="text"
                        fullWidth
                        value={editFormData.name}
                        onChange={handleEditFormChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="description"
                        label="Product Description"
                        type="text"
                        fullWidth
                        value={editFormData.description}
                        onChange={handleEditFormChange}
                    />
                    <TextField
                        margin="dense"
                        name="category"
                        label="Category"
                        type="text"
                        fullWidth
                        value={editFormData.category}
                        onChange={handleEditFormChange}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        value={editFormData.price}
                        onChange={handleEditFormChange}
                    />
                    <TextField
                        margin="dense"
                        name="stock"
                        label="Stock"
                        type="number"
                        fullWidth
                        value={editFormData.stock}
                        onChange={handleEditFormChange}
                    />
                    <TextField
                        margin="dense"
                        name="weight"
                        label="Weight"
                        type="number"
                        fullWidth
                        value={editFormData.weight}
                        onChange={handleEditFormChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                    <Button onClick={handleEditFormSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}