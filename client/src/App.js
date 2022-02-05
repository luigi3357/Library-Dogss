import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage/landingPage'
import Home from './components/Home/home';
import { Form } from './components/FormCreated/FormCreated';
import { Detail } from './components/Detail/Detail';


function App() {
  return (
    <Router>
    <div className="App">
     
      <Routes>        
        <Route path="/home" element={<Home />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/dog" element={<Form/>}></Route>
        <Route path='/home/:id' element={<Detail/>}></Route>
        </Routes>     
    </div>
    </Router>
  );
}

export default App;
