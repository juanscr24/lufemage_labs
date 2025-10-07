import { create } from 'zustand';

interface Product {
    id_product: number;
    product: string;
    price: number;
    quantity: number;
}

interface ProductsState {
    products: Product[];
    addProduct: (product: Product) => void;
    updateProduct: (id: number, updatedProduct: Product) => void;
    deleteProduct: (id: number) => void;
    setProducts: (products: Product[]) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
    products: [],
    addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
    updateProduct: (id, updatedProduct) => set((state) => ({
        products: state.products.map(p => p.id_product === id ? updatedProduct : p)
    })),
    deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id_product !== id)
    })),
    setProducts: (products) => set({ products }),
}));
