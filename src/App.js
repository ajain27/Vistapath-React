import './App.css';
import Routes from './components/Router';

function App() {

  return (
    <div className="App">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg">
          <div className="navbar-brand nav-brand" href="#">VISTAPATH CASE LIST</div>
        </nav>
        <Routes></Routes>
      </div>
    </div>
  );
}

export default App;