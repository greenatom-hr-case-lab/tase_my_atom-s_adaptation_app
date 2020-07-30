import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
    },
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    width: "35ch",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    width: "35ch",
  },
}));

export default function NewWorker() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container direction="column" justify="center" alignItems="center">
        <TextField
          required
          id="outlined-required"
          label="Введите логин"
          defaultValue="Логин"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Введите пароль"
          defaultValue="Пароль"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Введите имя сотрудника"
          defaultValue="Имя"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Введите фамилию сотрудника"
          defaultValue="Фамилия"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Введите отчество сотрудника"
          defaultValue="Отчество"
          variant="outlined"
        />
        <div>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="age-native-required">Руководитель</InputLabel>
            <Select
              native
              value={state.age}
              onChange={handleChange}
              name="age"
              inputProps={{
                id: "age-native-required",
              }}
            >
              <option aria-label="Руководитель" value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </Select>
            <FormHelperText>Выберите руководителя</FormHelperText>
          </FormControl>
        </div>
        <div className={classes.root}>
          <Button variant="contained" color="primary" href="#contained-buttons">
            Создать
          </Button>
        </div>
      </Grid>
    </form>
  );
}
