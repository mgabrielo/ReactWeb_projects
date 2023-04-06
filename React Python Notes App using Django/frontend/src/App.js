import Header from './components/header'
import NotesListPage from './pages/NotesListPage'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotePage from './pages/NotePage'


function App() {
  return (
    <Router>
      <div className="container dark">
        <div className='app'>
          <Header />
          <Routes>
            <Route path="/" element={<NotesListPage />} />
            <Route path="/note/:id" element={<NotePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
