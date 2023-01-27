import { Route, Routes } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigationBar/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';



const Shop = () => {
  return <h1>Compra</h1>
}

const App = () => {

  return (
    //Lo que hago aca es definir la navegacion. Dentro de Routes van a ir todas las paginas a las que voy a navegar
    <Routes>
      <Route path='/' element={<Navigation />}>
        {/* Agregando el index le digo que cuando la URL no tiene nada, es el elemento que se tiene que mostrar */}
        <Route index element={<Home />} />
        {/* Aca lo que estoy diciendo es cuando la url sea /shop navega a este elemento (Shop) */}
        <Route path='shop' element={<Shop />} />
        <Route path='signin' element={<SignIn/>}/>
      </Route>

    </Routes>

  )
}

export default App;
