import React, { useState, useEffect, Fragment } from "react";
import DataTable from 'react-data-table-component';
import { useAppContext } from "../libs/contextLib";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useFormFields } from "../libs/hooksLib";
import axios from 'axios';
import "./Userlist.css";
import { CSVLink } from 'react-csv';
//import { useFormFields } from "../libs/hooksLib";

const MyComponent= (props)=>{

  const apiurl = 'https://reqres.in/api/unknown';
  const { isAuthenticated } = useAppContext();
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(false);
  const [hide, setShowhide] = useState(false);
  const [msg, setMsg] = useState('');
  const [FilterType, setFilterType] = useState(0);
  const [filterText, handleFieldChange] = useFormFields({
    Text1: "",
    Text2: "",
    Text3: "",
    Text4: ""
  });
  const [filterColumn, setFiltercolumn] = useState([]);
 // const [filteredItems,setFilteredItems]=useState([]);
  const columns=[

    {
      index: 0,
      name: 'Name',
      selector: 'name',
      sortable: true,
      visible: true
    },
    {
      index: 1,
      name: 'Pantone_value',
      selector: 'pantone_value',
      sortable: true,
      visible: true
    },
    {
      index: 2,
      name: 'Year',
      selector: 'year',
      sortable: true,
      right: true,
      visible: true
    },
    {
      index: 3,
      name: 'Color',
      selector: 'color',
      sortable: true,
      right: true,
      visible: true
    },
    {
      index: 4,
      name: 'Action',
      selector: 'id',
      sortable: false,
      right: true,
      visible: true,
      cell:
        record => {
          return (
            <Fragment>
              <button
                className="btn btn-primary btn-sm"
                style={{ margin: '5px' }}
                onClick={editRecord}
              >Edit</button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteRecord(record.id)}
                {...<FontAwesomeIcon icon="fa fa-trash"></FontAwesomeIcon>}
              >Delete
            </button>
            </Fragment>
          );
        }
    }
  ];
  
  useEffect(() => {
    
    axios.get(apiurl)
      .then((response =>
       {debugger;
         setUsers(response.data.data)
         debugger;}  ))
      .then(setFiltercolumn(columns))
      console.log(users);
  }, [])

  useEffect(() => {
    setInterval(() => {
      alert ?
        setAlert(false)
        : setAlert(false)
    }, 2000);
  }, [])

   
  const filteredItems = users != null && users.length >0 && filterText 
  ? users.filter(item =>
    FilterType == 1 ? item.name.toLowerCase().includes(filterText.Text1) :
      FilterType == 2 ? item.pantone_value.toLowerCase().includes(filterText.Text2) :
        FilterType == 3 ? item.year.toString().includes(filterText.Text3) :
          FilterType == 4 ? item.color.toLowerCase().includes(filterText.Text4) :
         users) :users;

  const FilterComponent = ({ filterText, onClear, onInput }) => (
    <>
      <Form.Group size="sm" controlId="Text1">
        <Form.Control type="text" className="TextField" name="1"
          placeholder="Filter By Name" aria-label="Search Input" value={filterText.Text1}
          onChange={handleFieldChange} onInput={onInput}
        />
      </Form.Group>
      <Button className="ClearButton" id='1' onClick={onClear} style={{ marginBottom: '16px' }}>X</Button>

      <Form.Group size="sm" controlId="Text2">
        <Form.Control type="text" className="TextField" name="2"
          placeholder="Filter By Pantone value" aria-label="Search Input" value={filterText.Text2}
          onChange={handleFieldChange} onInput={onInput} />
      </Form.Group>
      <Button className="ClearButton" id='2' onClick={onClear} style={{ marginBottom: '16px' }}>X</Button>

      <Form.Group size="sm" controlId="Text3">
        <Form.Control type="text" className="TextField" name="3"
          placeholder="Filter By Year" aria-label="Search Input" value={filterText.Text3}
          onChange={handleFieldChange} onInput={onInput} />
      </Form.Group>
      <Button className="ClearButton" id='3' onClick={onClear} style={{ marginBottom: '16px' }}>X</Button>

      <Form.Group size="sm" controlId="Text4">
        <Form.Control type="text" className="TextField" name="4"
          placeholder="Filter By Color" aria-label="Search Input" value={filterText.Text4}
          onChange={handleFieldChange} onInput={onInput} />
      </Form.Group>
      <Button className="ClearButton" id='4' onClick={onClear} style={{ marginBottom: '16px' }}>X</Button>

    </>
  );
  

  const onFilter = (event) => {
    var type = parseInt(event.target.name, 10);
    setFilterType(type);
  }

  const editRecord = (props) => {
    setAlert(true);
    const user = [...users];
    setMsg('Record Edited successfully');
  }
  const deleteRecord = (index) => {
    debugger;
    const user = [...users];
    user.splice(index, 1);
    setAlert(true);
   // filteredItems=user;
    setUsers(user);
    setMsg('Record Deleted successfully');
  }
  

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = (event) => {
    handleFieldChange(event,1);
    }

    return <FilterComponent onFilter={e => handleFieldChange(e.target.value)}
      onClear={handleClear}
      filterText={filterText} onInput={onFilter} />;
  }, [handleFieldChange]);


  const showHide = (e) => {
   // setShowhide(true);
    const index = parseInt(e.target.value);
    let column = [...filterColumn];
    if (column[index].index == index) {
      columns[index].visible = column[index].visible == true ? false : true;
    }
    column = columns.filter(col => col.visible == true);
    setFiltercolumn(column);
    setShowhide(true);
    if(columns[index].visible == false)
    {
      e.target.style.color='red';
    }
    else
    {
      e.target.style.color='blue';
    }
    console.log(hide, filterColumn);
  }
  return (
    <div className="Home" style={{ width: '85%', float: 'right' }}>
      {alert ?
        <Alert variant="danger">
          {msg}
        </Alert> : null}
      { isAuthenticated && users != null && users.length > 0 ?
        <>
          <Button variant="link" onClick={showHide} > Name</Button>
          <Button variant="link" onClick={showHide} > Pantone_value</Button>
          <Button variant="link" onClick={showHide} >Year</Button>
          <Button variant="link" onClick={showHide} > Color </Button>
          <CSVLink data={filteredItems} style={{ float: 'right' }} filename={"my-file.csv"}>Export CSV</CSVLink>
         
          <DataTable
            
            title="UserList"
            columns={columns}
            data={filteredItems}
            selectableRows
            persistTableHead
            pagination
            highlightOnHover
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            colResizable
            responsive
            striped
          /> </> : null

      }

    </div>

  )
}
export default MyComponent;



