import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import joi from 'joi';
import { useNavigate } from 'react-router-dom';
// import video from '../../ForgetAssets/rain.mp4';
import { AiTwotoneMail } from "react-icons/ai";

import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import './Signup.css';
export default function Signup() {
  let [ErrorList,setErrorList]=useState('')
  let [backendError ,setBackendError]=useState('')
  let [user,setUser]=useState({
    userName:'',
    email:'',
    passward:''
  });

  let navigate=useNavigate();
  function goToLogin(){
    let path='/login';
    navigate(path)
  }

  function validation(){
    const schema=joi.object({   
      userName:joi.string().required().min(2).max(25).messages({
        'string.min': 'يجب ان يتكون اسم المستخدم  من حرفين على الاقل ',
        'string.max':'يجب أن يتكون اسم المستخدم من 25 حرفًا على الأكثر'
    }),
    email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.email':'يُرجى إدخال عنوان بريد إلكتروني صحيح'
    }),
    passward:joi.string().required().messages({
        'string.min': 'يجب ان يتكون كلمة المرور من 7 حرفًا على الاقل ',
    }),
    })
    return schema.validate(user,{abortEarly:false}); /// بمعنى طبق الفنكشن على المتغير يوزر
  }

  let getFormValue=(e)=>{
    let myUser={...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser);
    console.log(e.target.value)
    setErrorList('')

  }

  let submitForm=async(e)=>{
    e.preventDefault();
    let validateForm=validation();
    if (validateForm.error) {
      console.log("Validation error:", validateForm.error.details);
      setErrorList(validateForm.error.details);

      console.log('error list   ',ErrorList)
      // console.log('error    ',ErrorList[0].message)
    } else {
      console.log("Validation successful");
      console.log('submit ',user)
      // let {data}=await axios.post('http://localhost:3100/api/v1/auth/signup',user)
      let {data}=await axios.post('https://spotless-moth-rugby-shirt.cyclic.app/api/v1/auth/signup',user)
      console.log({data})
    if(data.message==='sucess'){
      console.log('sucess')
      goToLogin();
    }else{
      let error=JSON.stringify(data);
      console.log('data ',error)

      setBackendError(error)
    }
    console.log("Error ",ErrorList);
    }


  }
    return (
 
      <div className="formCard flex" style={{"borderRadius":"0"}}>
      <div className="container flex">
        <div className="videoDiv">
          <video src='images/rain.mp4' autoPlay muted loop className='video'></video>
          <div className="textDiv">
            <h2 className='title'> تحليل صور الأعشاب الفلسطينية</h2>
          </div>
          <div className="footerDiv flex">
            <button className='btn'onClick={() => navigate('/login')}>تسجيل الدخول</button>
            <span className='text'>هل تملك حساب ؟ </span>
            
          </div>
        </div>
  
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src='images/images-removebg-preview.png' alt="img" className='img'/>
            <h3>إنشاء حساب</h3>
          </div>
          <form action='' className='form grid' id="email-form" onSubmit={submitForm}>
          {/* <span className='mss'style={{ 'width': '100%', 'textAlign':"center","fontWeight":"bold","fontSize":"20px" }} >Let us know You !</span> */}
          
          <div className="inputDiv">
           <label htmlFor='userName'>اسم المستخدم</label>
           <div className="input2 flex">
           
           <input type='text' id="userName" name="userName" placeholder='أدخل اسم المستخدم' required className='input1' onChange={getFormValue}></input>
           <FaRegUser className="icon"/> </div> 
          </div>
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
           <RiLockPasswordFill className="icon"/></div>
          </div>
          <div className="login flex">
            <span className='text'>هل تملك حساب ؟</span>
            <Link className='loginbtn' onClick={() => navigate('/login')}>تسجيل الدخول</Link>
          </div>
          <div className='mt-3' style={{direction:'rtl'}}>
  {ErrorList ? (
    <div className="alert alert-danger m-auto" style={{ 'width': '100%', 'borderRadius': '10px' }}>{ErrorList[0].message}</div>
  ) : (
    backendError ? (
      <div className="alert alert-danger m-auto" style={{ 'width': '100%', 'borderRadius': '15px' }}>{backendError}</div>
    ) : ''
  )}
</div>
          <button type='submit' className='btn flex'>
  
            <span>إنشاء</span>
          </button>
          </form>
  
        </div>
      </div>
      </div>

    )
}