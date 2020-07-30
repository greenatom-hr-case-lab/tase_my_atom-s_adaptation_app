import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 450,
  },
  Card: {
    maxWidth: 480,
  },
});

export default function About() {
  const classes = useStyles();

  return (
    <Card className={classes.Card}>
      <CardActionArea>
        <CardMedia
          component="iframe"
          width="480"
          alt="Contemplative Reptile"
          height="354"
          image="https://giphy.com/embed/3ohs7KViF6rA4aan5u"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Комментарии от разработчиков
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Авторы данного сервиса неутомимо работают над совершенствованием проекта.
            Мы открыты для предложений. Проект разработан командой "taste_my_atom".
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
