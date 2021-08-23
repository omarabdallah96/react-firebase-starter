import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";

import FavoriteIcon from "@material-ui/icons/Favorite";
import NavigationIcon from "@material-ui/icons/Navigation";
import PersonIcon from '@material-ui/icons/Person';
const initialValues = {
  fullname: "",
  phone: "",
  balance: "",
};
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
}));

function Edit_client(props) {
  const { history } = useHistory();
  const [userDetails, setUserDetails] = useState("");

  const { id } = useParams();
  const [values, setValues] = useState(initialValues);

  const [loading, setloading] = useState(false);
  const [fullname, setfullname] = useState("");
  const [phone, setphone] = useState(values.phone);
  const [balance, setbalance] = useState("");

  const handelchange = (e) => {
    //const name = e.target.name
    //const value = e.target.value
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    console.log(values);
  };
  const Edit_client = async () => {
    const body = {
      fullname: values.fullname,
      phone: values.phone,
      balance: values.balance,
    };
    console.log(body);
    if (
      values.fullname &&
      values.phone &&
      Number.isInteger(parseInt(values.balance))
    ) {
      setloading(true);
      await firebase.firestore().collection("client").doc(id).update(body);
      console.log("success");
      setloading(false);
      props.history.push("/");
    } else {
      console.log("error");
    }
  };
  const getData = async () => {
    const db = firebase.firestore();
    await db
      .collection("client")
      .doc(id)
      .get()
      .then((snapshot) => setValues(snapshot.data()));
  };
  useEffect(() => {
    getData();
  }, []);
  const classes = useStyles();

  return (
    <div>
      

      <Container component="main" maxWidth="xs">
        <div>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Full Name"
              autoComplete="off"
              name="fullname"
              value={values.fullname}
              onChange={handelchange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Phone"
              autoComplete="off"
              name="phone"
              type="number"

              value={values.phone}
              onChange={handelchange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Balance"
              id="password"
              autoComplete="off"
              name="balance"
              type="number"
              value={values.balance}
              onChange={handelchange}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.submit}
              onClick={Edit_client}
            >
              Update
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              disabled={loading}
              className={classes.submit}
              onClick={() => props.history.push("/")}
            >
              cancel
            </Button>

            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    </div>
  );
}

export default Edit_client;
