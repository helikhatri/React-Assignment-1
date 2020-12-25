import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import axios from 'axios';
import "./Login.css";

export default function Login(props) {

  const apiurl = 'https://reqres.in/api/login';
  const history = useHistory();

  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      "email": fields.email,
      "password": fields.password,
    }
    axios.post(apiurl, payload).then(function (response) {
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("username", JSON.stringify(response.email));
        //alert("success");
        userHasAuthenticated(true);
        history.push('/Userlist');
      }
    });
  };

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
            </LoaderButton>
      </Form>
    </div>
  );
}