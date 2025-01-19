import express from "express";
import {getMedic, createMedic, deleteMedic, getConsultatiiMediciNume, getConsultatiiMediciAn, editMedic} from "../controllers/medic.js";
import { getMedicConsultatie120, getMedicMaxConsultatii} from "../controllers/medic.js";
const router = express.Router()
router.get("/medic", getMedic)
router.post("/medic", createMedic) //create
router.delete("/medic/:id", deleteMedic)
router.put("/medic/:id", editMedic) //update
router.get("/medic/consultatiinume", getConsultatiiMediciNume)
router.get("/medic/consultatiian", getConsultatiiMediciAn)
router.get("/medic/getconsultatii120", getMedicConsultatie120)
router.get("/medic/getmaxconsultatii", getMedicMaxConsultatii)
export default router