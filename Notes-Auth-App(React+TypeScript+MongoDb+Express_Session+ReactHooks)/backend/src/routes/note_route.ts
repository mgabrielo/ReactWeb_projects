import express from "express";
import * as note_controls from "../controller/note_control";

const router = express.Router();

router.get("/", note_controls.getNotes);

router.post("/", note_controls.createNote);

router.get("/:noteId", note_controls.getNote);

router.patch("/:noteId", note_controls.updateNote);

router.delete("/:noteId", note_controls.deleteNote);

export default router;
