import './App.css';

import { Navigate, Route, Routes} from 'react-router-dom';

import { ListarTodo } from './fragment/ListarTodo';
import ActualizarVentanaPersonas from './fragment/ActualizarVentanaPersonas';
function App() {
  return (
    <Routes>
      <Route path ='/' element= {<ListarTodo/>}/>
      <Route path ='/a' element= {<ActualizarVentanaPersonas/>}/>
    </Routes>
  );
}

export default App;