import React, { useState, useEffect, Fragment } from "react";
import DataTable from 'react-data-table-component';
import { useAppContext } from "../libs/contextLib";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from 'axios';
import "./Userlist.css";
//import { useFormFields } from "../libs/hooksLib";

export default function MyComponent(props) {

  const apiurl = 'https://reqres.in/api/unknown';
  const { isAuthenticated } = useAppContext();
  const [users, setUsers] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState('');
  let FilterType = 0;

  const columns = [

    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      columns: '20%',
      allowResize: true,
    },
    {
      name: 'Pantone_value',
      selector: 'pantone_value',
      sortable: true,
      columns: '20%',
      allowResize: true,
    },
    {
      name: 'Year',
      selector: 'year',
      sortable: true,
      right: true,
      columns: '20%',
      allowResize: true,
    },
    {
      name: 'Color',
      selector: 'color',
      sortable: true,
      right: true,
      columns: '20%',
      allowResize: true,
    },
    {
      name: 'Action',
      selector: 'id',
      sortable: false,
      right: true,
      columns: '20%',
      allowResize: true,
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
      <Form.Group size="sm" controlId="search1">
        <Form.Control type="text" className="TextField" type="text" name="FilterName"
          placeholder="Filter By Name" aria-label="Search Input" value={filterText} autoFocus
          onChange={onFilter} />
      </Form.Group>
      <Button className="ClearButton" onClick={onClear} style={{ marginBottom: '16px' }}>X</Button>

      {/* <Form.Group size="sm" controlId="search2">
        <Form.Control type="text" className="TextField"  type="text" name="FilterValue"
          placeholder="Filter By Pantone value" aria-label="Search Input" value={filterText} 
          onChange={onFilter} />
      </Form.Group>
      <Button className="ClearButton" onClick={onClear} style={{ marginBottom: '16px' }}>X</Button>

      <Form.Group size="sm" controlId="search3">
        <Form.Control type="text" className="TextField"  type="text" name="FilterYear"
          placeholder="Filter By Year" aria-label="Search Input" value={filterText} autoFocus
          onChange={onFilter} />
      </Form.Group>
      <Button className="ClearButton" onClick={onClear} style={{ marginBottom: '16px' }}>X</Button>

      <Form.Group size="sm" controlId="search4" >
        <Form.Control type="text" className="TextField" type="text" name="FilterColor"
          placeholder="Filter By Color" aria-label="Search Input" value={filterText} autoFocus
          onChange={onFilter}/>
      </Form.Group>
      <Button className="ClearButton" onClick={onClear} style={{ marginBottom: '16px' }}>X</Button> */}

    </>
  );

  const onFilter = (event, type) => {
    const value = event.target.value;
    setFilterText({
      ...setFilterText,
      [event.target.name]: value,
      clicked: false
    });
    FilterType = type;
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

  const filteredItems = users != null ? users.filter(item => item.name.includes(filterText.toLowerCase())
    //&& item.name != null ? item.name.toLowerCase().includes(filterText.toLowerCase())
  ) : "";

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText('');
      }
    };

    return <FilterComponent onFilter={e => setFilterText(e.target.value)}
      onClear={handleClear}
      filterText={filterText} />;
  }, [filterText]);

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

  const showHide= (e) =>
  {
    console.log(e);
  }
  return (
    <div className="Home" style={{ width: '85%', float: 'right' }}>
      {alert ?
        <Alert variant="danger">
          {msg}
        </Alert> : null}
      { isAuthenticated && users != null && users.length > 0 ?
      <>
            <Button variant="link" onClick={showHide} value='0'> Name</Button>
            <Button variant="link" onClick={showHide} data-column='1'> Pantone_value</Button>
            <Button variant="link" onClick={showHide} data-column='2'>Year</Button>
            <Button variant="link" onClick={showHide} data-column='3'> Color </Button>
       
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



