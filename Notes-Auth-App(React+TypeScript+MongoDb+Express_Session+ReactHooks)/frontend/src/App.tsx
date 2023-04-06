import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import LogInModal from './components/LogInModal';
import NavBar from './components/NavBar';
import * as NotesApi from './network/note_api';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import styles from "./styles/NotePage.module.css";
import NotePageLogInView from './components/NotePageLogInView';
import NotesPageLogOut from './components/NotesPageLogOut';



function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    async function fetchLoggedInUsers() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error)
      }
    }
    fetchLoggedInUsers();
  }, [])

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogInClicked={() => setShowLoginModal(true)}
        onLogOutSuccess={() => setLoggedInUser(null)}

      />

      <Container className={styles.notesPage}>

        <>
          {loggedInUser
            ? <NotePageLogInView />
            : <NotesPageLogOut />}
        </>
      </Container>
      {
        showSignUpModal &&
        <SignUpModal
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      }


      {
        showLoginModal &&
        <LogInModal
          onDismiss={() => setShowLoginModal(false)}
          onLogInSuccess={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      }

    </div>
  );
}

export default App;
