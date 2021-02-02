import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import axios from 'axios';
import "./Signup.css";

export default function Signup() {
  const apiurl = 'https://reqres.in/api/register';
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      "email": fields.email,
      "password": fields.password,
    }
    axios.post(apiurl, payload).then(function (response) {
      if (response.status === 200) {
        alert("success");
        userHasAuthenticated(true);
        history.push('/Login');
      }
      else {
        alert("error");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="email" size="lg">
        <Form.Label>Email</Form.Label>
        <Form.Control
          autoFocus
          type="email"
          value={fields.email}
          onChange={handleFieldChange}
        />
      </Form.Group>
      <Form.Group controlId="password" size="lg">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={fields.password}
          onChange={handleFieldChange}
        />
      </Form.Group>
      <Form.Group controlId="confirmPassword" size="lg">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          onChange={handleFieldChange}
          value={fields.confirmPassword}
        />
      </Form.Group>
      <Button
        size="lg"
        type="submit"
        variant="success"
        onClick={validateForm}
      >
        Signup
            </Button>
    </Form>

  )
}