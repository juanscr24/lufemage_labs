import { useForm } from "react-hook-form"
import { useProducts } from "../hooks/useFetcProducts";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

interface productData {
    product: string;
    price: number;
    quantity: number;
}

export const ProductForm = () => {
    const { createProduct } = useProducts();
    const { register, reset, handleSubmit } = useForm<productData>()

    const onSubmit = async (data: productData) => {
        if (data.product.trim() === '') {
            alert('El nombre del producto no puede estar vacío');
            return;
        }
        try {
            await createProduct(data);
            alert('Producto registrado exitosamente');
            reset();
        } catch (err) {
            alert('Error al registrar producto');
            console.error(err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex p-4 bg-gray-200 rounded-lg gap-10 justify-around'
        >
            <Input
                id="product"
                placeholder="Producto"
                {...register('product')}
            />

            <Input
                id="price"
                type="number"
                placeholder="Precio"
                {...register('price')}
            />

            <Input
                id="quantity"
                type="number"
                placeholder="Cantidad"
                {...register('quantity')}
            />

            <Button type="submit" variant="outlined">
                Registrar producto
            </Button>
        </form>
    )
}
