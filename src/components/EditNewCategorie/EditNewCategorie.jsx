import React, { useEffect, useRef, useState } from 'react';
import axios from '../../helpers/axios';
import { useNavigate, useParams } from 'react-router-dom';
import classes from '../../styles/form.module.scss';

const EditNewCategorie = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const fileRef = useRef();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (id) {
      axios.get('/categorie/' + id).then(({ data }) => {
        setTitle(data.title);
        setImageUrl(data.img);
      });
    } else {
      setTitle('');
      setImageUrl('');
    }
  }, [id]);

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
    if (!id) {
      axios
        .post('/categories', formData)
        .then(({ data }) => {
          setTitle('');
          setImageUrl('');
          navigate('/categories');
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .patch('/categorie/' + id, formData)
        .then(({ data }) => {
          setTitle('');
          setImageUrl('');
          navigate('/categories');
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.field}>
        <label>Categorie name</label>
        <input
          type="text"
          className={classes.name}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
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
      <button type="submit" className={classes.btn} disabled={!title.trim() || !imageUrl}>
        {id ? 'Edit' : 'Create'}
      </button>
    </form>
  );
};

export default EditNewCategorie;
