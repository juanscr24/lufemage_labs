import { useState } from "react";
import { useProducts } from "../hooks/useFetcProducts";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
} from "@mui/material";

interface Product {
    id_product: number;
    product: string;
    price: number;
    quantity: number;
}

export const ProductTable = () => {
    const { products, updateProduct, deleteProduct } = useProducts();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<Partial<Product>>({});

    const handleEdit = (product: Product) => {
        setEditingId(product.id_product);
        setEditData(product);
    };

    const handleSave = async () => {
        if (editingId !== null) {
            await updateProduct(editingId, editData);
            setEditingId(null);
            setEditData({});
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditData({});
    };

    const handleDelete = async (id: number) => {
        await deleteProduct(id);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="products table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Producto</strong></TableCell>
                        <TableCell align="right"><strong>Precio</strong></TableCell>
                        <TableCell align="right"><strong>Cantidad</strong></TableCell>
                        <TableCell align="right"><strong>Acciones</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((row) => (
                        <TableRow key={row.id_product}>
                            <TableCell component="th" scope="row">
                                {editingId === row.id_product ? (
                                    <TextField
                                        value={editData.product || ''}
                                        onChange={(e) => setEditData({ ...editData, product: e.target.value })}
                                    />
                                ) : (
                                    row.product
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {editingId === row.id_product ? (
                                    <TextField
                                        type="number"
                                        value={editData.price || ''}
                                        onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
                                    />
                                ) : (
                                    `$${row.price}`
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {editingId === row.id_product ? (
                                    <TextField
                                        type="number"
                                        value={editData.quantity || ''}
                                        onChange={(e) => setEditData({ ...editData, quantity: Number(e.target.value) })}
                                    />
                                ) : (
                                    row.quantity
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {editingId === row.id_product ? (
                                    <>
                                        <Button onClick={handleSave} color="primary">Guardar</Button>
                                        <Button onClick={handleCancel} color="secondary">Cancelar</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={() => handleEdit(row)} color="primary">Editar</Button>
                                        <Button onClick={() => handleDelete(row.id_product)} color="error">Eliminar</Button>
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductTable;
