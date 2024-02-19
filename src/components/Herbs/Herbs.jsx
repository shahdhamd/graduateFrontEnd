// Herbs.jsx
import React, { useState, useEffect } from 'react';
import '../Contributions/Contributions.css';
import { Link } from 'react-router-dom';
import DataTable3 from '../DataTable3/DataTable3';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Spinner from '../Spinner/Spinner';
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'ArabicName', headerName: 'Arabic Name', width: 90 },
  { field: 'EnglishName', headerName: 'English Name', width: 90 },
  { field: 'place', headerName: 'Place', width: 90 },
  { field: 'benefit', headerName: 'Benefit', width: 90 },
  { field: 'effect', headerName: 'Effect', width: 90 },
  {
    field: 'image',
    headerName: 'Avatar',
    width: 100,
    renderCell: (params) => <img src={params.row.image} alt="Herb Avatar" />,
  },
];

function Herbs() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = `shahd__${localStorage.getItem('token')}`;

    const fetchHerbs = async () => {
      try {
        const response = await fetch(`https://spotless-moth-rugby-shirt.cyclic.app/api/v1/herb/`, {
          headers: {
            token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        // Check if 'herb' property exists and is an array
        const herbsArray = data?.herb && Array.isArray(data.herb) ? data.herb : [];
        const userRows = herbsArray.map((herb, index) => ({ id: index + 1, ...herb }));

        setRows(userRows);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchHerbs();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div className="contentContainer">
      <div className="users">
        <div className="info">
          <div className='contributTitle d-flex'>
            <h1 className='userTitle'>Herbs</h1>
          
          </div>
        </div>
        {loading ? (
            <Spinner/>
        ) : (
          <>
            <DataTable3 columns={columns} rows={rows} setOpen={() => {}} />
          </>
        )}
      </div>
    </div>
  );
}

export default Herbs;