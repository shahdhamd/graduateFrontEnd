import React, { useState } from 'react'
import '.././Signup/Signup.css'
import { useNavigate, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import joi from 'joi';
import axios from 'axios';

import { AiTwotoneMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

export default function Login({ setData }) {
  let [errorList, setErrorList] = useState('')
  let [backendError, setBackendError] = useState('')
  let [user, setUser] = useState({
    email: '',
    passward: ''
  })


  let getFormValue = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser)
    console.log(user)
  }
  function validation() {
    const schema = joi.object({
      passward:joi.string().required(),
        email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
            'string.email':'يُرجى إدخال عنوان بريد إلكتروني صحيح'
        }),

    })
    return schema.validate(user);
  }

  let navigate = useNavigate();

  let goToHome = () => {
    let path = '/home'
    navigate(path)
  }
  let goTodashboard = () => {
    let path = '/dashboard'
    navigate(path)
  }
  let submitForm = async (e) => {
    e.preventDefault();

    try {
      console.log('helll')
      let validateForm = validation();

      if (validateForm.error) {
        console.log("Validation error:", validateForm.error.details);
        setErrorList(validateForm.error.details);
      } else {
        console.log("Validation successful");

        // Assuming `user` is defined somewhere in your component

        let { data } = await axios.post("https://spotless-moth-rugby-shirt.cyclic.app/api/v1/auth/signin", user);

        console.log('data ', data);




        if (data.message === 'sucess') {
          //   let token=`shahd__${data.token}`; // Declare the variable
          let token = data.token;

          if (user.role == 'admin') {
            // If it's the admin, go to the dashboard

            goTodashboard();

          } else {
            localStorage.setItem('token', token);
            console.log(localStorage.getItem('token'));
            goToHome();
            setData();
          }
        } else {
          let error = JSON.stringify(data);
          console.log('data ', error);
          setBackendError(error);
          setErrorList(data.message);
        }
      }

    } catch (error) {
      console.error('Error during API request:', error);
      // Handle other types of errors, e.g., set an error state
    }
  };

  return (
    <div className="formCard flex">
      <div className="container flex" style={{ "height": "89vh" }}>
        <div className="videoDiv">
          <video src='images/rain.mp4' autoPlay muted loop className='video'></video>
          <div className="textDiv">
            <h2 className='title'> تحليل صور الأعشاب الفلسطينية</h2>
          </div>
          <div className="footerDiv flex">
            <button className='btn' onClick={() => navigate('/signup')}>انشاء حساب</button>
            <span className='text'>ليس لديك حساب ؟</span>
          </div>

        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src='images/images-removebg-preview.png' alt="img" className='img' />
            <h3 style={{ "fontWeight": "bold" }}>تسجيل الدخول</h3>
          </div>
          <form action='' className='form grid' id="email-form" onSubmit={submitForm}>

            <div className="inputDiv">
              <label htmlFor='email'>عنوان البريد الالكتروني</label>
              <div className="input2 flex">

                <input type='email' id="email" name="email" placeholder='أدخل بريدك الإلكتروني' required className='input1' onChange={getFormValue}></input>
                <AiTwotoneMail className="icon" /></div>
            </div>

            <div className="inputDiv">
              <label htmlFor='newPassward'> كلمة المرور</label>
              <div className="input2 flex" >

                <input type='password' id="password" name="passward" placeholder='ادخل كلمة المرور' required className='input1' onChange={getFormValue}></input>
                <RiLockPasswordFill className="icon" />
              </div>
            </div>
            <div className='mt-3' style={{direction:'rtl'}}>
              {errorList ? (
                <div className="alert alert-danger m-auto" style={{ 'width': '100%', 'borderRadius': '10px' }}>{errorList[0].message}</div>
              ) : (
                backendError ? (
                  <div className="alert alert-danger m-auto" style={{ 'width': '100%', 'borderRadius': '20px' }}>{backendError}</div>
                ) : ''
              )}
            </div>
            <button type='submit' className='btn flex'>
              <span>تسجيل دخول</span>
            </button>
            <div className="login flex" style={{ 'display': "block" }}>
              <span className='text'>هل نسيت كلمة المرور؟</span>
              <Link className='loginbtn' to='/sendcode'>اضغط عنا</Link>
            </div>

          </form>

        </div>
      </div>
    </div>


  )
}








