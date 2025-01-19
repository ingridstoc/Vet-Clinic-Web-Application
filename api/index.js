import express from "express";
const app = express();
import medicRoutes from "./routes/medic.js"
import pacientRoutes from "./routes/pacient.js"
import proprietarRoutes from "./routes/proprietari.js"
import cors from "cors"

app.use(express.json())
app.use(cors())

app.use("/api", medicRoutes)
app.use("/api", pacientRoutes)
app.use("/api", proprietarRoutes)

app.listen(8800, () => {
console.log("API working!");
});