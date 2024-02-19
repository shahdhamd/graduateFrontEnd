import React, { useEffect, useState } from 'react'
import './ScanImage.css'
import axios from 'axios'

export default function ScanImage(props) {
  const [selectedImage, setSelectedImage] = useState(null);

  // useEffect(() => {
  //   if (selectedImage) {
  //     handleSubmit();
  //   }
  // }, [selectedImage]);
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    console.log(event.target.files[0])
    // console.log(selectedImage);

  };

  const handleSubmit = async (event) => {
    console.log('handle Submit' )
    event.preventDefault();
    let token=`shahd__${localStorage.getItem('token')}`;
    console.log('token from loac ',localStorage.getItem('token'))
    try {
      if (!selectedImage) {
        console.log('Please select an image to upload.');
        return;
      }
      const headers = {
      token
      };
      const formData = new FormData();

      formData.append('image', selectedImage);

  //    const response = await axios.patch('http://localhost:3100/api/v1/user/');
      
console.log([...formData.entries()]);
      props.setLoading(true);
      const response = await axios.patch('http://localhost:3005/api/v1/user',
       formData, {headers});
       const imgPredict = response.data.imgPredict;

       // Find the index of "step" in the string
       const stepIndex = imgPredict.indexOf('step');
     
       // If "step" is found, extract the substring after it
       const substringAfterStep = stepIndex !== -1 ? imgPredict.substring(stepIndex + 4) : imgPredict;
     
       // Use the substring as needed, for example, pass it to a function
       props.searchBar(substringAfterStep);
       props.setLoading(false);

      console.log('Upload successful:', response.data.imgPredict ,imgPredict);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };



  return (
    <div class='uploadImgae'>
      <div className="scan" style={{'textAlign':'center'}}>
      <div className="leftScan">
       <p>
        <h2 className='font-semibold'>تعرف على النباتات بمجرد لقطة</h2>
        التقط أو ارفع صورة لأي نبات بكل بساطة، وستحصل على نتائج تعرف دقيقة وفورية مع تكنولوجيا الذكاء الصطناعي الثورية الخاصة بنا.
       </p>
       <form onSubmit={handleSubmit}>
          <label htmlFor="exampleFormControlFile1"> <img src='images/upload.jpg' alt=''/>
          </label>      
          <input type="file" onChange={handleImageChange} accept='image/' name='image' className="form-control-file" id="exampleFormControlFile1" />
          <button className='d-inline' type='submit'>تحميل </button>
        </form>
       </div>
       <div className='image'>
      <img src='images/feature1.webp' alt=''style={{'width':'100%','margin':'auto'}}/>
       </div>

    </div>
    </div>
    
  )
}