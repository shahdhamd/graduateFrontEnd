// DataTable3.jsx
import React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import '../DataTable/DataTable.css';
import axios from 'axios';

type Props = {
  columns: GridColDef[];
  rows: object[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DataTable3(props: Props) {
  const token = `shahd__${localStorage.getItem('token')}`;

  const handleDelete = async (id) => {
    const headers = {
    token
    };
    try {
    let url = `https://spotless-moth-rugby-shirt.cyclic.app/api/v1/herb/${id}`;
    console.log('url token', url)
    let { data } = await axios.delete(url, { headers });
    console.log(data.message)
    if (data.message == 'sucess') {
    // setMessage(data.message)
    props.setOpen((prevOpen) => !prevOpen);
    }
    } catch (error) {
    console.log(error)
    }
    }

  const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Action',
    width: 200,
    renderCell: (params) => (
      <div className='action' style={{ gap: '20px', display: 'flex' }}>
        <Link to={`/Updareherbs/${params.row._id}`} state={{ rowData: params.row }} className='edit'>
          <i className="fa-solid fa-pen-to-square editIcon"></i>
        </Link>
        <Link className='Delete' onClick={() => handleDelete(params.row._id)}>
          <i className="fa-solid fa-trash-can DeleteIcon"></i>
        </Link>
      </div>
    ),
  };

  const newColumns = props.columns.filter((col) => col.field !== 'verified');

  return (
    <div className='dataTable'>
      <DataGrid
        className='dataDrid'
        rows={props.rows}
        columns={[...newColumns, actionColumn]}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
      />
    </div>
  );
}

export default DataTable3;
