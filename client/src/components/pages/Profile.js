import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginTop: theme.spacing(4),
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginBottom: theme.spacing(3),
      width: "25ch",
    },
  },
  Card: {
    maxWidth: 750,
    maxHeight: 500,
  },
}));

export default function Profile() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <Card className={classes.Card}>
          <CardActionArea>
            <CardMedia
              component="iframe"
              width="480"
              alt="UserFace"
              height="270"
              image="https://giphy.com/embed/4GIcsQJorDZOU"
              title="UserFace"
            />
          
        <TextField
          id="outlined-read-only-input"
          label="Имя"
          defaultValue="Валентин"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-read-only-input"
          label="Должность"
          defaultValue="Менеджер"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-read-only-input"
          label="Статус плана"
          defaultValue="Рассматривается"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        </CardActionArea>
        </Card>
      </div>
    </form>
  );
}
