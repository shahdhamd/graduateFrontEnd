import React, { useState } from 'react'
// import style from '.././Signup/Signup.css'
import'.././Signup/Signup.css'

import { useNavigate ,Navigate } from 'react-router-dom';
// import video from '../../ForgetAssets/rain.mp4';
import { AiTwotoneMail } from "react-icons/ai";
// import '../ForgetPassword/ForgetPassword.css';

import { Link } from 'react-router-dom';
import joi from 'joi';
import axios from 'axios';
function SendCode() {
  let [UserEmail,setUserEmail]=useState({
    email:''
  })
    let navigate=useNavigate();
    function goToLogin(){
      let path='/forgetpassword';
      navigate(path, { state: { email: UserEmail.email } })
    }
  
    
    let [ErrorList,setErrorList]=useState('')
    let getFormValue=(e)=>{
      let myEmail={...UserEmail};
      myEmail[e.target.name]=e.target.value;
      setUserEmail(myEmail);
      console.log(e.target.value)
      setErrorList('')
    }
  
    function validation(){
      const schema=joi.object({  
        email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
          'string.email':'يُرجى إدخال عنوان بريد إلكتروني صحيح'
      }), 
      })
      return schema.validate(UserEmail,{abortEarly:false}); 
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
        console.log('submit ',UserEmail)
        let {data}=await axios.patch('https://spotless-moth-rugby-shirt.cyclic.app/api/v1/auth/sendcode',UserEmail)
        console.log('data',data)
        goToLogin()
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
                    <button className='btn'>تسجيل الدخول</button>
<span className='text'>انتقل إلى صفحة تسجيل الدخول</span>
        </div>
     
      </div>

      <div className="formDiv flex" style={{'padding':"12px 0"}}>
        <div className="headerDiv">
          <img src='images/images-removebg-preview.png' alt="img" className='img'/>
          <h3>استعادة كلمة المرور</h3>
        </div>
        <form action='' className='form grid' id="email-form" onSubmit={submitForm}>
        <span className='showMessage'>أدخل عنوان بريدك الالكتروني   
 <br/>   لارسال رمز اعادة التعيين كلمة المرور</span>
        <div className="inputDiv">
        <label htmlFor='email'>عنوان البريد الالكتروني</label>
         <div className="input2 flex">

         <input type='email' id="email" name="email" placeholder='أدخل بريدك الإلكتروني' required className='input1'onChange={getFormValue}></input>
         <AiTwotoneMail className="icon" />        
          </div>
        </div> 
        <button type='submit' className='btn flex mt-3'>
          <span>ارسال</span>
        </button>
        </form>

      </div>
    </div>
    </div>

    )
}

export default SendCode