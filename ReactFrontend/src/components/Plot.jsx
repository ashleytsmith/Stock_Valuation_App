import '../styles/Panel.css';
import { useQuery } from 'react-query';
import axios from 'axios';


const fetchJSON = () => {


    
     return axios.get('http://localhost:8000')
    //works
    //return axios.get('https://jsonplaceholder.typicode.com/posts')



    //return axios.get('https://jsonplaceholder.typicode.com/users')
    //return axios.get('https://random.dog/woof.json')

    //return axios.get('https://www.macrotrends.net/stocks/charts/AAPL/apple/price-sales')
    //return axios.get('https://de.finance.yahoo.com/quote/AAPL?p=AAPL&.tsrc=fin-srch')
    //return axios.get('https://www.google.com')
    //return axios.get('https://en.wikipedia.org/wiki/Stock')
    
    
}

function Plot() {

    const {data, error, isError, isLoading } = useQuery('json-tutorial-code', fetchJSON, {

    staleTime: 3600000,
    cacheTime: 3600000,

    });

    console.log(data)
   
    if(isLoading) {

        return <div>Loading...</div>
    }

    if(isError) {

        return <div>Error! {error.message}</div>
    }

    return(
    
        <div className='container-fluid p-5 my-5 text-center Panel'>
        <h1>Posts</h1>
        
        {
            <div >{JSON.stringify(data.data)}</div>
            
        }

        

        </div>
    );

  
  }
  
  export default Plot;




