import React from 'react'
import Header from '.././Header/Header'
import ScanImage from '.././ScanImage/ScanImage'
import Search from '.././Search/Search'
import Home from '.././Home/Home'
import Plantes from '.././Plantes/Plantes'
import Footer from '.././Footer/Footer'
export default function HomePage(props) {
  return (
    <div>
    <Home />
      <Header />
      <ScanImage  searchBar={props.searchBar} setLoading={props.setLoading}/>
      <Search value={props.value} 
    setValue={props.setValue} data={props.data} setShow ={props.setShow} searchBar={props.searchBar} />
    <Plantes />
    <Footer /> 
    </div>
  )
}