import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams ,GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import '../DataTable/DataTable.css'
import axios from 'axios';
type Props={
    columns:GridColDef[],
    rows:object[],
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    slug:string
}
function DataTable2(props:Props) {
let token=`shahd__${localStorage.getItem('token')}`
  const handleDelete=async(id)=>{
    const headers = {
      token
   };
try{
 let url=`https://spotless-moth-rugby-shirt.cyclic.app/api/v1/${props.slug}/${id}`;

 console.log('url token',url)
let {data}=await axios.delete(url,{headers});
console.log(data.message)    
if(data.message=='sucess'){
// setMessage(data.message)
props.setOpen((prevOpen) => !prevOpen);
}
}catch(error){
 console.log(error)
}
}
    const actionColumn:GridColDef={
        field:'action',
        headerName:"Action",
        editable: false,
        width:200,
        renderCell:(params)=>{
            return (
                <div className='action' style={{gap:'20px' ,display:'flex'}}>
                  <Link
  to={`/user/${params.row._id}`}
  state={{ rowData: params.row }}
  className='edit'
><i className="fa-solid fa-pen-to-square editIcon"></i></Link>
          <Link className='Delete' onClick={()=>handleDelete(params.row._id)}>
            <i className="fa-solid fa-trash-can DeleteIcon"></i>
          </Link>
                </div>
            )
        }
    }
    
  return (
    <div className='dataTable'>
        <DataGrid
        className='dataDrid'
        rows={props.rows}
        columns={[...props.columns,actionColumn]}
        slots={{toolbar:GridToolbar}}
        slotProps={{
            toolbar:{
                showQuickFilter:true,
                quickFilterProps:{debounceMs:500}
            }
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
  )
}
export default DataTable2