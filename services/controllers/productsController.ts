import { Request, Response } from "express";
import db from "../db";

export const getProducts = (_: Request, res: Response): void => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) {
            res.status(400).json(err);
            return;
        }
        res.json(results);
    });
};

export const createProduct = (req: Request, res: Response): void => {
    const { product, price, quantity } = req.body;
    db.query(
        "INSERT INTO products (product, price, quantity) VALUES (?, ?, ?)",
        [product, price, quantity],
        (err, result) => {
            if (err) {
                res.status(400).json(err);
                return;
            }
            res.json({
                id_product: (result as any).insertId,
                product,
                price,
                quantity
            });
        }
    );
};

export const updateProduct = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { product, price, quantity } = req.body;
    db.query(
        "UPDATE products SET product = ?, price = ?, quantity = ? WHERE id_product = ?",
        [product, price, quantity, id],
        (err) => {
            if (err) {
                res.status(400).json(err);
                return;
            }
            res.json({
                id_product: id,
                product,
                price,
                quantity
            });
        }
    );
};

export const deleteProduct = (req: Request, res: Response): void => {
    const { id } = req.params;
    db.query("DELETE FROM products WHERE id_product = ?", [id], (err) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json({ message: "Producto eliminado" });
    });
};
