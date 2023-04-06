import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import LoggedInView from "./LoggedInView";
import LoggedOutView from "./LoggedOutView";

interface NavBarProps {
    loggedInUser: User | null;
    onSignUpClicked: () => void,
    onLogInClicked: () => void,
    onLogOutSuccess: () => void,
}

const NavBar = ({ loggedInUser, onSignUpClicked, onLogInClicked, onLogOutSuccess }: NavBarProps) => {
    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand>
                    Auth Notes App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        {loggedInUser ?
                            <LoggedInView user={loggedInUser} onLogOutSuccessFul={onLogOutSuccess} />
                            : <LoggedOutView onLogInClick={onLogInClicked} onSignUpClick={onSignUpClicked} />
                        }
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}

export default NavBar;