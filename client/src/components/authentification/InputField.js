import React from "react";
import TextField from "@material-ui/core/TextField";

class InputField extends React.Component {
  render() {
    return (
      <div className="inputField">
        <TextField
          label={this.props.placeholder}
          className="input"
          type={this.props.type}
          value={this.props.value}
          onChange={(e) => this.props.onChange(e.target.value)}
        />
      </div>
    );
  }
}

export default InputField;
