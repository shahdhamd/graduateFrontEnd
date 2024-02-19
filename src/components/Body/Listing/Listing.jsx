import './Listing.css'

import { BsArrowRightShort } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import axios from 'axios'
import { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
// import Spinner from '../../Spinner/Spinner'
function Listing() {
  const currentPage = useRef()
  let [limit, setLimit] = useState(8)   /// في حال ما دخل ليمت تكون القيمة 1
  let [pageCounter, setPageCounter] = useState(1)
  let [herb, setHerb] = useState([]);
  const [loading, setLoading] = useState(true); 


  async function handlePageClick(e) {
    console.log(e);
    currentPage.current = e.selected + 1
    getData()
  }

  // async function getPageCount() {
  //   try {
  //     let { data } = await axios.get(`https://spotless-moth-rugby-shirt.cyclic.app/api/v1/herb/all`);
  //     return data.totalUser;
  //   } catch (error) {
  //     console.error('Error fetching pageCount:', error);
  //     return 1; // Default to 1 if there's an error
  //   }
  // }

  async function getData() {
    setLoading(true);
    let { data } = await axios.get(`https://spotless-moth-rugby-shirt.cyclic.app/api/v1/herb/all?page=${currentPage.current}&size=${limit}`)
    console.log(data.result)
    setHerb(data.result)
    setPageCounter(data.pageCount)
    console.log('herb pageCout', herb);
    setLoading(false);
  }

  useEffect(() => {
    currentPage.current = 1;
    getData();
    // setLoading(false); 
  }, [])
  return (
    <div className='listing'>
      {/* {loading ? (<>
        <div style={{ position: 'relative', minHeight: '100vh',display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <Spinner/>
            </div>
    </>  ) : (<> */}
      <div className="heading flex">
        
        <h1>My Listing</h1>
        <button className='btn flex'>
          See All <BsArrowRightShort className='icon' />
        </button>
      </div>
      
      <div className="containerApp " style={{ 'boxShadow': 'none', 'overflowY': 'none' }}>
        {herb.map((element) => {
          return <div className="singleItem">
            <AiFillHeart className='icon' />
            <div className=''>            
            <img src={element.image} alt='Image Name' />
            </div>

            <h3>{element.EnglishName}</h3>
          </div>
        })}
        <div style={{ width: '100%' }}></div>

        <ReactPaginate
          breakLabel="..."
          nextLabel=" >>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCounter}
          previousLabel="<<"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
   {/* </> )} */}
    </div>
  )
}
export default Listing