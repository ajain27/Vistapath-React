import './App.css';
import AddCase from './components/AddCase/AddCase';

function App() {

  return (
    <div className="App">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg">
          <div className="navbar-brand nav-brand" href="#">VISTAPATH CASE LIST</div>
        </nav>
        <AddCase></AddCase>
      </div>
    </div>
  );
}

export default App;