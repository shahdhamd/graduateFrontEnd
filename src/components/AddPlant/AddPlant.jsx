import React, { useState } from 'react';
import axios from 'axios';
import style from '../UserContributions/UserCont.module.css';
import joi from 'joi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function AddPlant() {
  const [errorList, setErrorList] = useState('');
  const [backendError, setBackendError] = useState('');
  const token = `shahd__${localStorage.getItem('token')}`;
  const [plant, setPlant] = useState({
    ArabicName: '',
    EnglishName: '',
    description: '',
    benefit: '',
    image: null,
    effect: '',
    place: '',
  });
  const navigate = useNavigate();

  const goToHome = () => {
    let path = '/contribution';
    navigate(path);
  };

  const validation = () => {
    const schema = joi.object({
      ArabicName: joi.string().required(),
      EnglishName: joi.string().required(),
      description: joi.string().required(),
      benefit: joi.string().required(),
      image: joi.object().required(),
      effect: joi.string().required(),
      place: joi.string().required(),
    });
    return schema.validate(plant, { abortEarly: false });
  };

  const getFormValue = (e) => {
    let myPlant = { ...plant };
    if (e.target.name === 'image') {
      myPlant.image = e.target.files[0];
    } else {
      myPlant[e.target.name] = e.target.value;
    }
    setPlant(myPlant);
    setErrorList('');
  };

  const submitForm = async (e) => {
    e.preventDefault();

    let validateForm = validation();

    if (validateForm.error) {
      setErrorList(validateForm.error.details);
    } else {
      try {
        const formData = new FormData();
        formData.append('ArabicName', plant.ArabicName);
        formData.append('EnglishName', plant.EnglishName);
        formData.append('description', plant.description);
        formData.append('benefit', plant.benefit);
        formData.append('image', plant.image); // Ensure 'image' is the correct key
        formData.append('effect', plant.effect);
        formData.append('place', plant.place);

        let { data, status } = await axios.post(
          'https://spotless-moth-rugby-shirt.cyclic.app/api/v1/contribution/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              token,
            },
          }
        );

        if (status === 200) {
          console.log('Success');

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'تم اضافة النبتة بنجاح',
            showConfirmButton: false,
            timer: 1500,
          });

          setPlant({
            ArabicName: '',
            EnglishName: '',
            description: '',
            benefit: '',
            image: null,
            effect: '',
            place: '',
          });
        } else {
          let error = JSON.stringify(data);
          console.log('Error:', error);
          setBackendError(error);
          if (data.errors) {
            console.log('Server Errors:', data.errors);
          }
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setBackendError('Error uploading file');
      }
    }
  };

  return (
    <div className={`add ${style.addform}`}>
      <div className='model'>
        <div className={style.headText}>
        <button style={{width:'180px', height:'50px'}} ><a href='/contribution' style={{color:'white',textDecoration:"none"}}>Contribution</a></button>

        <div className={style.headText_h1}>
          <h1 className={style.headForm} style={{ marginRight: "50px" }}><span className='font-bold'>Add New Contribution </span></h1>

        </div>


       
        </div>
        
        <form onSubmit={submitForm} encType='multipart/form-data' className={style.formPlant} style={{marginTop:"70px"}}>
          <div className={style.rightpart}>
            <div className={`${style.itemm} item`}>
              <label htmlFor='ArabicName'>ArabicName</label>
              <input
                type='text'
                placeholder='the name of plant in arabic'
                id='ArabicName'
                onChange={getFormValue}
                name='ArabicName'
                className='form-control'
              />
            </div>
            <div className={`${style.itemm} item`}>
              <label htmlFor='EnglishName'>English name</label>
              <input
                type='text'
                placeholder=' the name of plant in english '
                id='EnglishName'
                onChange={getFormValue}
                name='EnglishName'
                className='form-control'
              />
            </div>
            <div className={`${style.itemm} item`}>
              <label htmlFor='description'>description</label>
              <input
                type='text'
                placeholder='description of herbs'
                id='description'
                onChange={getFormValue}
                name='description'
                className='form-control'
              />
            </div>
            <div className={`${style.itemm} item`}>
              <label htmlFor='benefit'>benefit</label>
              <input
                type='text'
                placeholder='benefit of herb'
                id='benefit'
                onChange={getFormValue}
                name='benefit'
                className='form-control'
              />
            </div>
          </div>
          <div className={style.lefttpart}>
            <div className={`${style.itemm} item`}>
              <label htmlFor='image'>image</label>
              <input
                type='file'
                id='image'
                name='image'
                onChange={getFormValue}
                className='form-control'
              />
            </div>
            <div className={`${style.itemm} item`}>
              <label htmlFor='effect'>effect</label>
              <input
                type='text'
                placeholder='effect of plants'
                id='effect'
                onChange={getFormValue}
                name='effect'
                className='form-control'
              />
            </div>
            <div className={`${style.itemm} item`}>
              <label htmlFor='place'>place</label>
              <input
                type='text'
                placeholder='المنشأ'
                id='place'
                onChange={getFormValue}
                name='place'
                className='form-control'
              />
            </div>
            <div className={`${style.error} mt-3`}>
              {errorList ? (
                <div className='alert alert-danger ms-auto' style={{ width: '70%', borderRadius: '10px', textAlign: 'right' }}>
                  {errorList[0].message}
                </div>
              ) : backendError ? (
                <div className='alert alert-danger ms-auto' style={{ width: '70%', borderRadius: '20px', textAlign: 'right' }}>
                  {backendError}
                </div>
              ) : (
                ''
              )}
            </div>
            <div className={`${style.itemm} item`}>
              <button type='submit' className={style.submit}>add</button>

            </div>

          </div>
        </form>

      </div>
    </div>

  );
}
