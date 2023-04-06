import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../models/note";
import { assertDefined } from "../util/assertDefined";
export const getNotes: RequestHandler = async (req, res, next) => {
  const authUserId = req.session.userId;

  try {
    assertDefined(authUserId);
    const notes = await NoteModel.find({userId: authUserId}).exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const authUserId = req.session.userId;

  try {
      assertDefined(authUserId);
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note Id");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Notes Not Found");
    }

    if(!note._id.equals(authUserId)){
      throw createHttpError(401, "You are not authorised to access this notes");
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface createNoteBody {
  title: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  createNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  const authUserId = req.session.userId;
  
  try {
    assertDefined(authUserId);
    if (!title) {
      throw createHttpError(400, "Notes must have a title");
    }

    const newNote = await NoteModel.create({
      userId: authUserId,
      title: title,
      text: text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface updateNoteParam {
  noteId: string;
}

interface updatNoteBody {
  title: string;
  text?: string;
}

export const updateNote: RequestHandler<
  updateNoteParam,
  unknown,
  updatNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
 

  try {

    

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note Id");
    }

    if (!newTitle) {
      throw createHttpError(400, "Notes must have a title");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Notes Not Found");
    }

    note.title = newTitle;
    note.text = newText;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  
  try {

      if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note Id");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Notes Not Found");
    }

    await note.remove();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
