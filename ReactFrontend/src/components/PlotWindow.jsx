import '../styles/Panel.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Plot from 'react-plotly.js';


const fetchJSON = () => {
 
     return axios.get('http://localhost:8000')

}

function PlotContainer() {

    const {data, error, isError, isLoading } = useQuery('json-tutorial-code', fetchJSON, {

    staleTime: 3600000,
    cacheTime: 3600000,

    });

    
   
    if(isLoading) {

        return <div>Loading...</div>
    }

    if(isError) {

        return <div>Error! {error.message}</div>
    }

    console.log(data)
    const plot_data = JSON.parse(data.data)
    console.log(plot_data)
    
    const date = plot_data["date"]
    const price = plot_data["price"]
    const sales = plot_data["sales"]
    const price_to_sales = plot_data["price_to_sales"]
    console.log(price)

    return (
    
        <div className='container-fluid p-5 my-5 text-center Panel'>
        <h1>Plot</h1>
        
       
        
        <Plot
                  data = { [

                    {
                      x: date,
                      y: price,
                      type: 'scatter',
                      mode: 'lines+markers',
                      marker: {color: 'red'},
                    }
                  
                  ] }

                  layout={ {width: "80%", height: "80%", title: 'Ticker symbol'} }

        />
        
        </div>

    );

  
  }
  
  export default PlotContainer;




