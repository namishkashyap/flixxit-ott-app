import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Movie() {
  const navigate = useNavigate();

  const user = useSelector((store) => store.app.user);
  useEffect(() => {
    if (user === undefined) {
      navigate("/login");
    }
  }, []);

  const paymentHandle = async (e) => {
    e.preventDefault();
    toast.success("We'll add payment method shortly");
  };

  return (
    <Container>
      {user && (
        <>
          <div className="container">
            <Navbar />
            <div className="mainWraper">
              <div className="data">
                <h1 className="headingText">
                  Hi, <span>{user.fullName}</span>
                </h1>
                <p className="upgradeText">Upgrade your plan</p>
              </div>
              <div className="subscriptionCard">
                <div className="cardMonthly">
                  <h3 className="headName">Monthly</h3>
                  <p className="price">&#8377; 199</p>
                  <p className="billedType">Billed Monthly</p>
                  <button
                    onClick={paymentHandle}
                    type="submit"
                    className="payButton"
                  >
                    Watch
                  </button>
                </div>
                <div className="cardyearly">
                  <h3 className="headName">Yearly</h3>
                  <p className="price">&#8377; 1999</p>
                  <p className="billedType">Billed Yearly</p>
                  <button
                    onClick={paymentHandle}
                    type="submit"
                    className="payButton"
                  >
                    Watch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  .data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    flex-grow: 1;
  }
  .headingText {
    margin: 10px 0px 0px 0px;
  }
  .headingText > span {
    color: #69e9e2;
  }
  .upgradeText {
    margin: 10px;
    font-size: 1.2rem;
  }
  .subscriptionCard {
    display: flex;
    place-items: center;
    justify-content: center;
    gap: 64px;
    height: 500px;
    border-left: solid 1px #69e9e2;
    flex-grow: 1;
  }
  .mainWraper {
    display: flex;
    flex-direction: row;
    place-content: center;
    align-items: center;
    width: 100%;
    height: 80dvh;
  }
  .cardMonthly,
  .cardyearly {
    width: 300px;
    height: 400px;
    border: solid 1px #69e9e2;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    place-items: center;
    transition: 0.5s;
    &:hover {
      box-shadow: #69e9e34e 0 0 50px 1px;
    }
  }
  .headName {
    font-size: 1.5rem;
    margin-bottom: 50px;
  }
  .price {
    font-size: 3rem;
    font-weight: 600;
    margin: -5px;
    color: #69e9e2;
  }
  .billedType {
    font-size: 1rem;
    margin: px;
  }
  .payButton {
    padding: 15px 50px;
    background-color: #e2e2e2;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 10px;
    border: none;
    margin-top: 50px;
    transition: 0.3s;
    &:hover {
      background-color: #69e9e2;
    }
  }
`;
