import React, { createContext, useEffect, useState,useContext} from "react";
import All_product from '../components/assets/all_product'




export const shopcontext = createContext();

const ShopProvider =  (props) => {
    const [cartItems, setcartItems] = useState({});
    const [all_product, setall_product] = useState([]);
    const [all_categories,setall_categories]=useState([{

    }])
       
    useEffect(  () => {
         fetch('https://e-commerce-backend-iixa.onrender.com/allproducts').then((res) => (res.json())).then((data) => (setall_product(data)));
        if (localStorage.getItem('token')) {
              fetch('https://e-commerce-backend-iixa.onrender.com/cart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'token': `${localStorage.getItem('token')}`,
                    'Content-Type' : 'application/json'
                },
                body: "",

            }).then((res) => (res.json())).then((data) => setcartItems(data))
        }

          fetch('https://e-commerce-backend-iixa.onrender.com/allcategories').then((res)=>res.json()).then((data)=>setall_categories(data));
        
    }, []);


    const addToCart = (id,qty) => {

        if (localStorage.getItem('token')) {
            fetch('https://e-commerce-backend-iixa.onrender.com/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'token': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId: id ,qty:Number(qty)}),

            }).then((res) => (res.json())).then((resdata) => { setcartItems(resdata.data) })




        }
        else {
            alert("Please Login to Add Products to the Cart")
        window.location.pathname='/login';
        }
    }

    const removeFromCart = (id) => {
         
        if (localStorage.getItem('token')) {
            fetch('https://e-commerce-backend-iixa.onrender.com/delete', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'token': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId: id }),

            }).then((res) => (res.json())).then((resdata) => { console.log(resdata);setcartItems(resdata) })




        }
        else alert("Login First");

    }
    const getTotalCartAmount = () => {
        
        let totalAmount = 0;
        for (const item in cartItems) {
            console.log(item);
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((ele) => (ele.id == item));
                
                totalAmount += ((itemInfo?itemInfo.new_price:0) * cartItems[item]);
            }
        }
        return totalAmount;
    }

    const getTotalItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    }
    const contextValue = { all_product, cartItems,all_categories, addToCart, removeFromCart, getTotalCartAmount, getTotalItems };
    return (
        <shopcontext.Provider value={contextValue}>
            {props.children}
        </shopcontext.Provider>
    )

}
 export const useShop=()=>{
    return useContext(shopcontext);
}

export default ShopProvider;

