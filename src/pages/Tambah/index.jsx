import * as c from '../../app/data/constants'
import Input from '../../components/Input'
import './index.scss'
import axios from 'axios'
import { useState } from 'react'
import Spinner from '../../components/spinner'
import * as Validator from 'validatorjs'


const Tambah = () => {
  const [loading, setLoading] = useState(false)
  Validator.useLang('id')

  const submitHandler = (e) => { 
    e.preventDefault();
    const data = new FormData(e.target);
    const dataObject = {};
    data.forEach((value, key) => {
      dataObject[key] = value;
    })

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
      setLoading(true)
      axios.post(c.API_URL, data)
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
        <h2>Tambah Produk</h2>
        <br />
        <form id='tambahProduct' onSubmit={submitHandler}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama"/>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga"/>
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" />
          <Input  name="image" type="file" placeholder="Image Produk..." label="Image" />
          <Input name="status" type="checkbox" label="Active" defaultChecked={true} />
          <button type="submit" form='tambahProduct' className="btn btn-primary" >Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;