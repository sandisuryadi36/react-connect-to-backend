import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './index.scss';
import { fetchProduct, setData } from "../../app/data/slice";
import Spinner from "../../components/spinner";
import axios from "axios";
import * as c from '../../app/data/constants'
import { Redirect } from "react-router-dom";

const Detail = () => {
  const dispatch = useDispatch();
  let params = useParams()
  let product = useSelector(state => {
    try {
      return state.data.product.find(item => item._id === params.id)
    } catch (error) {
      return null
    }
  });
  let pageStatus = useSelector(state => state.data.status);
  let error = useSelector(state => state.data.error);
  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState(false)

  // fetch data first time
  useEffect(() => {
    if (pageStatus === 'idle') {
      dispatch(fetchProduct())
    }
  }, [pageStatus, dispatch])

  // delete product
  const deleteHandler = (id) => {
    console.log(id)
    if (window.confirm("Yakin ingin menghapus item?")) {
      setLoading(true)
      axios.delete(c.API_URL + "/" + id)
        .then(res => {
          setLoading(false)
          dispatch(setData({ status: 'idle' }))
          setRedirect(true)
        })
        .catch(err => {
          setLoading(false)
          alert(err.message)
        })
    }
  }

  // detail product element
  const DetailProduct = () => {
    return (
      <table className="table">
        <tbody>
          <tr>
            <td colSpan={2}>
              <img src={product.image.filePath} alt="product" />
            </td>
          </tr>
          <tr>
            <td>ID</td>
            <td>: {product._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {product.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {product.stock}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  // main element
  return (
    <div className="main">
      {redirect ? <Redirect to='/' /> : null}
      {loading && <Spinner />}
      <Link to="/" className="btn btn-primary">Kembali</Link>

      {(product) ? (pageStatus === 'loading') ? <Spinner />
        : (pageStatus === 'succeeded') ? <DetailProduct />
          : <div>{error} </div>
        : <div className="content">Product not found</div>
      }

      <div className="btn-list">
        <Link to={`/edit/${product._id}`} className="btn btn-sm btn-warning">Edit</Link>
        <button className="btn btn-sm btn-danger" onClick={() => deleteHandler(product._id)}>Delete</button>
      </div>

    </div>
  )
}

export default Detail;