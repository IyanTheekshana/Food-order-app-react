import { useContext } from "react";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

export default function Header(){

    const cartCtx = useContext(CartContext);

    const totalCartItems = cartCtx.items.reduce((totalNumerOfItems,item)=>{
        return totalNumerOfItems + item.quantity
    },0)


    return (
        <header id="main-header">
            <div id="title">
                
                <h1>FOOD ORDERING</h1>
            </div>
            <nav>
                <Button textOnly>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}