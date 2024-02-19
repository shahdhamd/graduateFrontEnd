

import React, { useState, useEffect } from 'react';
import './Contributions.css';
import { Link } from 'react-router-dom';
import DataTable from '../DataTable/DataTable';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';
import Spinner from '../Spinner/Spinner';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'ArabicName', headerName: 'Arabic Name', width: 70 },
  { field: 'EnglishName', headerName: 'English Name', width: 70 },
  { field: 'place', headerName: 'Place', width: 70 },
  { field: 'benefit', headerName: 'benefit', width: 70 },
  { field: 'effect', headerName: 'effect', width: 70 },
  {field:'image',headerName:'Avater' , width:100,
  renderCell:(params)=>{
    return <img src={params.row.image} />
  }
},
  {
    field: 'verified',
    headerName: 'Verified',
    width: 150,
    editable: true,
    valueGetter: (params) => params.data || false, // Set default value to false
    type: "boolean",
  },
];

function Contributions() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
const slug='contribution'
  useEffect(() => {
    const token = `shahd__${localStorage.getItem('token')}`;

    // if (!token) {
    //   // Handle the case where the token is not available
    //   console.error('Token not available');
    //   return;
    // }

    const fetccontribution = async () => {
      try {
        const response = await fetch(`https://spotless-moth-rugby-shirt.cyclic.app/api/v1/contribution/`, {
          headers: {
            // Authorization: `Bearer ${token}`,
            token
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        const userRows = data.contribution.map((contribution, index) => ({ id: index + 1, ...contribution }));
        setRows(userRows);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetccontribution()
  }, [open]);

  return (
    <div className="contentContainer">
      <div className="users">
        <div className="info">
        <div className='contributTitle d-flex'>
                <h1 className='userTitle'>contribution</h1>
                <Link className="userAddButton"  to='/addPlant'>Add plant</Link>
            </div>
          {/* <h1>Users</h1>*/}
    
        </div>
        {loading ? (
       <Spinner/>
        ) : (
          <>
            <DataTable columns={columns} rows={rows} setOpen={setOpen}  slug={slug}/>
          </>
        )}
      </div>
    </div>
  );
}
export default Contributions;



