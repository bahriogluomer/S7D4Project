import { Form, FormGroup, Label, FormFeedback, FormText, Input,Button } from "reactstrap"
import axios from "axios"
import { useState, useEffect } from "react"

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

const initialErrors = {
  email: false,
  password: false,
  terms: false,
};


export default function Login () {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(false);
 
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  useEffect(() => {
    if (
      validateEmail(form.email) &&
      form.password.trim().length >= 4 &&
      form.terms
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form]);
  
  const handleChange = (e) => {
    const {name, value, checked, type} = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm ({...form, [name]:newValue})

    if ((name === 'terms' && value) || (name === 'password' && value.length >=4)||
    (name === 'email' && validateEmail(value))) {
      setErrors({...errors,[name]:false})
    }else {
      setErrors({...errors, [name]: true})
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    
    if (!isValid) return;
    console.log('run');

    axios
      .get("https://6540a96145bedb25bfc247b4.mockapi.io/api/login")
      .then((res) => {
        const user = res.data.find(
          (item) => item.password == form.password && item.email == form.email
        );
        if (user) {
          setForm(initialForm);
          } 
      });
  };

    return(
      <>
      <h1>Login</h1>
    <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">
            please enter your email
          </Label>
          <Input type="email"  id="email" name="email"value={form.email} onChange={handleChange} invalid={errors.email} />
          <FormFeedback  >
            invalid email
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="password">
            please enter your password
          </Label>
          <Input  type="password" name="password" id="password" value={form.password} onChange={handleChange} invalid={errors.password}/>
          <FormFeedback >
            invalid password
          </FormFeedback>
          </FormGroup>
          <FormGroup check>
        <Input
          id="terms"
          type="checkbox"
          name="terms"
          value={form.terms} 
          onChange={handleChange}
          invalid={errors.terms}
        />
        {' '}
        <Label check>
        I am not a robot
        </Label>
        <FormFeedback >
            You must check this box
          </FormFeedback>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button data-cy="login-submit" disabled={!isValid} color="primary">
          Login
        </Button>
      </FormGroup>
      </Form>
      </>)
}