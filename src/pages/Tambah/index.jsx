import * as c from '../../app/data/constants'
import Input from '../../components/Input'
import './index.scss'
import axios from 'axios'
import { useState } from 'react'
import Spinner from '../../components/spinner'
import * as Validator from 'validatorjs'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setData } from '../../app/data/slice'
import { Link } from 'react-router-dom'


const Tambah = () => {
  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const dispatch = useDispatch()
  Validator.useLang('id')

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
      setLoading(true)
      axios.post(c.API_URL, data)
        .then(res => {
          setLoading(false)
          alert('Berhasil menambahkan data')
          dispatch(setData({ status: 'idle' }))
          setRedirect(true)
        })
        .catch(err => {
          setLoading(false)
          alert(err.message)
        })
    }
  }

  // main element
  return (
    <div className="main">
      {redirect ? <Redirect to='/' /> : null}
      {loading && <Spinner />}
      <Link to="/" className="btn btn-primary">Kembali</Link>
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form id='tambahProduct' onSubmit={submitHandler}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama"/>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga"/>
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" />
          <Input name="image" type="file" placeholder="Image Produk..." label="Image" />
          <Input name="status" type="checkbox" label="Active" defaultChecked={true} />
          <button type="submit" form='tambahProduct' className="btn btn-primary" >Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;