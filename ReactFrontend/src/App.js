import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import "bootstrap/dist/js/bootstrap.js"

import Header from './components/Header';
import Plot from './components/PlotPanel';

function App() {

  return (
    <div className="App">

       <Header/>
       <Plot/>

    </div>

  );

}

export default App;
