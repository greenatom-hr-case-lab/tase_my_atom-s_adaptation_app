import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PlanList from "../for_plan/PlanList";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(1),
  },
  table: {
    minWidth: 600,
  },
  title: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
  },
}));

function createData(name, id, plan_status) {
  return { name, id, plan_status };
}

const rows = [
  createData("Ivan Petrov", 3, "true"),
  createData("Misha Kulkov", 4, "false"),
  createData("Gleb Antonov", 5, "true"),
  createData("Vladimir Karasev", 9, "true"),
];

export default function WorkerList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Список сотрудников
      </Typography>
      <TableContainer component={Paper}>
        <Router>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Имя сотрудника</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Plan status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">
                    <div className={classes.root}>
                      <Button variant="outlined" color="primary">
                        <Link to="/planlist" color="inherit">
                          Создать
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Switch>
            <Route exact path="/planlist" component={PlanList} />
          </Switch>
        </Router>
      </TableContainer>
    </div>
  );
}
