import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import './DataTable.css';
import axios from 'axios';

type Props = {
columns: GridColDef[];
rows: object[];
setOpen: React.Dispatch<React.SetStateAction<boolean>>;
slug: string;
};

function DataTable(props: Props) {
const token = `shahd__${localStorage.getItem('token')}`;
/// To Refresh ...
const [verifiedState, setVerifiedState] = useState({});

useEffect(() => {
    const updatedVerifiedState = {};
    props.rows.forEach(row => {
      updatedVerifiedState[row._id] = row.verified;
    });
    setVerifiedState(updatedVerifiedState);
  }, [props.rows]);
/////////////////////////////////////////////////////////////////////////////////  

const handleDelete = async (id) => {
const headers = {
token
};
try {
let url = `https://spotless-moth-rugby-shirt.cyclic.app/api/v1/contribution/${id}`;
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



// handle verified code *********************************
//4 change the value of verfied from true to false and vise versa
const handleVerified = async (e, row) => {
e.preventDefault();
//////// To Solve Refresh Problem
const updatedVerifiedState = { ...verifiedState };
updatedVerifiedState[row._id] = !verifiedState[row._id];
setVerifiedState(updatedVerifiedState);
/////
console.log('event is ', e);
console.log('verified row is ', row);

let newDatawithVerifiedOption = {
...row, verified: !e[verified]
}
// {
// ...row, verified: !e[verified]
// }

console.log('newDatawithVerifiedOption before change= ', newDatawithVerifiedOption);
console.log('newDatawithVerifiedOption after change= ', newDatawithVerifiedOption);
console.log('row._id = ', row._id);

/////////////////////////////////////////////// Add followed to Verified /////////////////////////////////////
const userName = localStorage.getItem('username')
const formData = new FormData();
formData.append('name', userName)
////////////////


for (const key in newDatawithVerifiedOption) {
formData.append(key, key === 'image' ? newDatawithVerifiedOption[key][0] : newDatawithVerifiedOption[key]);
console.log('data key',newDatawithVerifiedOption[key])
}

console.log('formData Form_Data==', formData);
console.log('newDatawithVerifiedOption Form_Data==', newDatawithVerifiedOption);

try {
let url = `https://spotless-moth-rugby-shirt.cyclic.app/api/v1/contribution/${row._id}`;
const headers = {
'Content-Type': 'multipart/form-data',
token,
};


let { data } = await axios.patch(url, formData, { headers });

console.log('data.message====1', data.message);

if (data.message === 'success') {
alert("verified value has been changed!")
} else {

console.log('data.message====2', data.message);
}
} catch (error) {
console.log('error', error);
}


}
const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Action',
    editable: false,
    width: 200,
    renderCell: (params) => {
    return (
    <div className='action' style={{ gap: '20px', display: 'flex' }}>
    
    <Link
    to={`/update/${params.row._id}`}
    state={{ rowData: params.row }}
    className='edit'
    >
    <i className="fa-solid fa-pen-to-square editIcon"></i>
    </Link>
    <Link className='Delete' onClick={() => handleDelete(params.row._id)}>
    <i className="fa-solid fa-trash-can DeleteIcon"></i>
    </Link>
    </div>
    );
    },
    }
//3 costumiztion for verified column in the Grid table
const verified: GridColDef = {
field: 'verified',
headerName: 'Verified',
editable: false,
width: 200,
renderCell: (params) => {
return (
<div className='verify' style={{ gap: '20px', display: 'flex' }}>
<form className="updateVerifiedValueForm" onSubmit={event => handleVerified(event, params.row)} encType="multipart/form-data">
<button className='btn' type="submit">
{verifiedState[params.row._id] === false ? <i className="fa-solid fa-x"></i> : <i className="fa-solid fa-check"></i>}
</button>
</form>
</div>
);
},
}
//End of handle verified code *********************************

// 1 remove verified column from the default headers because we need to customize it using rendercell
let oldCols = [...props.columns];
let newColumns = oldCols.filter( col => col.field != 'verified');
console.log('new cols val===>',newColumns)

return (
<div className='dataTable'>
<DataGrid
className='dataDrid'
rows={props.rows}
//2 updated by Raghad, change ...props.columns to ...newColumns, verified
// to customize the value of verified column in the data grid
columns={[...newColumns, verified, actionColumn]}
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
// checkboxSelection
disableRowSelectionOnClick
disableColumnFilter
disableColumnSelector
disableDensitySelector
/>
</div>
);
}

export default DataTable;
