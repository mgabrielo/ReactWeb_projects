import styled from "styled-components";
import bg from './img/backg.png';
import { MainLayout } from "./styles/Layout.js";
import Orb from "./components/Orb/Orb";
import Navigation from "./components/Navigation/Navigation";
import { useMemo, useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Expenses from "./components/Expenses/Expenses";
import Incomes from "./components/Incomes/Incomes";
import { useGlobalContext } from "./context/globalContext";

function App() {
  const [active, setActive] = useState(1)
  const orbMemo = useMemo(() => {
    return <Orb />
  }, [])

  const global = useGlobalContext();
  console.log(global)

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />
      // case 2:
      //   return  <></>
      case 2:
        return <Incomes />
      case 3:
        return <Expenses />
      default:
        return <Dashboard />
    }
  }

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  );
}
const AppStyled = styled.div`
height: 100vh;
background-image: url(${props => props.bg});
position: relative;
main{
  flex: 1;
  background: rgba(252, 246, 249, 0.78);
  padding:3px;
  border: 3px solid #FFFFFF;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 10px;
    height: 9px;
    }
    
    ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px #CF9FFF;
    border-radius: 10px;
    margin:1rem;
    }
    
    ::-webkit-scrollbar-thumb {
  
    border-radius: 10px;
    background: #BF40BF; 
    box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
    }
}
`;

export default App;
