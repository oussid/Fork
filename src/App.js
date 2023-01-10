import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './features/recipe/components/Nav';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Show from './pages/Show';



function App() {
  return (
    <div className="App">
      <Nav logo='/images/fork_logo.png'/>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/recipe/:id' element={<Show/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
