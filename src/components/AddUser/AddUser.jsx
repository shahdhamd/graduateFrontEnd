import React, { useState } from 'react'
import './AddUser.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import joi from 'joi'
function AddUser() {
  let [ErrorList,setErrorList]=useState('')
  let [backendError ,setBackendError]=useState('')
  const token=`shahd__${localStorage.getItem('token')}`
  // let token='shahd__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2RhMWEwZGMwOTQ4YmU3OTBhZmM2YSIsImVtYWlsIjoic2hoZGg1Mjk2QGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiU2hhaGQiLCJpYXQiOjE3MDMwMTc2NTcsImV4cCI6MTcwMzEwNDA1N30.jS593M_Ha0EOGps_tC7AWfvweWqete1_j1UjdNobG58'
  let [user,setUser]=useState({
    userName:'',
    email:'',
    passward:''
  });

  let navigate=useNavigate();
  function goToUser(){
    let path='/user';
    navigate(path)
  }

  function validation(){
    const schema=joi.object({   
      userName:joi.string().required().min(3).max(25),
      email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      passward:joi.string().required(),
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
      let headers={
        token
      }
      console.log('token ',token)
      let {data}=await axios.post('https://spotless-moth-rugby-shirt.cyclic.app/api/v1/user/',user,{headers})
      // let {data}=await axios.post('http://localhost:3100/api/v1/user/',user,{headers})

      console.log({data})
      
    if(data.message==='sucess'){
      console.log('sucess')
      goToUser();
    }else{
      let error=JSON.stringify(data);
      console.log('data ',error)

      setBackendError(error)
    }
    console.log("Error ",ErrorList);
    }


  }


  return (
    <div className='add'>
        <div className="model">
         {/* <span className="close" onClick={() => props.setOpen(false)}>X</span> */}
       <h1>Add new User</h1>
         <form onSubmit={submitForm}>
          {/* {props.columns.map((column) => ( */}
             {/* // <div key={column.field} className="item">
//             //   <label>{column.headerName}</label>
//             //   <input type='text' placeholder={column.field} />
//             // </div> */}
             <div className="item">
               <label htmlFor='userName'>User Name:</label>
                <input type='text' placeholder='User name' id='userName' onChange={getFormValue} name='userName' className='form-control'/>
             </div>
             <div className='item'>
             <label htmlFor='email'>Email:</label>
                <input type='email' placeholder='Email' id='email' onChange={getFormValue} name='email' className='form-control' />
             </div>
             <div className="item">
             <label htmlFor='passward'>Password:</label>
                <input type='text' placeholder='password' id='passward' onChange={getFormValue} name='passward' className='form-control'  />
             </div>
             <div className='mt-3' style={{direction:'rtl'}}>
{ErrorList ? (
  <div className="alert alert-danger me-auto" style={{ 'width': '40%', 'borderRadius': '10px' }}>{ErrorList[0].message}</div>
) : (
  backendError ? (
    <div className="alert alert-danger me-auto " style={{ 'width': '40%', 'borderRadius': '20px' }}>{backendError}</div>
  ) : ''
)}
</div>
<div>
      <button type='submit' style={{ marginRight: '10px' }}>Send</button>
      <button style={{ display: "inline", marginRight: '10px',width:"100px"}}>
        <a href='/user' style={{ color: 'white', textDecoration: "none" }}>user</a>
      </button>
    </div>
           
         </form>
       </div> 
    </div>
  )
}

export default AddUser