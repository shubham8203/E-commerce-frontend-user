import React, { useContext,useEffect,useState } from 'react'
import { shopcontext } from '../context/ShopContext';
import './CSS/search.css'
import Item from '../components/items/Item';
import {Link} from 'react-router-dom';


const Search = () => {
    const {all_categories,all_product}=useContext(shopcontext);
    const [search,setsearch]=useState('');
    const [searchresult,setsearchResult]=useState([]);
    const [isvisible,setisvisible]=useState(false);
    const formDetails={
      search:'',
      indescription:false,
      category:'',
      insubcategory:false,
    };
    
     useEffect(()=>{
        
        if(search!=localStorage.getItem('search')){
            
            setsearch(localStorage.getItem('search'));
        }
        
        
},[all_categories])
const changeHandler=()=>{
formDetails.search=document.getElementById('search').value;
formDetails.indescription=document.getElementById('indescription').checked;
formDetails.category=document.getElementById('category').value;
formDetails.insubcategory=document.getElementById('insubcategory').checked;
}
  const formHandler= async ()=>{
   
    changeHandler();
    console.log(formDetails);
    let formdata=new FormData();
    for(let keys in formDetails){
        formdata.append(keys,formDetails[keys]);
    }


        await fetch('https://e-commerce-backend-iixa.onrender.com/search',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                
            },
            body:formdata,
        }).then((res)=>res.json()).then((data)=>setsearchResult(data));

        
  }
    let val=localStorage.getItem('search');
    const mp=new Map();
    console.log(all_categories);
    all_categories.map((item)=>{
        
        mp.set(item.name,item.subcategories);
     
    })
  return (
    <div className='search'>
         <h1>Search- '{localStorage.getItem('search')}'</h1>
          <div className="search-criteria">
            <p>Search Criteria</p>
            <div className="searchfield">
                <div className="fields">
                    <input defaultValue={search} type="text"  name="search" id="search" onChange={(e)=>{localStorage.setItem('search',e.target.value);
                    val=localStorage.getItem('search');
                    }} />
                    <div>
                        <input type="checkbox" name="indescription" id="indescription"   />
                        <p>Search in product descriptions</p>
                    </div>
                </div>
                <div className="fields">
                <select name="category" id="category" width={500}    > 
                 
                    <option value="All Category">All Category</option>
                    {all_categories.map((item,i)=>{
                        console.log(item.name);
                        
                        return <>
                        <option value={item.name}>{item.name}</option>
                        { 
                            mp.get(item.name).map((ele)=><option value={ele.name}>&nbsp;&nbsp;&nbsp;&nbsp;{ele.name}</option>)
                        }
                        </>
                    })
                 }
                </select>
                    <div>
                        <input type="checkbox" name="insubcategory" id="insubcategory"   />
                        <p>Search in subcategories</p>
                    </div>
                </div>
            </div>
          </div>
       <div className="search-button">
           <Link to={`/search?search=${val}`}  onClick={formHandler} >
           <button  onClick={()=>setisvisible(true)} >
            Search
           </button>
           </Link>
       </div>
      
       {isvisible?<div className="searchresult">
       <hr />
        <h1>Products meeting the search criteria</h1>
        {searchresult.length===0?<p>There is no Product that matches the search criteria</p>:<>
          <div className="searchitems">
            {
            searchresult.map((item)=>{
                return <Item name={item.name} id={item.id} image={item.image} old_price={item.old_price} new_price={item.new_price}/>
            })
           }
          </div>

        </>}

       </div>:<></>
}
    </div>
        
  )
}

export default Search
