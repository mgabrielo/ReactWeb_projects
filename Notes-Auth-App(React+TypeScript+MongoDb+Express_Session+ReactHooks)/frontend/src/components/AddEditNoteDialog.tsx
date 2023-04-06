import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/note_api";
import * as NotesApi from '../network/note_api'
import {Note} from "../models/notes";
import TextInputField from "./TextInputField";

interface AddEditNoteDialogProps{
    noteEdit?: Note,
    onDismiss: ()=> void, 
    onNoteSaved : (note :Note)=> void, 
}

const AddEditNoteDialog = ({onDismiss, onNoteSaved, noteEdit}: AddEditNoteDialogProps) => {


    const { register, handleSubmit, formState:{ errors, isSubmitting} } = useForm<NoteInput>({
        defaultValues:{
            title: noteEdit?.title || "",
            text: noteEdit?.text || ""
        }
    });

    async function onSubmit(input : NoteInput){
        try {
            let noteResponse : Note
            if(noteEdit){
                noteResponse = await NotesApi.updateNote(noteEdit._id, input)
            }else{
                noteResponse = await NotesApi.createNote(input);
            }

            onNoteSaved(noteResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (  
        <Modal show onHide={onDismiss} >
            <Modal.Header closeButton>
                <Modal.Title>
                   {noteEdit ? "Edit Note" : "Add Note"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                    name="title" label ="Title" type ="text" placeholder="Title" 
                    register={register} registerOptions={{required: "Required"}}
                    error={errors.title}
                    />

                    <TextInputField 
                    name = "text"
                    label = "Text"
                    as ="textarea"
                    rows = {5}
                    placeholder = "Text"
                    register = {register}
                    />
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type = "submit" form="addEditNoteForm" disabled ={isSubmitting} >Save</Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default AddEditNoteDialog ;