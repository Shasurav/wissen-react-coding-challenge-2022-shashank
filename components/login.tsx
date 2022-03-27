import React, { Fragment, useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector, useDispatch } from 'react-redux';

import Logo from './logo';
import Input from './input';
import View from './view';
import { validateEmail, getTableHeader } from '../util/util';
import { loginUrl } from '../util/env';

const useStyles = makeStyles({
  root: {
    '& .Mui-disabled': {
      color: 'rgba(210,213,236,255)',
      backgroundColor: 'rgba(39,56,166,255)',
    },
    color: 'rgba(39,56,166,255)',
    backgroundColor: 'rgba(210,213,236,255)',
  },
  // root: {
  //   '&$disabled': {
  //     background: 'green',
  //     color: 'red',
  //     boxShadow: 'none',
  //   },
  // },
  // disabled: {},
});

const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.userReducer);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const isValidEmail = validateEmail(email);

  const enable = isValidEmail && password !== '' && checked;
  const handleChange = () => {
    setChecked(!checked);
  };

  const handleSubmit = async () => {
    if (enable) {
      let login = fetch(`${loginUrl}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: `${email}`,
          password: `${password}`,
        }),
      });

      login
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res);
        })
        .catch((e) =>
          e.json().then((json: any) => {
            console.log(json);
            dispatch({ type: 'SET_STATUS', payload: json.error });
          })
        )
        .then((res) => {
          localStorage.setItem('token', JSON.stringify(res.token));
          dispatch({ type: 'SET_LOGGEDIN', payload: true });
          dispatch({
            type: 'SET_STATUS',
            payload: 'Successfully logged in as Toast',
          });
        });
    }
  };
  useEffect(() => {}, [checked]);
  return (
    <Fragment>
      <Box sx={{ padding: 1 }}>
        <img src={Logo} />
        <h3>Hello there, Sign in to continue</h3>
        {status !== '' ? <h4>{status.toUpperCase()}</h4> : null}
      </Box>
      <Box sx={{ width: 400, padding: 1 }}>
        <Input label="Email" onValueChange={setEmail} value={email} />
        <Input
          label="Password"
          onValueChange={setPassword}
          visibility="false"
          value={password}
        />
      </Box>
      <Box sx={{ width: 400, display: 'flex' }}>
        <Checkbox
          sx={{ borderRadius: 100 }}
          checked={checked}
          onChange={handleChange}
        />
        <Box sx={{ width: 300, paddingTop: 3.5, fontColor: 'grey' }}>
          <span style={{ color: 'grey' }}>
            {' '}
            By creating and logging into an account, you are agreeing with our
            <span style={{ color: 'black' }}>
              <b> Terms and Conditions </b>
            </span>
            and
            <span style={{ color: 'black' }}>
              <b> Privacy Policys </b>
            </span>
          </span>
        </Box>
      </Box>
      <Box sx={{ width: 400, paddingTop: 6, paddingLeft: 1, marginBottom: 10 }}>
        <div className={classes.root}>
          <Button
            // classes={{ root: classes.root, disabled: classes.disabled }}
            fullWidth
            variant="contained"
            disabled={!enable}
            onClick={handleSubmit}
          >
            Next
          </Button>
        </div>
      </Box>
    </Fragment>
  );
};

export default Login;
