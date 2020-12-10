import './App.css';
import AddCase from './components/AddCase/AddCase';
import Home from './components/Home';

function App() {

  return (
    <div className="App">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg">
          <div className="navbar-brand nav-brand" href="#">VISTAPATH CASE LIST</div>
        </nav>
        <AddCase></AddCase>
        <Home></Home>
      </div>
    </div>
  );
}

export default App;