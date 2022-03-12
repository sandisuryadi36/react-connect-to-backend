import Input from '../../components/Input'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/spinner'
import * as Validator from 'validatorjs'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct, updateProduct } from '../../app/data/slice'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'


const Edit = () => {
  const [redirect, setRedirect] = useState(false)
  const params = useParams()
  const loading = useSelector(state => state.data.loading)
  const product = useSelector(state => {
    try {
      return state.data.product.find(item => item._id === params.id)
    } catch (err) {
      return null
    }
  });
  const pageStatus = useSelector(state => state.data.status);
  const error = useSelector(state => state.data.error);
  const dispatch = useDispatch()
  Validator.useLang('id')

  // fetch data first time
  useEffect(() => {
    if (pageStatus === 'idle') {
      dispatch(fetchProduct())
    }
  }, [pageStatus, dispatch])

  // post data from form
  const submitHandler = (e) => { 
    e.preventDefault();
    const data = new FormData(e.target);
    const dataObject = {};
    data.forEach((value, key) => {
      dataObject[key] = value;
    }) 

    if (dataObject.status === 'on') {
      data.set('status', 'true')
    } else {
      data.set('status', 'false')
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
      dispatch(updateProduct({
        id: params.id,
        data: data
      }))
      setRedirect(true)
    }
  }

  // form element
  const EditForm = () => {
    const [prevImage, setPrevImage] = useState(product.image.filePath)
    
    const onChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        setPrevImage(URL.createObjectURL(event.target.files[0]));
      } else {
        setPrevImage(product.image.filePath);
      }
    }

    return (
      <div>
        <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" defaultValue={product.name} />
        <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" defaultValue={product.price} />
        <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" defaultValue={product.stock} />
        <img src={prevImage} alt="product" />
        <Input name="image" type="file" placeholder="Image Produk..." label="Change image" onChange={onChange} />
        <Input name="status" type="checkbox" label="Active" defaultChecked={product.status} />
        <button type="submit" form='tambahProduct' className="btn btn-primary" >Simpan</button>
      </div>
    )
  }

  // main element
  return (
    <div className="main">
      {loading && <Spinner />}
      {error && alert(error)}
      {redirect ? <Redirect to='/' /> : null}
      <Link to="/" className="btn btn-primary">Kembali</Link>
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form id='tambahProduct' onSubmit={submitHandler}>
          {(product) ? (pageStatus === 'loading') ? <Spinner />
            : (pageStatus === 'succeeded') ? <EditForm />
              : <div>{error} </div>
            : <div className="content">Product not found</div>
          }
        </form>
      </div>
    </div>
  )
}

export default Edit;