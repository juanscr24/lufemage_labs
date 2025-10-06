import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);

app.listen(PORT, () => {
    console.log("Servidor backend corriendo en http://localhost:3000");
});