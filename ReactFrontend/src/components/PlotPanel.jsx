import "../styles/Panel.css";
import "../styles/RoundedBorder.css";
import { useQuery } from "react-query";
import axios from "axios";
import Plot from "react-plotly.js";

const fetchJSON = () => {

  let ticker = "AAPL/apple"
  //let ticker = "JPM/jpmorgan-chase"
  const backendHost = "http://localhost:8000/"
  let queryString = backendHost + ticker


  return axios.get(queryString);
};

function PlotPanel() {
  let { data, error, isError, isLoading } = useQuery(
    "json-tutorial-code",
    fetchJSON,
    {
      staleTime: 3600000,
      cacheTime: 3600000,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  console.log(data);
  let plot_data = JSON.parse(data.data);
  console.log(plot_data);

  let date = plot_data["date"];
  let price = plot_data["price"];
  let price_to_sales = plot_data["price_to_sales_ratio"];

  

  
  //console.log(price_to_sales);

  
  
  const PriceData = [

    {
      x: date,
      y: price,
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "blue" },
    }

  ]
  

  const PricePlotLayout = {
    margin : { 
      l: 5, 
      r: 5, 
      t: 10, 
      b: 10, 
      },
    xaxis: {
      tickangle: 45,
      rangeslider: { visible: true },
    },
    yaxis: { title: "Price ($)", automargin:true },
  }

  


  const PriceToSalesData = [

    {
      x: date,
      y: price_to_sales,
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "red" },
    }

  ]

  const PriceToSalesPlotLayout = {
    margin : { 
      l: 5, 
      r: 5, 
      t: 10, 
      b: 10, 
      },
    xaxis: {
      tickangle: 45,
      rangeslider: { visible: true },
    },
    yaxis: { title: "Price to Sales ($)", automargin:true },
  }
  

  const PlotlyStyle = {width: "100%", height: "100%"}




  return (
    <div className="container-fluid p-5 my-5 text-center Panel">
      <h1>Plot</h1>


      <div className="RoundedBorder">
      
      <Plot 
        data = {PriceData}
        layout={PricePlotLayout}
        style={PlotlyStyle}
        useResizeHandler={true} 
        plot_bgcolor = 'black'
      />

      </div>

       <Plot
        data = {PriceToSalesData}
        layout={PriceToSalesPlotLayout}
        style={PlotlyStyle}
        useResizeHandler={true} 
      />

     

    </div>
  );
}

export default PlotPanel;
