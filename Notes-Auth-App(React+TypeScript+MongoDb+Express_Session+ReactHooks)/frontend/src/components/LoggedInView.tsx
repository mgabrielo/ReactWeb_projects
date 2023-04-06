import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from "../network/note_api";

interface LoggedInViewProps {
    user: User,
    onLogOutSuccessFul: () => void,
}

const LoggedInView = ({ user, onLogOutSuccessFul }: LoggedInViewProps) => {

    async function logout() {
        try {
            await NotesApi.logOut();
            onLogOutSuccessFul();
        } catch (error) {
            alert(error);
            console.error(error)
        }
    }

    return (
        <>
            <Navbar.Text className="me-2"> Signed in as: {user.username}</Navbar.Text>
            <Button onClick={logout}>LogOut</Button>
        </>
    );
}

export default LoggedInView;