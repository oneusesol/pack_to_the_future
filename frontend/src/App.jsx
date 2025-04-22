
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Splash from './pages/splash';
import Home from './pages/Home';
import Login from './pages/Login';
//import Map from './pages/Map';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;