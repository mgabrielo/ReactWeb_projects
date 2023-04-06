import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/note_api";
import * as NotesApi from "../network/note_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./TextInputField";
import styleUtil from '../styles/util.module.css';

interface SignUpModalProps{
    onDismiss: ()=> void,
    onSignUpSuccessful: (user : User) =>void
}

const SignUpModal = ({onDismiss, onSignUpSuccessful}: SignUpModalProps) => {
    
    const {register, handleSubmit, formState: {errors, isSubmitting} } = useForm<SignUpCredentials>();

    async function onSubmit(credentials:SignUpCredentials) {
        try {
           
            const newUser = await NotesApi.signUp(credentials);

            onSignUpSuccessful(newUser);
        } catch (error) {
           alert(error);
           console.error(error) 
        }
    }
    
    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton> <Modal.Title> Sign Up</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form id="addsignupForm"  onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                    name="username"
                    label="username"
                    type="text"
                    placeholder="username"
                    register={register}
                    registerOptions = {{required: "Required"}}
                    error = {errors.username}
                    />

                    <TextInputField
                    name="email"
                    label="email"
                    type="email"
                    placeholder="email"
                    register={register}
                    registerOptions = {{required: "Required"}}
                    error = {errors.email}
                    />
                     
                    <TextInputField
                    name="password"
                    label="password"
                    type="password"
                    placeholder="Password"
                    register={register}
                    registerOptions = {{required: "Required"}}
                    error = {errors.password}
                    />

                    <Button type ="submit" form="addsignupForm" disabled={isSubmitting} className={styleUtil.width100}>
                        Sign Up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
     ); 
}
 
export default SignUpModal;