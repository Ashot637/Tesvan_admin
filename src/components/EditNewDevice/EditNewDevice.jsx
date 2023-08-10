import React, { useEffect, useRef, useState } from 'react';
import classes from '../../styles/form.module.scss';

import axios from '../../helpers/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import Select from './Select';

const EditNewDevice = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const fileRef = useRef();
  const [info, setInfo] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  const [brandId, setBrandId] = useState(1);
  const [categorieId, setCategorieId] = useState(1);
  const [typeId, setTypeId] = useState(1);
  const [isOpenCategories, setIsOpenCategories] = useState(false);
  const [isOpenBrands, setIsOpenBrands] = useState(false);
  const [isOpenTypes, setIsOpenTypes] = useState(false);
  const types = [
    {
      id: 1,
      title: 'Sale',
    },
    {
      id: 2,
      title: 'New Collection',
    },
    {
      id: 3,
      title: 'Bestseller',
    },
  ];

  useEffect(() => {
    axios.get('/brands').then(({ data }) => setBrands(data));
    axios.get('/categories').then(({ data }) => setCategories(data));
  }, []);

  useEffect(() => {
    if (id) {
      axios.get('/device/' + id).then(({ data }) => {
        setTitle(data.title);
        setPrice(data.price);
        setOldPrice(data.oldPrice);
        setBrandId(data.brandId);
        setCategorieId(data.categorieId);
        setImageUrl(data.img);
        setTypeId(data.typeId);
        setQuantity(data.quantity);
        setInfo(data.info);
      });
    } else {
      setTitle('');
      setPrice('');
      setOldPrice('');
      setImageUrl('');
      setQuantity(1);
      setInfo([]);
    }
  }, [id]);

  const onSelectCategorie = (id) => {
    setCategorieId(id);
    setIsOpenCategories(false);
  };

  const onSelectBrand = (id) => {
    setBrandId(id);
    setIsOpenBrands(false);
  };

  const onSelectType = (id) => {
    setTypeId(id);
    setIsOpenTypes(false);
  };

  const onAddInfo = () => {
    setInfo((info) => [...info, { title: '', description: '', id: Date.now() }]);
  };

  const onDeleteInfo = (id) => {
    if (+id < 30000) {
      if (window.confirm('Are you sure?')) {
        axios.delete('/remove-info/' + id);
        setInfo((info) => info.filter((i) => i.id !== id));
      }
    } else {
      setInfo((info) => info.filter((i) => i.id !== id));
    }
  };

  const onChangeInfo = (id, key, value) => {
    setInfo((info) => info.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
  };

  const onUploadFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event?.currentTarget?.files && event?.currentTarget?.files[0];
      formData.append('img', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch {
      alert('Failed to Upload an Image');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('img', imageUrl);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('oldPrice', oldPrice);
    formData.append('quantity', quantity);
    formData.append('brandId', brandId);
    formData.append('categorieId', categorieId);
    formData.append('typeId', typeId);
    formData.append(
      'info',
      JSON.stringify(
        info
          .filter((i) => i.title.trim() && i.description.trim())
          .map((i) => {
            if (+i.id > 30000) {
              return { title: i.title, description: i.description };
            }
            return { title: i.title, description: i.description, id: i.id };
          }),
      ),
    );
    if (!id) {
      axios
        .post('/devices', formData)
        .then(({ data }) => {
          setTitle('');
          setPrice('');
          setOldPrice('');
          setImageUrl('');
          navigate('/devices');
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .patch('/device/' + id, formData)
        .then(({ data }) => {
          setTitle('');
          setPrice('');
          setOldPrice('');
          setImageUrl('');
          navigate('/devices');
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.field}>
        <label>Device name</label>
        <input
          type="text"
          className={classes.name}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={classes.field}>
        <label>Price</label>
        <input
          type="number"
          className={classes.name}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className={classes.field}>
        <label>Old price</label>
        <input
          type="number"
          className={classes.name}
          value={oldPrice}
          onChange={(e) => setOldPrice(e.target.value)}
        />
      </div>
      <div className={classes.field}>
        <label>Quantity</label>
        <input
          type="number"
          className={classes.name}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <Select
        state={isOpenCategories}
        setState={setIsOpenCategories}
        id={categorieId}
        items={categories}
        event={onSelectCategorie}
      />
      <Select
        state={isOpenBrands}
        setState={setIsOpenBrands}
        id={brandId}
        items={brands}
        event={onSelectBrand}
      />
      <Select
        state={isOpenTypes}
        setState={setIsOpenTypes}
        id={typeId}
        items={types}
        event={onSelectType}
      />
      <div className={classes.upload} onClick={() => fileRef.current.click()}>
        {imageUrl ? 'Change image' : 'Upload image'}
      </div>
      <input type="file" style={{ display: 'none' }} ref={fileRef} onChange={onUploadFile} />
      {imageUrl && (
        <img
          src={'https://tesvan-electronics.onrender.com/' + imageUrl}
          height={150}
          alt="Device"
        />
      )}
      <div className={classes.infos}>
        {info.map((i) => {
          return (
            <div className={classes.info} key={i.id}>
              <div className={classes.field}>
                <label>Info title</label>
                <input
                  type="text"
                  value={i.title}
                  onChange={(e) => onChangeInfo(i.id, 'title', e.target.value)}
                />
              </div>
              <div className={classes.field}>
                <label>Info description</label>
                <input
                  type="text"
                  value={i.description}
                  onChange={(e) => onChangeInfo(i.id, 'description', e.target.value)}
                />
              </div>
              <FontAwesomeIcon
                icon={faClose}
                className={classes.removeInfo}
                onClick={() => onDeleteInfo(i.id)}
              />
            </div>
          );
        })}
      </div>
      <div className={classes.addInfo} onClick={onAddInfo}>
        Add info
      </div>
      <button
        type="submit"
        className={classes.btn}
        disabled={!title.trim() || !price || !oldPrice || !imageUrl || quantity < 1}>
        {id ? 'Edit' : 'Create'}
      </button>
    </form>
  );
};

export default EditNewDevice;
