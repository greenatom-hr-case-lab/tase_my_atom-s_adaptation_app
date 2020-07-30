import React from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import UserData from "./UserData";
import PasswordField from "./PasswordField";
import Grid from "@material-ui/core/Grid";


class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      buttonDisabled: false,
    };
  }

  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 12) {
      return;
    }

    this.setState({
      [property]: val,
    });
  }

  resetForm() {
    this.setState({
      username: "",
      password: "",
      buttonDisabled: false,
    });
  }

  async doLogin() {
    if (!this.state.username) {
      return;
    }

    if (!this.state.password) {
      return;
    }

    this.setState({
      buttonDisabled: true,
    });

    try {
      let res = await fetch("./login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });

      let result = await res.json();
      if (result && result.success) {
        UserData.isLoggedIn = true;
        UserData.username = result.username;
      } else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    } catch (e) {
      console.log(e);
      this.resetForm();
    }
  }

  render() {
    return (
      <Grid container justify="center" alignItems="center">
        <div className="loginForm">
          <br />
          <br />
          Вход
          <br />
          <br />
          <InputField
            type="text"
            placeholder="Имя пользователя"
            alue={this.state.username ? this.state.username : ""}
            onChange={(val) => this.setInputValue("username", val)}
          />
          <br />
          <PasswordField />
          <br />
          <SubmitButton
            text="Войти"
            disabled={this.state.buttonDisabled}
            onClick={() => this.doLogin()}
          />
        </div>
      </Grid>
    );
  }
}

export default LogInForm;
