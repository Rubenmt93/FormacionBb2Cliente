import { Route, Routes} from 'react-router-dom'
import ItemDetail from './components/ItemDetail';
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
            <Route path="/itemsDetails/:idItem" element= {<ItemDetail/>} />
            <Route path="/login"  element={<Login/>}/> 
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default App;






