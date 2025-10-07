import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users";
import productsRoutes from "./routes/products";


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/products", productsRoutes);

app.listen(PORT, () => {
    console.log("Servidor backend corriendo en http://localhost:3000");
});