import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ButtonComponent } from "./ButtonComponent"
import { useState } from 'react';
import { ProductForm } from './ProductForm';

export const ProductMangament = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex justify-between mb-8 relative">
            <h1 className="text-4xl font-bold">Gestion de Productos</h1>
            <ButtonComponent onClick={() => setOpen(true)} fit text="Crear Nuevo Producto" type="button" icon={<AddCircleOutlineIcon />} />
            {open && <ProductForm onClick={() => setOpen(false)} />}
        </div>
    )
}
