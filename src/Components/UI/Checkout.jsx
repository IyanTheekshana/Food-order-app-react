import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../../store/CartContext";
import { currencyFormatter } from "../../util/formatting";
import Input from "./Input";
import Button from "./Button";
import UserProgressContext from "../../store/UserProgressContext";
import { submitOrder } from "../../firebase/firebaseService";
import useHttp from "../../hooks/useHttp";
import Error from "../Error";
import { useActionState } from "react";

export default function Checkout(){

    const cartCtx = useContext(CartContext);
    const userProgrssCtx = useContext(UserProgressContext);
     const { error,data, sendRequest, clearData } = useHttp();

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item)=> totalPrice + item.quantity * item.price,0)

    function handleCheckout(){
        userProgrssCtx.hideCheckout()
    }

    function handleFinish(){
        userProgrssCtx.hideCheckout()
        cartCtx.clearCart();
        clearData();
    }

    async function handleCheckoutAction(prevData, fd) {
        const customerData = Object.fromEntries(fd.entries());
        const items = cartCtx.items;
        const order = { items, customer: customerData };

        await sendRequest(submitOrder, order);     
    }

    const [formState, formAction, pending] = useActionState(handleCheckoutAction,null)

    let actions = (
        <>
            <Button onClick={handleCheckout} type="button" textOnly>Close</Button>
            <Button>Submit Order</Button>
        </>
    )

    if(pending){
        actions = (
            <span>
                Sending order data...
            </span>
        )
    }

    if(data && !error){
        return <Modal open={userProgrssCtx.progress === "checkout"} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back to you with more details via email within the next few minutes.</p>
            <Button onClick={handleFinish}>Okay</Button>
        </Modal>
    }

    return (
        <Modal open={userProgrssCtx.progress === "checkout"} onClose={handleCheckout}>
            <form action={formAction}>
                <h2>Check out</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full name" type="text" id="name"/>
                <Input label="E-mail Address" type="email" id="email"/>
                <Input label="Street" type="text" id="street"/>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>
                </div>
                {error && <Error title="Failed to submit order" message={error}></Error>}
                <p className="modal-actions">
                  {actions}
                </p>

            </form>
        </Modal>
    )
}