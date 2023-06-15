import {Switch, Route, Link, Routes} from 'react-router-dom'
import ItemCard from './components/ItemCard';
import Items from './components/items';
import NavBar from './components/Navbar';
import Login from './components/Login';

function App() {
 
  return (
    <div className="App">
      <div>

        <NavBar/>
     
        <section>
          <Routes>
            <Route path="/" element= {<Items/>} />
            <Route path="/items/:idItem" element= {<ItemCard/>} />
            <Route path="/login"  element={<Login/>}/> 
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default App;






