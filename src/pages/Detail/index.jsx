import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './index.scss';
import { fetchProduct } from "../../app/data/slice";

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

  useEffect(() => {
    if (pageStatus === 'idle') {
      dispatch(fetchProduct())
    }
  }, [pageStatus, dispatch])

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      {(product) ? (pageStatus === 'loading') ? <div>Loading...</div>
        : (pageStatus === 'succeeded') ? <DetailProduct product={product} />
          : <div>{error} </div>
        : <div className="content">Product not found</div>
      }

    </div>
  )
}

const DetailProduct = (props) => {
  return (
    <table className="table">
      <tbody>
        <tr>
          <td colSpan={2}>
            <img src={props.product.image_url} alt="product" />
          </td>
        </tr>
        <tr>
          <td>ID</td>
          <td>: {props.product._id}</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>: {props.product.name}</td>
        </tr>
        <tr>
          <td>Price</td>
          <td>: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(props.product.price)}</td>
        </tr>
        <tr>
          <td>Stock</td>
          <td>: {props.product.stock}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Detail;