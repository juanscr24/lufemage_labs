import { Request, Response } from "express";
import db from "../db";

export const getUsers = (_: Request, res: Response): void => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json(results);
    });
};

export const createUser = (req: Request, res: Response): void => {
    const { email_user, password_user } = req.body;
    db.query(
        "INSERT INTO users (email_user, password_user) VALUES (?, ?)",
        [email_user, password_user],
        (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.json({ id_user: (result as any).insertId, email_user, password_user });
        }
    );
};

export const updateUser = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { email_user, password_user } = req.body;
    db.query(
        "UPDATE users SET email_user = ?, password_user = ? WHERE id_user = ?",
        [email_user, password_user, id],
        (err) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.json({ id_user: id, email_user, password_user });
        }
    );
};

export const deleteUser = (req: Request, res: Response): void => {
    const { id } = req.params;
    db.query("DELETE FROM users WHERE id_user = ?", [id], (err) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json({ message: "Usuario eliminado" });
    });
};
