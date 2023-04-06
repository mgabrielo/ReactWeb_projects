import { Button, Col, Row, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import styles from "../styles/NotePage.module.css"
import { Note as NoteModel } from '../models/notes';
import AddNoteDialog from '../components/AddEditNoteDialog';
import * as NotesApi from '../network/note_api';
import styleUtils from "../styles/util.module.css"
import Note from "./Notes";

const NotePageLogInView = () => {

    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [notesLoading, setNotesLoading] = useState(true);
    const [notesLoadingError, setNotesloadingError] = useState(false);
    const [showAddNote, setShowAddNote] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);




    useEffect(() => {
        async function loadNotes() {

            try {
                setNotesloadingError(false);
                setNotesLoading(true);
                const notes = await NotesApi.fetchNotes();
                setNotes(notes);
            } catch (error) {
                console.log(error);
                setNotesloadingError(true);
            } finally {
                setNotesLoading(false)
            }

        }
        loadNotes();
    }, []);


    async function deleteNote(note: NoteModel) {
        try {
            await NotesApi.deleteNote(note._id);
            setNotes(notes.filter(existingNote => existingNote._id !== note._id))
        } catch (error) {
            console.log(error)
            alert(error);
        }
    }

    const NotesGrid =
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.NotesGrid}`}>
            {notes.map(note => (

                <Col key={note._id}>
                    <Note note={note} className={styles.note} onDeleteClick={deleteNote} onNoteClicked={setNoteToEdit} />
                </Col>

            ))}
        </Row>



    return (
        <>
            <Button className={`mb-4 mt-4 ${styleUtils.blockCenter}`} onClick={() => setShowAddNote(true)}> Add new Note</Button>
            {notesLoading && <Spinner animation='border' variant='primary' />}
            {notesLoadingError && <p>Something Went wrong : Please refresh Page </p>}
            {!notesLoading && !notesLoadingError &&
                <>
                    {notes.length > 0 ? NotesGrid : <p>No Note Has Been Added yet</p>}
                </>
            }
            {
                showAddNote &&
                <AddNoteDialog
                    onDismiss={() => setShowAddNote(false)}
                    onNoteSaved={(newNote) => {
                        setNotes([...notes, newNote]);
                        setShowAddNote(false);
                    }} />
            }

            {
                noteToEdit &&
                <AddNoteDialog
                    noteEdit={noteToEdit}
                    onDismiss={() => setNoteToEdit(null)}
                    onNoteSaved={(updatedNote) => {
                        setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));
                        setNoteToEdit(null);
                    }}
                />
            }

        </>
    );
}

export default NotePageLogInView;
