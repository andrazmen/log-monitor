import { Form, redirect } from "react-router-dom";
import { useState } from "react";

import { customFetch } from "../utils";
import FormSearch from "../components/FormSearch";
import Wrapper from "../assets/wrappers/LoginPage";

const url = "/login";

export const loader = async () => {
  const user_token = JSON.parse(localStorage.getItem("token")) || null;
  const token = user_token?.token || null;
  if (token) {
    return redirect("/");
  }
  return;
};
export const action =
  () =>
  async ({ request }) => {
    const form_data = await request.formData();
    const data = Object.fromEntries(form_data);
    try {
      const response = await customFetch.post(url, data);
      const token = response.data.data;
      localStorage.setItem("token", JSON.stringify(token));
      return redirect("/");
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

const Login = () => {
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  const usernameChange = (event) => {
    setUsernameState(event.target.value);
  };
  const passwordChange = (event) => {
    setPasswordState(event.target.value);
  };
  return (
    <Wrapper>
      <div className="form-center">
        <h5 className="logo">Log Monitor</h5>
        <Form className="form-card" method="post">
          <FormSearch
            type="username"
            label="Username"
            name="username"
            value={usernameState}
            disabled={false}
            onChange={usernameChange}
          ></FormSearch>
          <FormSearch
            type="password"
            label="Password"
            name="password"
            value={passwordState}
            disabled={false}
            onChange={passwordChange}
          ></FormSearch>
          <button type="submit">Login</button>
        </Form>
      </div>
    </Wrapper>
  );
};
export default Login;
