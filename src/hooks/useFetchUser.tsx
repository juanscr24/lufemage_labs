import axios from "axios";
import { useEffect, useState } from "react";

interface User {
    id_user: number;
    email_user: string;
    password_user: string;
}

const endPointUsers = 'http://localhost:3000/users'

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = async () => {
        try {
            const res = await axios.get<User[]>(endPointUsers);
            setUsers(res.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserUserById = async (id_user: number): Promise<User | null> => {
        try {
            const res = await axios.get<User>(`${endPointUsers}/${id_user}`);
            return res.data;
        } catch (err: any) {
            setError(err.message);
            return null;
        }
    };

    const createUser = async (newUser: Omit<User, 'id_user'>) => {
        const res = await axios.post<User>(endPointUsers, newUser);
        setUsers([...users, res.data]);
    };

    const updateUser = async (id_user: number, updatedUser: Partial<User>) => {
        const res = await axios.put<User>(`${endPointUsers}/${id_user}`, updatedUser);
        setUsers(users.map(user => (user.id_user === id_user ? res.data : user)));
    };

    const deleteUser = async (id_user: number) => {
        await axios.delete(`${endPointUsers}/${id_user}`);
        setUsers(users.filter(user => user.id_user !== id_user));
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return {
        users,
        loading,
        error,
        createUser,
        updateUser,
        deleteUser,
        fetchUser,
        fetchUserUserById
    };
}