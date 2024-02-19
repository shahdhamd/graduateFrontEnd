import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <div className='header'> 
    <div className='image' >
      <img src='images/firstPalentPic.jpg' alt=''/>
    </div>
     <div className='text'>
        
        <p >
        <h2 className='font-semibold'>نبذة عنا </h2>
        مرحبًا بك في موقعنا الجديد والمبتكر الذي يهتم بالتعرف على النباتات باستخدام تحليل الصورة. ستكون تجربة مثيرة ومفيدة، حيث يمكنك ببساطة تحميل صورة لأي نبات ترغب في التعرف عليه. يعتمد الموقع على تقنيات متطورة لتحليل الصور والذكاء الاصطناعي، مما يتيح لك معرفة المعلومات الهامة عن النبات، مثل الاسم العلمي، الاستخدامات، والخصائص المميزة. انضم إلينا الآن واستكشف عالمًا جديدًا من التعرف على النباتات بطريقة مبتكرة وسهلة
        </p>
     </div>

    </div>
  )
}
