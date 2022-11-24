import { Image } from "antd";
import React from "react";
import LoginForm from "../components/login";

const Home = ({ ...props }) => {
  return (
    <div className="containerPrincipal">
      <div className="containers">
        <LoginForm />
      </div>
      <div className="containers rounded">
        <img src="/images/Documents-bro.png" />
      </div>
    </div>
  );
};

export default Home;
