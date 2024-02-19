import React, { useState } from 'react';
import '../Single/Single.css';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import joi from 'joi';

export default function Updateherbs() {
  const { id } = useParams();
  const location = useLocation();
  const rowData = location.state && location.state.rowData ? location.state.rowData : {};
  const [PlantEdit, setPlantEdit] = useState({});
  const [ErrorList, setErrorList] = useState('');
  const [backendError, setBackendError] = useState('');
  const token = `shahd__${localStorage.getItem('token')}`;
  let navigate = useNavigate();

  let goTocontribution = () => {
    let path = '/Herbs';
    navigate(path);
  };

  const getEditinfor = (e) => {
    const { name, value, files } = e.target;
    setPlantEdit((prevPlant) => ({
      ...prevPlant,
      [name]: name === 'image' ? files[0] : value,
    }));
    setErrorList('');
  };

  function validationEdit() {
    const schema = joi.object({
      ArabicName: joi.string().required(),
      EnglishName: joi.string().required(),
      description: joi.string().required(),
      benefit: joi.string().required(),
      image: joi.object().required(),
      effect: joi.string().required(),
      place: joi.string().required(),
    });

    return schema.validate(PlantEdit, { abortEarly: false });
  }

  async function SubmitEdit(e) {
    e.preventDefault();
    let validateForm = validationEdit();

    if (validateForm.error) {
      console.log('Validation error:', validateForm.error.details);
      setErrorList(validateForm.error.details);
      console.log('error list ', ErrorList);
    } else {
      try {
        console.log('PlantEdit', PlantEdit);

        let url = `https://spotless-moth-rugby-shirt.cyclic.app/api/v1/herb/${id}`;

        const headers = {
          'Content-Type': 'multipart/form-data',
          token,
        };

        const formData = new FormData();

        for (const key in PlantEdit) {
          formData.append(key, key === 'image' ? PlantEdit[key][0] : PlantEdit[key]);
        }

        console.log('test update url==> form data',formData)

        console.log('test update url==> PlantEdit data',PlantEdit)

        let { data } = await axios.patch(url, formData, { headers });
        console.log(data.message);

        if (data.message === 'success') {
          goTocontribution();
        } else {
          setBackendError(data.message);
          console.log(backendError);
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  }

  return (
    <div className="contri">
      <div className="contributTitle">
        <h1 className="userTitle">Edit herbs</h1>
        <button className="userUpdateButton"  ><a href='/Herbs' style={{color:'white',textDecoration:"none"}}>Herbs</a></button>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div style={{ display: 'flex' }}>
            <div className="userShowTopTitle">
              <span className="userShowUsername">{rowData.ArabicName}</span>
            </div>
          </div>
          <div className="userShowBotton">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <i className="fa-regular fa-address-card userShowIcon"></i>
              <div className="userShowInfoTitle">{id}</div>
            </div>
            <div className="userShowInfo">
            <i class="fa-solid fa-signature"></i>
              <div className="userShowInfoTitle">{rowData.ArabicName}</div>
            </div>
            <div className="userShowInfo">
            <i class="fa-solid fa-signature"></i>
              <div className="userShowInfoTitle">{rowData.EnglishName}</div>
            </div>
            <div className="userShowInfo">
            <i class="fa-solid fa-circle-info"></i>
              <div className="userShowInfoTitle">{rowData.description}</div>
            </div>
            <div className="userShowInfo">
            <i class="fa-brands fa-goodreads"></i>
              <div className="userShowInfoTitle">{rowData.benefit}</div>
            </div>
            <div className="userShowInfo">
            <i class="fa-solid fa-image"></i>
              <div className="userShowInfoTitle">{rowData.image}</div>
            </div>
            <div className="userShowInfo">
            <i class="fa-solid fa-image"></i>
              <div className="userShowInfoTitle">{rowData.effect}</div>
            </div>
            <div className="userShowInfo">
            <i class="fa-solid fa-location-dot"></i>
              <div className="userShowInfoTitle">{rowData.place}</div>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={SubmitEdit} encType="multipart/form-data">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label htmlFor="ArabicName"> ArabicName</label>
                <input
                  type="text"
                  placeholder={rowData.ArabicName}
                  id="ArabicName"
                  defaultValue={rowData.ArabicName}
                  name="ArabicName"
                  onChange={getEditinfor}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label htmlFor="EnglishName">EnglishName</label>
                <input
                  type="text"
                  placeholder={rowData.EnglishName}
                  id="EnglishName"
                  defaultValue={rowData.EnglishName}
                  name="EnglishName"
                  onChange={getEditinfor}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label htmlFor="description">description</label>
                <input
                  type="text"
                  placeholder={rowData.description}
                  id="description"
                  name="description"
                  defaultValue={rowData.description}
                  onChange={getEditinfor}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label htmlFor="benefit"> benefit</label>
                <input
                  type="text"
                  placeholder={rowData.benefit}
                  id="benefit"
                  name="benefit"
                  defaultValue={rowData.benefit}
                  onChange={getEditinfor}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label htmlFor="image"> image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={getEditinfor}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label htmlFor="effect"> effect</label>
                <input
                  type="text"
                  placeholder={rowData.effect}
                  id="effect"
                  name="effect"
                  defaultValue={rowData.effect}
                  onChange={getEditinfor}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label htmlFor="place"> place</label>
                <input
                  type="text"
                  placeholder={rowData.place}
                  id="place"
                  name="place"
                  defaultValue={rowData.place}
                  onChange={getEditinfor}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload"></div>
              <button className="userUpdateButton" type="submit">
                Update
              </button>
            </div>
          </form>
          <div className="mt-3">
            {ErrorList ? (
              <div className="alert alert-danger m-auto" style={{ width: '40%', borderRadius: '20px' }}>
                {ErrorList[0].message}
              </div>
            ) : backendError ? (
              <div className="alert alert-danger m-auto" style={{ width: '40%', borderRadius: '20px' }}>
                {backendError}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
