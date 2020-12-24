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
//import { useFormFields } from "../libs/hooksLib";

export default function MyComponent(props) {

  const apiurl = 'https://reqres.in/api/unknown';
  const { isAuthenticated } = useAppContext();
  const [users, setUsers] = useState(null);
  //const [filterText, setFilterText] = useState('');
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState('');
  const [FilterType, setFilterType] = useState(0);
  const [filterText, handleFieldChange] = useFormFields({
    Text1: "",
    Text2: "",
    Text3: "",
    Text4: ""
  });


  const columns = [

    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      columns: '20%',
      visible: false
    },
    {
      name: 'Pantone_value',
      selector: 'pantone_value',
      sortable: true,
      columns: '20%',
      visible: false
    },
    {
      name: 'Year',
      selector: 'year',
      sortable: true,
      right: true,
      columns: '20%',
      visible: true
    },
    {
      name: 'Color',
      selector: 'color',
      sortable: true,
      right: true,
      columns: '20%',
      allowResize: true,
      visible: true
    },
    {
      name: 'Action',
      selector: 'id',
      sortable: false,
      right: true,
      columns: '20%',
      allowResize: true,
      visible: true,
      cell:
        record => {
          return (

            <Fragment>
              <button
                className="btn btn-primary btn-sm"
                style={{ margin: '5px' }}
                onClick={() => editRecord(users => users.indexof(users.id))}
              >Edit</button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteRecord(users => users.indexof(users.id))}
                {...<FontAwesomeIcon icon="fa fa-trash"></FontAwesomeIcon>}
              >Delete
            </button>
            </Fragment>
          );
        }
    }
  ];

  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      <Form.Group size="sm" controlId="Text1">
        <Form.Control type="text" className="TextField" name="1"
          placeholder="Filter By Name" aria-label="Search Input" value={filterText.Text1} autoFocus
          onChange={handleFieldChange} />
      </Form.Group>
      <Button className="ClearButton" onClick={onClear} style={{ marginBottom: '16px' }}>X</Button>

      <Form.Group size="sm" controlId="Text2"> 
        <Form.Control type="text" className="TextField" name="2"
          placeholder="Filter By Pantone value" aria-label="Search Input" value={filterText.Text2} autoFocus
          onChange={ handleFieldChange} onKeyUp={onFilter} />
      </Form.Group>
      <Button className="ClearButton" onClick={onClear} style={{ marginBottom: '16px' }}>X</Button>

      <Form.Group size="sm" controlId="Text3">
        <Form.Control type="text" className="TextField" name="3"
          placeholder="Filter By Year" aria-label="Search Input" value={filterText.Text3} autoFocus
          onChange={handleFieldChange} />
      </Form.Group>
      <Button className="ClearButton" onClick={onClear} style={{ marginBottom: '16px' }}>X</Button>

      <Form.Group size="sm" controlId="Text4">
        <Form.Control type="text" className="TextField" name="4"
          placeholder="Filter By Color" aria-label="Search Input" value={filterText.Text4} autoFocus
          onChange={handleFieldChange} />
      </Form.Group>
      <Button className="ClearButton" onClick={onClear} style={{ marginBottom: '16px' }}>X</Button>

    </>
  );

  const onFilter = (event) => {
    setFilterType(parseInt(event.target.name,10));
  }

  const editRecord = (props) => {
    setAlert(true);
    setMsg('Record Edited successfully');
  }
  const deleteRecord = (index) => {
    var user = [...users];
    user.splice(index, 1);
    setUsers(user);
    setAlert(true);
    setMsg('Record Deleted successfully');
    //console.log(users);
  }

 const filteredItems = users != null 
 ? users.filter(item => 
  FilterType == 1 ? item.name.toLowerCase().includes(filterText.Text1) :
  FilterType == 2 ? item.pantone_value.toLowerCase().includes(filterText.Text2) :
  FilterType == 3 ? item.year.toLowerCase().includes(filterText.Text3) : 
  FilterType == 4 ? item.color.toLowerCase().includes(filterText.Text4)  : 
  users) : "";

  
  
  console.log(filterText, FilterType);
    //&& item.name != null ? item.name.toLowerCase().includes(filterText.toLowerCase())
   

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        handleFieldChange('');
      }
    };

    // const Text = ({ FilterType == 1 ? filterText.Text1
    //   ? 2 : filterText.Text2
    //     ? 3 : filterText.Text3
    //       ? 4 : filterText.Text4 : filterText.Text1;

    return <FilterComponent onFilter={e => handleFieldChange(e.target.value)}
      onClear={handleClear}
      filterText={filterText} onKeyUp={onFilter} />;
  }, [handleFieldChange]);

  useEffect(() => {
    axios.get(apiurl)
      .then((response =>
        setUsers(response.data.data)))
  }, [])

  useEffect(() => {
    setInterval(() => {
      alert ?
        setAlert(false)
        : setAlert(false)
    }, 2000);
  }, [])

  const showHide = (e) => {
    const column = e.target.value;
    if (column === "1") {
      columns[1].show = false;
    }
  }
  return (
    <div className="Home" style={{ width: '85%', float: 'right' }}>
      {alert ?
        <Alert variant="danger">
          {msg}
        </Alert> : null}
      { isAuthenticated && users != null && users.length > 0 ?
        <>
          <Button variant="link" onClick={showHide} value='1'> Name</Button>
          <Button variant="link" onClick={showHide} value='2'> Pantone_value</Button>
          <Button variant="link" onClick={showHide} value='3'>Year</Button>
          <Button variant="link" onClick={showHide} value='4'> Color </Button>

          <DataTable
            title="UserList"
            columns={columns}
            data={filteredItems}
            selectableRows
            persistTableHead
            pagination='true'
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            colResizable
          /> </> : null

      }

    </div>

  )
}



