import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import { toast } from "react-toastify";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormControl } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import PersonIcon from "@material-ui/icons/Person";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import { FirebaseContext } from "./firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(0, 3, 0),
  },
}));

export default function Home() {

  const [open, setOpen] = React.useState(false);
  const wpurl="https://api.whatsapp.com/send?phone=+961"

  const classes = useStyles();
  const firebaseApp = React.useContext(FirebaseContext);

  const [fullname, setfullname] = useState("");
  const [phone, setphone] = useState("");
  const [balance, setbalance] = useState("0");

  const [Data, setData] = useState([]);

  const [load, setload] = useState(false);
  let totalPrice = Data.reduce(function (accumulator, item) {

    return accumulator +     (parseInt(item.balance))
     ;
  }, 0);

  const AddData = async (e) => {
    if (fullname && phone) {
      setload(true);
      await firebaseApp
        .firestore()
        .collection("client")
        .add({ fullname: fullname, phone: phone, balance: parseInt(balance) });
      setfullname("");
      setphone("");
      setbalance("0");
      setload(false);
      addnew();
    }
  };

  const getLinks = async () => {
    const db = firebase.firestore();
    return db
      .collection("client")
      .orderBy("fullname", "asc")
      .onSnapshot((snapshot) => {
        const postData = [];
        snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
        setData(postData);
        Data.sort();
        console.log(postData.reduce((a, v) => (a = a + v.balance), 0));
      });
  };
  const addnew = () => {
    var x = document.getElementById("addnew");
    var y = document.getElementById("closenew");

    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display = "none";
    } else {
      x.style.display = "none";
      y.style.display = "block";
    }
  };
  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div>
      <div className="grid-container">
        <div id="addnew" style={{ display: "none" }}>
          <Container component="main" maxWidth="xs">
          <span top="0">add new</span>

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
                  autoFocus
                  name="email"
                  value={fullname}
                  onChange={(e) => setfullname(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Phone"
                  autoComplete="off"
                  name="email"
                  value={phone}
                  type="number"

                  onChange={(e) => setphone(e.target.value)}
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
                  name="password"
                  type="number"

                  value={balance}
                  onChange={(e) => setbalance(e.target.value)}
                />

               
                <Button
                  // fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={addnew}
                >
                  Cancel
                </Button>
                <Button
                  // fullWidth
                  variant="contained"
                  color="primary"
                  disabled={load}
                  onClick={(e) => AddData()}
                  className={classes.submit}
                >
                  Save
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
        <div id="closenew">
          <div className="chat-popup" id="myForm">
            <Fab
                            onClick={addnew}

              style={{fontWeight:"200", color: "white", background: "#27ae60", left: 0 }}
              className="chat-popup"
              variant="extended"
            >
              <AddIcon
                variant="contained"
                className={classes.submit}
                className={classes.extendedIcon}
              />
            </Fab>
          </div>
          <span  >{totalPrice}</span>
          <TableContainer className="table1" component={Paper}>
            <Table aria-label="simple table">


              <TableHead  >
                <TableRow
                  style={{
                    background: "#3f51b5",
                    color: "white",
                    textAlign: "left",
                  }}
                >
                  <TableCell align="center" color="primary">
                    <span style={{ color: "white" }}>fullname</span>
                  </TableCell>
                  {/* <TableCell align="center">
                    <span style={{ color: "white" }}>phone</span>
                  </TableCell> */}
                  <TableCell align="center">
                    <span style={{ color: "white" }}>balance</span>
                  </TableCell>
                  <TableCell align="center">
                    <span style={{ color: "white" }}>action</span>
                  </TableCell>
                  {/* <TableCell align="center" color="primary">
                    <span style={{ color: "white" }}>
                      <Button onClick={addnew}>
                        <h1>+</h1>
                      </Button>
                    </span>
                  </TableCell> */}
                </TableRow>
              </TableHead>             

              <TableBody>
                {Data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.fullname}</TableCell>
                    {/* <TableCell align="center">{row.phone}</TableCell> */}
                    <TableCell align="center">{row.balance}</TableCell>
                    <TableCell align="center">
                      <a href={wpurl+row.phone} target="_blank"><WhatsAppIcon color="secondary" /></a>
                      <Link to={`/users/${row.id}`}>
                        <EditIcon style={{ cursor: "pointer" }} />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
