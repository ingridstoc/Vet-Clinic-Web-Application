import {getProprietar, getProprietariAnimaleAceeasiSpecie} from "../controllers/proprietari.js"
import express from "express";
const router = express.Router()
router.get("/propietar", getProprietar)
router.get("/proprietar/aceeasispecie", getProprietariAnimaleAceeasiSpecie)
export default router