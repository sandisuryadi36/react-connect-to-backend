
import Input from '../../components/Input';
import './index.scss';

const submitHandler = (e) => { 
  e.preventDefault();
  const data = new FormData(e.target);
  const dataObject = {};
  data.forEach((value, key) => {
    dataObject[key] = value;
  })
  console.log(dataObject);
}

const Tambah = () => {
  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form id='tambahProduct' onSubmit={submitHandler}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama"/>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga"/>
          <Input name="Stock" type="number" placeholder="Stock Produk..." label="Stock" />
          <Input  name="image" type="file" placeholder="Image Produk..." label="Image" />
          <Input name="status" type="checkbox" label="Active" defaultChecked={true} />
          <button type="submit" form='tambahProduct' className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;