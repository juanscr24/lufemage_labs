import { useForm } from "react-hook-form"
import { useProducts } from "../hooks/useFetcProducts";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from "../validations/productSchema";
import type z from "zod";

type productData = z.infer<typeof productSchema>;

export const ProductForm = () => {
    const { createProduct } = useProducts();
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(productSchema)
    })

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
            <div className="flex flex-col">
                <Input
                    id="product"
                    placeholder="Producto"
                    {...register('product')}
                />
                {errors.product?.message && <span className="text-red-500 text-sm">{errors.product?.message}</span>}
            </div>

            <div className="flex flex-col">
                <Input
                    id="price"
                    type="number"
                    placeholder="Precio"
                    {...register('price')}
                />
                {errors.price?.message && <span className="text-red-500 text-sm">{errors.price?.message}</span>}
            </div>

            <div className="flex flex-col">
                <Input
                    id="quantity"
                    type="number"
                    placeholder="Cantidad"
                    {...register('quantity')}
                />
                {errors.quantity?.message && <span className="text-red-500 text-sm">{errors.quantity?.message}</span>}
            </div>

            <Button type="submit" variant="outlined">
                Registrar producto
            </Button>
        </form>
    )
}
