import { Link } from 'react-router-dom';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct, fetchSearch, setData } from '../../app/data/slice';
import { useEffect, useState } from 'react';
import Spinner from '../../components/spinner';
import axios from 'axios';
import * as c from '../../app/data/constants'

const Home = () => {
  const pageStatus = useSelector(state => state.data.status);
  const product = useSelector(state => state.data.product);
  const searchText = useSelector(state => state.data.search);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // fetch data first time
  useEffect(() => {
    if (pageStatus === 'idle') {
      dispatch(fetchProduct())
    }
  }, [pageStatus, dispatch])

  // fetch data when search text changed
  useEffect(() => {
    if (searchText) {
      dispatch(fetchSearch(searchText))
    }
  }, [searchText, dispatch])

  // delete product
  const deleteHandler = (id) => {
    console.log(id)
    if (window.confirm("Yakin ingin menghapus item?")) {
      setLoading(true)
      axios.delete(c.API_URL + "/" + id)
        .then(res => {
          setLoading(false)
          dispatch(setData({ status: 'idle' }))
        })
        .catch(err => {
          setLoading(false)
          alert(err.message)
        })
    }
  }

  // set search text
  let timer = null
  const searchHandler = (e) => {
    // e.preventDefault();
    clearTimeout(timer)
    timer = setTimeout(() => {
      let text = e.target.value
      dispatch(setData({ search: text }))
      if (text === '') {
        dispatch(setData({
          status: 'idle',
          search: ''
        }))
      }
    }, 500)
  }

  // list product element
  const ListProduct = () => {
    if (product.length > 0) {
      return (
        product.map((item, key) => (
          <tr key={key}>
            <td>{key + 1}</td>
            <td>{item.name}</td>
            <td className="text-right">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}</td>
            <td className="text-center">{(item.status ? "Aktif" : "Nonaktif")}</td>
            <td className="text-center">
              <Link to={`/detail/${item._id}`} className="btn btn-sm btn-info">Detail</Link>
              <Link to={`/edit/${item._id}`} className="btn btn-sm btn-warning">Edit</Link>
              <button className="btn btn-sm btn-danger" onClick={() => deleteHandler(item._id)}>Delete</button>
            </td>
          </tr>
        ))
      )
    } else {
      return (
        <tr>
          <td colSpan="5" className="text-center">Data tidak ditemukan</td>
        </tr>
      )
    }
  }

  // main element
  return (
    <div className="main">
      {loading && <Spinner />}
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." onChange={e => searchHandler(e)} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {(pageStatus === 'loading') ? <tr><td><Spinner /></td></tr> : <ListProduct />}
        </tbody>
      </table>
    </div>
  )
}

export default Home;