import React, { useState } from 'react';
import joi, { func } from 'joi'
import axios from 'axios';
import { useParams ,useLocation} from 'react-router-dom'
import { AiTwotoneMail } from "react-icons/ai";
import { IoMdCode } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import './ForgetPassword.css';
import { Navigation, useNavigate } from 'react-router-dom';
import SendCode from './../SendCode/SendCode';


function ForgetPassword() {
  const location = useLocation();

    let submitForm = async (e) => {
        e.preventDefault();
        let validateForm = validation();
        if (validateForm.error) {
          console.log("Validation error:", validateForm.error.details);
          setErrorList(validateForm.error.details);
          console.log('error list   ', ErrorList)
          // console.log('error    ',ErrorList[0].message)
        } else {
          console.log("Validation successful");
          console.log('submit code   ', UserEmail.code)
          let { data } = await axios.patch('https://spotless-moth-rugby-shirt.cyclic.app/api/v1/auth/forgetpassword', UserEmail)
          // let {data}=await axios.post('http://localhost:3100/api/v1/auth/forgetpassword',UserEmail)

          console.log('data', data)
          goToLogin()
        }
      }

      function validation() {
        const schema = joi.object({
          // email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
          newPassward:joi.string().required().messages({
            'string.min': 'يجب ان يتكون كلمة المرور من 7 حرفًا على الاقل ',
        }),
        email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).messages({
            'string.email':'يُرجى إدخال عنوان بريد إلكتروني صحيح'
        }),
        code:joi.string().required()
        })
        return schema.validate(UserEmail, { abortEarly: false }); /// بمعنى طبق الفنكشن على المتغير يوزر
      }
      let [UserEmail, setUserEmail] = useState({
        email: location.state?.email || '',
        newPassward: '',
        code: ''
      })
      console.log("email",UserEmail.email);
      let navigate = useNavigate();

      function goToLogin(){
        navigate('/login')
      }

      let [ErrorList, setErrorList] = useState('')
      let getFormValue = (e) => {
        let myEmail = { ...UserEmail };
        myEmail[e.target.name] = e.target.value;
        setUserEmail(myEmail);
        console.log(e.target.value)
        setErrorList('')
      }

  return (
    <div className="formCard flex">
      <div className="container flex" style={{ "height": "89vh" }}>
        <div className="videoDiv">
          <video src='images/rain.mp4' autoPlay muted loop className='video'></video>
          <div className="textDiv">
            <h2 className='title'> تحليل صور الأعشاب الفلسطينية</h2>
          </div>
        <div className="footerDiv flex">
          <button className='btn'onClick={() => navigate('/SendCode')} >اضغط هنا</button>
          <span className='text' style={{'fontSize':"13px"}}>هل تريد إرسال رمز مرة أخرى؟</span>
        </div>
      </div>

      <div className="formDiv flex">
        <div className="headerDiv">
          <img src='images/images-removebg-preview.png' alt="img" className='img'/>
          <h3>إعادة تعيين كلمة المرور</h3>
        </div>
        <form action='' className='form grid' id="email-form" onSubmit={submitForm}>
        <span className='showMessage'>أدخل رمز إعادة التعيين <br/>لتغيير كلمة المرور الخاصة بك</span>
        {/* <div className="inputDiv">
         <label htmlFor='email'>Email</label>
         <div className="input2 flex">
         <AiTwotoneMail className="icon" />
         <input type='email' id="email" name="email" placeholder='enter your email' required className='input1' onChange={getFormValue}></input>
         </div>
        </div> */}

        <div className="inputDiv">
         <label htmlFor='reset-code'>رمز إعادة التعيين</label>
         <div className="input2 flex">
         <IoMdCode className="icon"/>
         <input type='text' id="reset-code" name="code" placeholder='ادخل رمز إعادة التعيين' required className='input1' onChange={getFormValue}></input>
         </div> 
        </div>
        <div className="inputDiv">
              <label htmlFor='newPassward'> كلمة المرور</label>
              <div className="input2 flex" >

                <input type='password' id="password" name="newPassward" placeholder='ادخل كلمة المرور' required className='input1' onChange={getFormValue}></input>
                <RiLockPasswordFill className="icon" />
              </div>
            </div>
        <button type='submit' className='btn flex'>

          <span>إعادة تعيين</span>
        </button>
        </form>

      </div>
    </div>
    </div>
  )
}

export default ForgetPassword