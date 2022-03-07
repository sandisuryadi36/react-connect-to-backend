import { Link } from 'react-router-dom';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../../app/data/slice';
import { useEffect } from 'react';

const ListProduct = (props) => {
  const { data } = props;
  return (
    data.map((item, key) => (
      <tr key={key}>
        <td>{key + 1}</td>
        <td>{item.name}</td>
        <td className="text-right">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}</td>
        <td className="text-center">
          <Link to={`/detail/${item._id}`} className="btn btn-sm btn-info">Detail</Link>
          <Link to="/edit" className="btn btn-sm btn-warning">Edit</Link>
          <Link to="#" className="btn btn-sm btn-danger">Delete</Link>
        </td>
      </tr>
    ))
  )
}

const Home = () => {
  const pageStatus = useSelector(state => state.data.status);
  const product = useSelector(state => state.data.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pageStatus === 'idle') {
      dispatch(fetchProduct())
    }
  }, [pageStatus, dispatch])

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {(pageStatus === 'loading') ? <tr><td>Loading...</td></tr> : <ListProduct data={product} />}
        </tbody>
      </table>
    </div>
  )
}

export default Home;