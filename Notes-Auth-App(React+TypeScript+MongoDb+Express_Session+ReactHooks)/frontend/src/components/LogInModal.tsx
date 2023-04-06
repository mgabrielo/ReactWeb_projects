import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LogInCredentials } from "../network/note_api";
import * as NotesApi from "../network/note_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./TextInputField";
import styleUtil from '../styles/util.module.css';

interface LogInModalProps {
    onDismiss: () => void,
    onLogInSuccess: (user: User) => void,
}

const LogInModal = ({ onDismiss, onLogInSuccess }: LogInModalProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LogInCredentials>();

    async function onSubmit(credentials: LogInCredentials) {
        try {
            const user = await NotesApi.logIn(credentials);
            onLogInSuccess(user);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addLoginForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        label="Username"
                        type="text"
                        Placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        Placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />

                    <Button type="submit" form="addLoginForm" disabled={isSubmitting} className={styleUtil.width100}>
                        Log In
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>

    );
}

export default LogInModal;