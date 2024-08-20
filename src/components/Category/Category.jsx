import React ,{useState}from 'react'
import './Category.css'
import { useShop } from '../../context/ShopContext'
import arrow from '../assets/arrow.png'
import Dropdown from '../dropdown/Dropdown'
const Category = () => {
  const {all_categories}=useShop();
  const [isvisible,setisvisible]=useState(false);
  const [category,setcategory]=useState("");

  return (
    <div className='category-container' style={(window.location.pathname==='/')?{}:{marginTop:'3.5%',height:'50px',boxShadow:'none'}}>
      <div className='innercontainer' style={(window.location.pathname==='/')?{}:{height:'90%',backgroundColor:'#e34d69'}}>
      {
        all_categories.map((item,i)=>{
              return (
                <div key={i} className='category-items'  onMouseEnter={()=>{setisvisible(true);setcategory(item.name)}} onMouseLeave={()=>{setisvisible(false);setcategory("")} } style={item.name===category?{boxShadow:'1px 1px 7px  #de4960,-1px -1px 7px  #de4960',borderRadius:'10px',height:'90%'}:{}}>
                      {window.location.pathname==="/"? <div className='innerdiv'  >
                        
                        <div className='image'>
                            <img src={item.image} alt="" />
                        </div>
                        <div className="name" >
                        <p>{item.name}</p>
                      </div>
                      </div>:
                      <div className='innerdiv' style={(item.name===category)?{backgroundColor:'#fcbc8b',height:'90%',padding:'2px',boxShadow:'1px 1px 10px #f29d5c,-1px -1px 10px #f29d5c',borderRadius:'10px',color:'black',transition:'padding 0 ease-out  300ms'
                      }:{}}>
                      <div className="name" style={{marginTop:'2px'}}  >
                      <p >{item.name}</p>
                    </div>
                    </div>
                    }
                        
                        
                         
                          {isvisible&&(item.name===category)&&<Dropdown subcategories={item.subcategories} location={window.location.pathname}/>}

                </div>
              )
        })
      }
         
               
       
      

      </div>
       
    </div>
    
  )
}

export default Category
