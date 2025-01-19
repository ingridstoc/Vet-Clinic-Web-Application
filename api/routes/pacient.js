import express from "express";
import {getPacient, createPacient, deletePacient, getBoliPacient, getPacientiNevindecati, getPacientAlProprietarului} from "../controllers/pacient.js";
import {getPacientiAn, getPacientiAiMedicului, editPacient} from "../controllers/pacient.js"
import { editMedic } from "../controllers/medic.js";
const router = express.Router()
router.get("/pacient", getPacient)
router.post("/pacient", createPacient)
router.delete("/pacient/:id", deletePacient)
router.put("/pacient/:id", editPacient)
router.get("/pacient/boalanume", getBoliPacient)
router.get("/pacient/nevindecati", getPacientiNevindecati)
router.get("/pacient/numeproprietar", getPacientAlProprietarului)
router.get("/pacient/an", getPacientiAn)
router.get("/pacient/dinmedic", getPacientiAiMedicului)
export default router