import type z from "zod";
import { useForm } from "react-hook-form"
import { useProducts } from "../hooks/useFetcProducts";
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from "../validations/productSchema";
import { InputLabel } from "./InputLabel";
import { ButtonComponent } from "./ButtonComponent";
import CloseIcon from '@mui/icons-material/Close';

type productData = z.infer<typeof productSchema>;

interface IProductForm {
    onClick: () => void;
}

export const ProductForm = ({ onClick }: IProductForm) => {
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
            onClick();
        } catch (err) {
            alert('Error al registrar producto');
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-xs"
                onClick={onClick}
            />
            <div className="relative w-1/3 p-6 bg-gray-200 rounded-lg shadow-lg">
                <button
                    onClick={onClick}
                    className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
                >
                    <CloseIcon />
                </button>
                <h1 className="text-2xl font-bold mb-6">Agregar Producto</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                >
                    <div className="flex flex-col">
                        <InputLabel
                            id="product"
                            type="text"
                            label="Nombre del producto"
                            placeholder="Producto"
                            register={{ ...register('product') }}
                            errors={errors.product?.message && (
                                <span className="text-red-500 text-sm">{errors.product?.message}</span>
                            )}
                        />
                    </div>
                    <div className="flex flex-col">
                        <InputLabel
                            id="price"
                            type="number"
                            label="Precio del producto"
                            placeholder="Precio"
                            register={{ ...register('price') }}
                            errors={errors.price?.message && (
                                <span className="text-red-500 text-sm">{errors.price?.message}</span>
                            )}
                        />
                    </div>
                    <div className="flex flex-col">
                        <InputLabel
                            id="quantity"
                            type="number"
                            label="Cantidad del producto"
                            placeholder="Cantidad"
                            register={{ ...register('quantity') }}
                            errors={errors.quantity?.message && (
                                <span className="text-red-500 text-sm">{errors.quantity?.message}</span>
                            )}
                        />
                    </div>

                    <ButtonComponent text="Registrar producto" type="submit" />
                </form>
            </div>
        </div>
    )
}
