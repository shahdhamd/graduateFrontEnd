import React, { useState } from 'react'
import './Single.css'
import { useParams ,useLocation} from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import joi from 'joi'
function Single() {
    const { id } = useParams();
    const location = useLocation();
  const rowData = location.state.rowData;   
 const [UserEdit,setUserEdit]=useState();
const [ErrorList,setErrorList]=useState('')
const [backendError,setbackendError]=useState()
const token=`shahd__${localStorage.getItem('token')}`
let navigate = useNavigate();

  let goToUser = () => {
    let path = '/user'
    navigate(path)
  }
console.log('row ',rowData)
const getEditinfor = (e) => {
    let myUser={
      userName: rowData.userName,
  email: rowData.email,
  role: rowData.role,
    }
    // let myUser={...rowData}
    console.log(myUser)
    myUser[e.target.name]=e.target.value;
    console.log('myUser',myUser)
    setUserEdit(myUser)
    setErrorList('');
  };

function validationEdit() {
    const schema = joi.object({
      userName: joi.string().min(3).max(25),
      email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      role: joi.string(),
    });
 
    return schema.validate(UserEdit, { abortEarly: false });
  }

  async function SubmitEdit(e){
    
      e.preventDefault();
      let validateForm=validationEdit();
      
      if (validateForm.error) {
        console.log("Validation error:", validateForm.error.details);
        setErrorList(validateForm.error.details);
  
        console.log('error list   ',ErrorList)
        // console.log('error    ',ErrorList[0].message)
      } else {
try{
  console.log('useredit',UserEdit)

      let url=`https://spotless-moth-rugby-shirt.cyclic.app/api/v1/user/update/${id}`;
      // let url = `http://localhost:3100/api/v1/user/update/${id}`;
      const headers = {
        token
     };
     console.log('id ',id)
     let {data}=await axios.patch(url,UserEdit,{headers});
console.log(data.message)    
if(data.message=='sucess'){
//   console.log('setDfitUser ',editUser)
// setUserEdit(data)
goToUser()
    }else{
        setbackendError(data.message)
        console.log(backendError)
    }
    }
    
   catch(error){
      console.log('errrr',error)
    } }
  }

    return (
        <div className='contri'>
            <div className='contributTitle'>
                <h1 className='userTitle'>Edit User</h1>
                {/* <button className="userAddButton">Create</button> */}
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div style={{display:'flex'}}>
                        {/* <img src="https://res.cloudinary.com/dql35ano3/image/upload/v1699616297/plant/herb/654d3b7386369e923b34e8c6/yansoon1_jjxk2k.jpg" alt="" className="userShowImg" /> */}

                    <div className="userShowTopTitle">
                        <span className="userShowUsername">{rowData.userName}</span>
                        {/* <span className="userShowTitle">Software Engineer</span> */}
                    </div>
                    </div>
                     
                <div className="userShowBotton">
                    <span className="userShowTitle">Account Details</span>
                    <div className="userShowInfo">
                    <i class="fa-regular fa-address-card userShowIcon"></i>
                    <div className="userShowInfoTitle">{id}</div>
                    </div>
                    <div className="userShowInfo">
                        <i class="fa-regular fa-user userShowIcon"></i>
                        <div className="userShowInfoTitle">{rowData.userName}</div>
                    </div>
                    <div className="userShowInfo">
                        <i class="fa-regular fa-envelope userShowIcon"></i>
                        <div className="userShowInfoTitle">{rowData.email}</div>
                    </div>
                    <div className="userShowInfo">
                        <i className='fa-solid fa-r userShowIcon'></i>
                        <div className="userShowInfoTitle">{rowData.role}</div>
                    </div>
                </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className='userUpdateForm' onSubmit={SubmitEdit}>
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label htmlFor='userName' >UserName</label>
                                <input type="text" placeholder={rowData.userName} id='userName' defaultValue={rowData.userName} name='userName' onChange={getEditinfor} className='userUpdateInput'/>
                            </div>
                            
                            <div className="userUpdateItem">
                                <label htmlFor='email' >Email</label>
                                <input type="email" placeholder={rowData.email} id='email' defaultValue={rowData.email} name='email' onChange={getEditinfor} className='userUpdateInput'/>
                            </div>
                            <div className="userUpdateItem">
                                <label htmlFor='role' >Role</label>
                                <input type="text" placeholder={rowData.role} id='role' name='role' defaultValue={rowData.role} onChange={getEditinfor} className='userUpdateInput'/>
                            </div>
                        </div>
                         <div className="userUpdateRight">
                           <div className="userUpdateUpload">
                               {/*  <img src="https://res.cloudinary.com/dql35ano3/image/upload/v1699616297/plant/herb/654d3b7386369e923b34e8c6/yansoon1_jjxk2k.jpg" alt="" />
                                <label htmlFor="file"><i class="fa-solid fa-upload userUpdateIcon"></i></label>
                                <input type="file"  id='file' style={{display:'none'}}/>*/}
                            </div> 
                            <button className="userUpdateButton" type='submin' >Update</button>
                        </div>
                    </form>
                    <div className='mt-3' style={{direction:'rtl'}}>
  {ErrorList ? (
    <div className="alert alert-danger m-auto" style={{ 'width': '40%', 'borderRadius': '20px' }}>{ErrorList[0].message}</div>
  ) : (
    backendError ? (
      <div className="alert alert-danger m-auto" style={{ 'width': '40%', 'borderRadius': '20px' }}>{backendError}</div>
    ) : ''
  )}
</div>

                </div>
            </div>
        </div>
    );
}


export default Single