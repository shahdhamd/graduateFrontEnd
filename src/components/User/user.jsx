
import React, { useState, useEffect } from 'react';
import './user.css';
import { Link } from 'react-router-dom';
import DataTable2 from '../DataTable2/DataTable2';
import Spinner from '../Spinner/Spinner';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'userName', headerName: 'User Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'role', headerName: 'Role', width: 150 },
  { field: 'confirmEmail',     editable: false,  headerName: 'ConfirmEmail',type:'boolean', width: 120 },

];

function User() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
const slug='user'
  useEffect(() => {
    const token = `shahd__${localStorage.getItem('token')}`;

    // if (!token) {
    //   // Handle the case where the token is not available
    //   console.error('Token not available');
    //   return;
    // }

    const fetchUser = async () => {
      try {
        const response = await fetch('https://spotless-moth-rugby-shirt.cyclic.app/api/v1/user/', {
          headers: {
            // Authorization: `Bearer ${token}`,
            token
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        const userRows = data.user.map((user, index) => ({ id: index + 1, ...user }));
        setRows(userRows);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [open]);

  return (
    <div className="contentContainer">
      <div className="users">
       {loading ? (
          <Spinner/>
        ) : (
          <> <div className="info">
        <div className='contributTitle d-flex'>
                <h1 className='userTitle'>Users</h1>
                <Link className="userAddButton"  to='/addUser'>Add User</Link>
            </div>
          
        </div>
        
            <DataTable2 columns={columns} rows={rows} setOpen={setOpen}  slug={slug}/>
          </>
        )}
      </div>
    </div>
  );
}

export default User;

