import '../styles/Panel.css';
import { useQuery } from 'react-query';
import axios from 'axios';


const fetchJSON = () => {

    return axios.get('https://jsonplaceholder.typicode.com/posts')

}

function Plot() {

    const {data, error, isError, isLoading } = useQuery('json-tutorial-code', fetchJSON, {

    staleTime: 3600000,
    cacheTime: 3600000,

    });

    //console.log(data)
   
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
            data.data.map((post, index) => {
                return <li key={index}>{post.title}</li>
            })
        }

        

        </div>
    );

  
  }
  
  export default Plot;




