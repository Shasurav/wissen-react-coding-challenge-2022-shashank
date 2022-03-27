import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTableHeader } from '../util/util';
import data from './data.json';
import { userUrl } from '../util/env';

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
  const { status, users } = useSelector((state) => state.userReducer);

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

  return (
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
  );
};

export default View;
