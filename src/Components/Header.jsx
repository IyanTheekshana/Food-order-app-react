import Button from "./UI/Button";

export default function Header(){
    return (
        <header id="main-header">
            <div id="title">
                
                <h1>FOOD ORDERING</h1>
            </div>
            <nav>
                <Button textOnly>Cart (0)</Button>
            </nav>
        </header>
    )
}