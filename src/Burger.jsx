import React from 'react'
import './BurgerStyle.css'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase"; 
const Burger = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const ingredientPrices = {
    lettuce: 10,
    cheese: 20,
    meat: 30,
    bacon: 25
};

    const [ingredients,setIngredients]=useState({
        lettuce:0,
        cheese:0,
        meat:0,
        bacon:0
      })
      const addRemoveIngredient = (action, ingredient) => {
        setIngredients((prev) => {
            const newCount = action === 'add' ? prev[ingredient] + 1 : Math.max(prev[ingredient] - 1, 0);
            return { ...prev, [ingredient]: newCount };
        });
    };

    const calculateTotalPrice = (ingredients={}, ingredientPrices, basePrice = 50) => {
      return Object.keys(ingredients).reduce(
          (sum, ingredient) => sum + ingredients[ingredient] * ingredientPrices[ingredient],
          basePrice
      );
  };
  
  const totalPrice = calculateTotalPrice(ingredients, ingredientPrices);
  const placeOrder = async () => {
    if (!user) {
        alert("Please sign in to place an order.");
        navigate("/auth");
        return;
    }

    try {
        const orderDetails = {
            userId: user.uid,
            ingredients: ingredients,
            totalPrice: calculateTotalPrice(),
            createdAt: new Date()
        };

        await addDoc(collection(db, "orders"), orderDetails);
        console.log("Order placed:", orderDetails);

        navigate("/order"); // Redirect to order history page
    } catch (error) {
        console.error("Error placing order:", error);
    }
};
    
    const burgerContent=()=>{
        let burger=[];
        Object.keys(ingredients).forEach((item)=>{
            for(let i=0;i<ingredients[item];i++)
            {
                burger.push(<div key={burger.length} className={`${item}Side`}></div>)
            }
        });
        return burger.length===0?<p>Please start adding ingredients</p>:burger;
    }
  return (
    <div className='burgerIngredients'>
        <div className='topSide'></div>
        {burgerContent()}
        <div className='bottomSide'></div>
        <div className='ingredients'>
        <h2 className="priceText">Current Price of Burger: {totalPrice}</h2>
        <div className='ingredientsBlock'>
          {Object.keys(ingredients).map((item)=>(
            <div key={item} className='ingredientRow'>
            <p>{item.toUpperCase()}</p>
            <div className="ingrBtns">
                <button className="ingrBtn" onClick={() => addRemoveIngredient('add', item)}>More</button>
                <button className="ingrBtnLess" onClick={() => addRemoveIngredient('remove', item)} disabled={ingredients[item]===0}>Less</button>
            </div>
        </div>
          ))}
          <button className='signUp'onClick={placeOrder}>Place order </button>
        </div>
        </div>
    </div>
  )
}

export default Burger