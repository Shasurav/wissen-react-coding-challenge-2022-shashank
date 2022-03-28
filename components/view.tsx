import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTableHeader } from '../util/util';
import { userUrl } from '../util/env';
import Login from './login';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const View = (props) => {
  const dispatch = useDispatch();
  const [headers, setHeaders] = useState(null);
  const { status, users, isLoggedIn } = useSelector(
    (state) => state.userReducer
  );
  let expireTime = localStorage.getItem('timer');
  const getUsers = () => {
    const token = localStorage.getItem('token');
    let fetchUsers = fetch(`${userUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchUsers
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem('data', JSON.stringify(res.data));
        dispatch({ type: 'SET_USER', payload: res.data });
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setHeaders(getTableHeader(users));
  }, [users]);

  useEffect(() => {
    console.log(expireTime);

    if (expireTime > 0) {
      setInterval(() => {
        console.log('nnnnnnnnnn');
        expireTime = localStorage.getItem('timer');
        const timeElapsed = expireTime - 500;

        // dispatch({ type: 'SET_TIMER', payload: expireTime - 100 });
        localStorage.setItem('timer', timeElapsed);
      }, 500);
    }
  }, [isLoggedIn, expireTime]);
  return (
    <Fragment>
      {expireTime > 0 ? (
        <Fragment>
          <h2>{status}</h2>
          {headers ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableCell key={header}>{header.toUpperCase()}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.year}</TableCell>
                      <TableCell>{row.color}</TableCell>
                      <TableCell>{row.pantone_value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </Fragment>
      ) : (
        <Login />
      )}
    </Fragment>
  );
};

export default View;
