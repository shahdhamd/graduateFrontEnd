import React from 'react'
import './Searc.css'

export default function Search(props) {
  return (
    <div className="search" style={{ background:` url('images/newsletterbg.jpg')`}}>
        <div className="searchbar">  
        <input type="text" placeholder="ابحث عن اسم النبات الشائع له باللغة العربية" name="" id=""
         value={props.value} onChange={
          (e)=>{
            if (typeof props.setValue === 'function')
            props.setValue(e.target.value)
          }
        }/>
        <button onClick={()=>{
          if(props.value !== ''){
            console.log(props.value)
            if (typeof props.searchBar === 'function'){
            console.log(props.value)
          props.searchBar(props.value)}
        }
  
      }}
          >بحث
        </button>
        </div>
    </div>
  )
}
