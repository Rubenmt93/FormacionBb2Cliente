import { Route, Routes} from 'react-router-dom'
import ItemDetail from './components/ItemDetail';
import ItemsTable from './components/ItemsTable';
import NavBar from './components/Navbar';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import UserDetail from './components/UserDetail';
function App() {
 
  return (
    <div className="App">
      <div>

        <NavBar/>
     
        <section>
          <Routes>
            <Route path="/" element= {<ItemsTable/>} />
            <Route path="/itemsDetails/:idItem" element= {<ItemDetail/>} />
            <Route path="/login"  element={<Login/>}/> 
            <Route path="/adminPanel"  element={<AdminPanel/>}/> 
            <Route path="/userDetails/:idUser" element= {<UserDetail/>} />
            <Route path="*" element={<ItemsTable/>} />
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default App;






