import './App.css';
import Routes from './services/routes';
import NavBar from './components/Navbar/Navbar'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes />
      </BrowserRouter>
    </div>
  );
}
export default App;
