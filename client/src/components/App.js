import React, { Component } from "react";
import styled from "styled-components";
import Navigation from "./Navigation";
import UserData from "./authentification/UserData";
import LogInForm from "./authentification/LogInForm";
import "../index.css";

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

class App extends Component {
  async componentDidMount() {
    //Проверка загрузилась ли страница автооризации

    try {
      let res = await fetch("/isLoggedIn", {
        //Отправка запроса
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let result = await res.json(); // Ответ в формате json

      if (result && result.succes) {
        //Страница загрузилась, пользователь вошел
        UserData.loading = false;
        UserData.isLoggedIn = true;
        UserData.username = result.username;
      } else {
        UserData.loading = false; //Страница загрузилась, пользователь не вошел
        UserData.isLoggedIn = false;
      }
    } catch (e) {
      //Другая ошибка
      UserData.loading = false;
      UserData.isLoggedIn = false;
    }
  }

  async doLogOut() {
    //Проверка успешного выхоода из системы

    try {
      let res = await fetch("/logout", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let result = await res.json();

      if (result && result.succes) {
        UserData.isLoggedIn = false;
        UserData.username = "";
      } else {
        UserData.loading = false;
        UserData.isLoggedIn = false;
      }
    } catch (e) {
      console.log(e);
    }
  }

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    if (UserData.loading) {
      //Загрузка страницы
      return (
        <div className="app">
          <div className="container">Loading, please wait...</div>
        </div>
      );
    } else {
      if (UserData.isLoggedIn) {
        //Пользователь вошел
        return (
          <div>
            <Navigation />
           
          </div>
        );
      }
    }
    return (
      <div className="app">
        <div className="app">
          <div className="container">
            <LogInForm />
          </div>
        </div>
      </div>
    );
  }
}

// <p>{this.state.apiResponse}</p>

export default App;
