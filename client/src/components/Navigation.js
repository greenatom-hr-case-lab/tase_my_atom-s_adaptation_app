import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import UserData from "./authentification/UserData";
import Profile from "./pages/Profile";
import About from "./pages/About";
import WorkerList from "./pages/WorkerList";
import NewWorker from "./pages/NewWorker";
import LogInForm from "./authentification/LogInForm";
import PlanList from "./for_plan/PlanList";


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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    "& > *": {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(4),
    },
  },
  menuButton: {
    marginRight: theme.spacing(75),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navigation() {
  const classes = useStyles();
  if (UserData.post === "crook") {
    return (
      <div className={classes.root}>
        <Router>
          <ThemeProvider theme={theme}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <ButtonGroup
                    variant="contained"
                    color="primary"
                    aria-label="contained primary button group"
                  >
                    <Button variant="contained" color="secondary" href="/">
                      Профиль
                    </Button>
                    <Button variant="contained" color="secondary" href="/about">
                      О приложении
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      href="/planlist"
                    >
                      Мой план адаптации
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      href="/loginform"
                    >
                      Выйти
                    </Button>
                  </ButtonGroup>
                </IconButton>
                <Typography edge="end" variant="h5" className={classes.title}>
                Гринатом
                </Typography>
              </Toolbar>
            </AppBar>

            <Switch>
              <Route exact path="/" component={Profile} />
              <Route exact path="/about" component={About} />
              <Route exact path="/workerlist" component={WorkerList} />
              <Route exact path="/planlist" component={PlanList} />
              <Route exact path="/loginform" component={LogInForm} />
            </Switch>
          </ThemeProvider>
        </Router>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Router>
          <ThemeProvider theme={theme}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <ButtonGroup
                    variant="contained"
                    color="primary"
                    aria-label="contained primary button group"
                  >
                    <Button variant="contained" color="primary" href="/">
                      Профиль
                    </Button>
                    <Button variant="contained" color="primary" href="/about">
                      О приложении
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      href="/workerlist"
                    >
                      Список сотрудников
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      href="/newworker"
                    >
                      Новый пользователь
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      href="/loginform"
                    >
                      Выйти
                    </Button>
                  </ButtonGroup>
                </IconButton>
                <Typography edge="end" variant="h5" className={classes.title}>Гринатом</Typography>
              </Toolbar>
            </AppBar>

            <Switch>
              <Route exact path="/" component={Profile} />
              <Route exact path="/about" component={About} />
              <Route exact path="/workerlist" component={WorkerList} />
              <Route exact path="/newworker" component={NewWorker} />
              <Route exact path="/loginform" component={LogInForm} />
            </Switch>
          </ThemeProvider>
        </Router>
      </div>
    );
  }
}
