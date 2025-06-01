import Header from './Components/Header';
import Meals from './Components/Meals';
import Cart from './Components/UI/Cart';
import Checkout from './Components/UI/Checkout';
import { CartContextProvider } from './store/CartContext';
import { UserProgressContextProvider} from './store/UserProgressContext'

function App() {

  return (
    <UserProgressContextProvider>
    <CartContextProvider>
     <Header/>
     <Meals/>
     <Cart/>
     <Checkout/>
    </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
