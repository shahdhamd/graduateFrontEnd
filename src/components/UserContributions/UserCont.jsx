import React, { useState } from 'react';
import axios from 'axios';
import style from './UserCont.module.css';
import joi from 'joi';
import Swal from 'sweetalert2';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

export default function UserCont() {
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
    let path = '/home';
    navigate(path);
  };

  const validation = () => {
    const schema = joi.object({
      ArabicName: joi.string().min(2).max(25).required(),
        EnglishName: joi.string().min(2).max(25).required(),
        description: joi.string().min(10).required().messages({
          'string.min': 'يجب ان يتكون الوصف من  10 احرف على الاقل ',
      }),
        benefit: joi.string().min(10).required().messages({
            'string.min': 'يجب ان يتكون الفوائد من  10 احرف على الاقل',
        }),
        effect: joi.string().min(5).required().messages({
            'string.min': 'يجب ان يتكون الاثارالجانبية  من  5 احرف على الاقل',
        }),
        place: joi.string().min(3).required().messages({
            'string.min': 'يجب ان يتكون المنشأ من  3 احرف على الاقل',
        }),
        image: joi.object().required().messages({
            'any.required': 'قم بإدراج الصورة',
        }),
    })
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
        formData.append('image', plant.image);
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
        setBackendError('خطأ أثناء رفع  ملف الصورة ');
      }
    }
  };

  return (
    <div className={`add ${style.addform}`}>
      <div className='model'>
        <div className={style.headText}>
        <div className={style.headText_h1}>
          <h1 className={style.headForm}><span className='font-bold'>قم باضافة مساهمتك لقاعدة بياناتنا بنبات جديد، هيا بنا</span></h1>
        </div>
        <div className={style.headText_span}>
          <span className={style.homepage} onClick={goToHome}><i className="fa-solid fa-house"></i>الصفحة الرئيسية</span>
        </div>
        </div>
        
        <form onSubmit={submitForm} encType='multipart/form-data' className={style.formPlant}>
          <div className={style.rightpart}>
            <div className={`${style.itemm} item`}>
              <label htmlFor='ArabicName'>الاسم باللغة العربية</label>
              <input required
                type='text'
                placeholder='الاسم باللغة العربية'
                id='ArabicName'
                onChange={getFormValue}
                name='ArabicName'
                className='form-control'
              />
            </div>
            <div className={`${style.itemm} item`}>
              <label htmlFor='EnglishName'>الاسم باللغة الانجليزية</label>
              <input required
                type='text'
                placeholder='الاسم باللغة الانجليزية'
                id='EnglishName'
                onChange={getFormValue}
                name='EnglishName'
                className='form-control'
              />
            </div>
            <div className={`${style.itemm} item`}>
              <label htmlFor='description'>الوصف</label>
              <input required
                type='text' 
                placeholder='الوصف'
                id='description'
                onChange={getFormValue}
                name='description'
                className='form-control'
              />
            </div>
            <div className={`${style.itemm} item`}>
              <label htmlFor='benefit'>الفوائد</label>
              <input required
                type='text'
                placeholder='الفوائد'
                id='benefit'
                onChange={getFormValue}
                name='benefit'
                className='form-control'
              />
            </div>
          </div>
          <div className={style.lefttpart}>
            <div className={`${style.itemm} item`}>
              <label htmlFor='image'>صورة</label>
              <input required
                type='file'
                id='image'
                name='image'
                onChange={getFormValue}
                className='form-control'
              />
            </div>
            <div className={`${style.itemm} item`}>
              <label htmlFor='effect'>الاثار الجانبية</label>
              <input required
                type='text'
                placeholder='الاثار الجانبية'
                id='effect'
                onChange={getFormValue}
                name='effect'
                className='form-control'
              />
            </div>
            <div className={`${style.itemm} item`}>
              <label htmlFor='place'>المنشأ/المنبت</label>
              <input required
                type='text'
                placeholder='المنشأ'
                id='place'
                onChange={getFormValue}
                name='place'
                className='form-control'
              />
            </div>
            <div className={`${style.error} mt-3`} style={{direction:'rtl'}}>
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
              <button type='submit' className={style.submit}>اضافة</button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
