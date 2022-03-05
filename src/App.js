import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation from './components/Navigation';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Home from './pages/Home';
import Tambah from './pages/Tambah';
import { useDispatch } from 'react-redux'
import { setProduct } from './app/data/slice';
import axios from 'axios';

const App = () => {
  // const data = useSelector(state => state.product.data);
  const dispatch = useDispatch();

  axios('http://localhost:3000/product')
    .then(res => res.data)
    .then(data => {
      dispatch(setProduct(data));
      console.log(data)
    })
    .catch(err => console.log(err));
  
  return (
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" exact children={() => <Home />} />
          <Route path="/detail" children={() => <Detail />} />
          <Route path="/edit" children={() => <Edit />} />
          <Route path="/tambah" children={() => <Tambah />} />
        </Switch>
      </BrowserRouter>
  )
}

export default App;