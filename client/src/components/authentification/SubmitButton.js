import React from "react";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#43a047",
    },
    secondary: {
      main: "#66bb6a",
    },
  },
});

class SubminButton extends React.Component {
  render() {
    return (
      <div className="submitButton">
        <Button
          color="primary"
          variant="contained"
          className="btn"
          disabled={this.props.disabled}
          onClick={() => this.props.onClick()}
        >
          {this.props.text}
        </Button>
      </div>
    );
  }
}

export default SubminButton;
