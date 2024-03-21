import { useEffect, useRef, useState } from 'react';
import './App.css';
import Search from './component/Search';
import Table from './component/Table';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import axios from 'axios';
import Loader from './component/Loader';
function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const[loader,setLoader]=useState(false)
  const [limit,setLimit] =useState('5')
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [currentPageData,setCurrentPageData]= useState([])
  const searchInputRef = useRef(null);
  const handleShortcut = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      searchInputRef.current.focus();
    }
  };
    const handleChange = (e)=>{
     setSearch(e.target.value)
        
    } 
    const onKeyUp =(e)=>{
      if (e.key === 'Enter' || e.keyCode === 13 ) {
        if(search!==""){
          getApiResult()
        }
    }
    }
  useEffect(()=>{
    if(search.length>0){
      getApiResult()
    }
  },[limit])
  useEffect(() => {
    document.addEventListener('keydown', handleShortcut);
    return () => {
      document.removeEventListener('keydown', handleShortcut);
    };
  }, []);
  const getApiResult = async ()=>{
    setLoader(true)
    const options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
        params: {namePrefix: search, limit: limit},
        headers: {
          'X-RapidAPI-Key': '23a41501famshcb7299113d982bfp19f824jsn0354acf92546',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    };
    
    try {
      console.log('jai shree ram')
        const response = await axios.request(options);
        setData(response.data.data);
        setLoader(false)
    } catch (error) {
        console.error(error);
        setLoader(false)

    }
}
useEffect(()=>{
if(data.length>0){
  var newdata = data.slice((currentPage - 1) * 3, currentPage * 3)
  setCurrentPageData(newdata)
}else{
  setCurrentPageData(data)
}
},[data,currentPage])
  return (
    <div className='main'>
      <Search getApiResult={getApiResult} handleChange={handleChange} search={search} onKeyUp={onKeyUp} ref={searchInputRef}/>
      {loader?<div className='load'><Loader/></div>:<>
      <Table data={currentPageData}/>
      {data.length>0&&
      <div className='page'>
      <div className='paginate'>
        
      <ResponsivePagination
      current={currentPage}
      total={limit%3==0?limit/3:parseInt(limit/3)+1}
      onPageChange={setCurrentPage}
    />

      </div>
      <div className='limit'>
        <select onChange={(e)=>setLimit(e.target.value)}>
          <option value={"5"}>5</option>
          <option value={"10"}>10</option>

        </select>
      </div>
      </div>}</>}
      
    </div>
  );
}

export default App;
