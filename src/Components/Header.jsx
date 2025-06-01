import { useContext } from "react";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Logo from '../assets/logo.jpg'
export default function Header(){

    const cartCtx = useContext(CartContext);
    const userProgresCtx = useContext(UserProgressContext)

    const totalCartItems = cartCtx.items.reduce((totalNumerOfItems,item)=>{
        return totalNumerOfItems + item.quantity
    },0)

    function handleShowCart(){
        userProgresCtx.showCart();
    }


    return (
        <header id="main-header">
            <div id="title">
                <img src={Logo} alt="FOOD ORDERING" />
                <h1>FOOD ORDERING</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}