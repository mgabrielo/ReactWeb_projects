import { Button } from "react-bootstrap";

interface LoggedOutProps {
    onSignUpClick: () => void
    onLogInClick: () => void
}

const LoggedOutView = ({ onSignUpClick, onLogInClick }: LoggedOutProps) => {
    return (
        <>
            <Button onClick={onSignUpClick}>Sign Up</Button>
            <Button onClick={onLogInClick}>Log In</Button>
        </>
    );
}

export default LoggedOutView;