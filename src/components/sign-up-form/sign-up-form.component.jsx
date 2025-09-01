import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";

import {
  createAuthUserWithEmailPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFiels, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFiels;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password != confirmPassword) {
      alert("Passwords need to match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailPassword(email, password);

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("email already in use");
      } else if (error.code == "auth/weak-password") {
        alert("password must be at least 6 characters long");
      } else {
        console.error("handleSubmit: ", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target; // target is everything attached to the event

    setFormFields({ ...formFiels, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <div className="sign-up-container">
      <h2>I don't have an account</h2>
      <span>Enter your email and password to create account</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          lable={"Display name"}
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        ></FormInput>

        <FormInput
          lable={"Email"}
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        ></FormInput>

        <FormInput
          lable={"Password"}
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        ></FormInput>
        <FormInput
          lable={"Conform password"}
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        ></FormInput>
        <Button buttonType="inverted" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
