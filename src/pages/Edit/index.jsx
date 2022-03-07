import * as c from '../../app/data/constants'
import Input from '../../components/Input'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/spinner'
import * as Validator from 'validatorjs'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../../app/data/slice'


const Edit = () => {
  const [loading, setLoading] = useState(false)
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
  const dispatch = useDispatch()

  Validator.useLang('id')

  useEffect(() => {
    if (pageStatus === 'idle') {
      dispatch(fetchProduct())
    }
  }, [pageStatus, dispatch])

  const submitHandler = (e) => { 
    e.preventDefault();
    const data = new FormData(e.target);
    const dataObject = {};
    data.forEach((value, key) => {
      dataObject[key] = value;
    })
    if (dataObject.image === '') { 
      delete dataObject.image
    }

    // form validation
    let listData = {
      nama: dataObject.name,
      harga: dataObject.price,
      stock: dataObject.stock,
    }

    let rules = {
      nama: 'required',
      harga: 'required|numeric',
      stock: 'required|numeric',
    }

    let validation = new Validator(listData, rules);

    validation.fails() && alert(validation.errors.first(
      (validation.errors.first('nama') !== false) ? 'nama' : (validation.errors.first('harga') !== false) ? 'harga' : 'stock'
    ))

    if (validation.passes()) {
      // post to API
      setLoading(true)
      axios.put(c.API_URL + '/'+ params.id, data)
        .then(res => {
          setLoading(false)
          console.log(res);
        })
        .catch(err => {
          setLoading(false)
          console.log(err);
        })
    }
  }

  return (
    <div className="main">
      {loading && <Spinner />}
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form id='tambahProduct' onSubmit={submitHandler}>
          {(product) ? (pageStatus === 'loading') ? <Spinner />
            : (pageStatus === 'succeeded') ? <EditForm product={product} />
              : <div>{error} </div>
            : <div className="content">Product not found</div>
          }
        </form>
      </div>
    </div>
  )
}

const EditForm = (props) => { 
  return (
    <div>
      <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" defaultValue={props.product.name} />
      <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" defaultValue={props.product.price} />
      <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" defaultValue={props.product.stock} />
      <Input name="image" type="file" placeholder="Image Produk..." label="Image" />
      <Input name="status" type="checkbox" label="Active" defaultChecked={props.product.status} />
      <button type="submit" form='tambahProduct' className="btn btn-primary" >Simpan</button>
    </div>
  )
}

export default Edit;