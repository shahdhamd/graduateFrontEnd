import React from 'react'
import './Model.css'
import { useEffect } from 'react';
const Model = (props) => {
    useEffect(() => {
        const handleBodyScroll = (isOpen) => {
          const body = document.body;
          if (isOpen) {
            body.style.overflow = 'hidden';
          } else {
            body.style.overflow = 'auto';
          }
        };
    
        handleBodyScroll(props.searchResults.length > 0);
    
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [props.searchResults]);

      const appearInfo=(item, index)=>{
        document.getElementsByClassName('details')[index].innerHTML=item;
      }
    return (
        <>
            <div className='overlay'>
                <div className='Model'>
                    <span className='X' onClick={() => {
                        props.setShow(false)
                        props.setSearchResults([])
                        props.setValue('')
                    }}>X</span>
                    {
                        props.searchResults.length ?
                            (props.searchResults.map((item, index) =>

                                <div key={index} className='modelinfo' >
                                    <div className="img_name_details">
                                    <div className="img_name">
                                    <div className='image-container'>
                                        
                                            
                                            <img src={item.image} className='img' alt='plantImage' />
                                            </div>
                                        <div className='nameee'>
                                            <span>({item.EnglishName}) </span>
                                            <span>{item.ArabicName}</span>
                                         </div>
                                         </div>
                                         <div className="details" id='details'>
                                          <span>عرض النتائج</span>

                                            
                                         </div>
                                         </div>
                                        

                                      <div className='info_container'>
                                     <span onClick={()=>appearInfo(item.description, index )}>الوصف</span>
                                     <span onClick={()=>appearInfo(item.benefit, index)}>الفوائد</span>
                                     <span onClick={()=>appearInfo(item.effect, index)}>الاثار الجانبية</span>
                                     <span onClick={()=>appearInfo(item.place, index)}>المنشأ</span>
                                      </div>




                                </div>)) 
                                : 
                                
                                (<span style={{
                                    fontSize: '35px',
                                    display: 'flex', justifyContent: "center",
                                    alignItems: "center", height: "80%"
                                }}>نعتذر, لا تتوفر نتائج لبحثك</span>)

                    }
                </div>
            </div>
        </>
    )
}

export default Model