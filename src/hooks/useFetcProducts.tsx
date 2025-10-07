import axios from "axios";
import { useEffect, useState } from "react";
import { useProductsStore } from "../store/productsStore";

interface Product {
    id_product: number;
    product: string;
    price: number;
    quantity: number;
}

const endPointProducts = 'http://localhost:3000/products'

export function useProducts() {
    const { products, addProduct, updateProduct: updateStore, deleteProduct: deleteStore, setProducts } = useProductsStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            const res = await axios.get<Product[]>(endPointProducts);
            setProducts(res.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchProductUserById = async (id_product: number): Promise<Product | null> => {
        try {
            const res = await axios.get<Product>(`${endPointProducts}/${id_product}`);
            return res.data;
        } catch (err: any) {
            setError(err.message);
            return null;
        }
    };

    const createProduct = async (newProduct: Omit<Product, 'id_product'>) => {
        const res = await axios.post<Product>(endPointProducts, newProduct);
        addProduct(res.data);
    };

    const updateProduct = async (id_product: number, updatedProduct: Partial<Product>) => {
        const res = await axios.put<Product>(`${endPointProducts}/${id_product}`, updatedProduct);
        updateStore(id_product, res.data);
    };

    const deleteProduct = async (id_product: number) => {
        await axios.delete(`${endPointProducts}/${id_product}`);
        deleteStore(id_product);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        loading,
        error,
        createProduct,
        updateProduct,
        deleteProduct,
        fetchProducts,
        fetchProductUserById
    };
}
