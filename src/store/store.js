import { configureStore } from '@reduxjs/toolkit';
import {authReducer} from './auth/authSlice'

const store = configureStore({
   reducer: {
      auth: authReducer
   },
});
export default store;

// import React from 'react';
// import styled from 'styled-components';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//    authSelector,
//    setApiSignature,
//    setToken,
//    setSk,
// } from './store/authSlice';
// import { useEffect } from 'react';
// import MD5 from 'crypto-js/md5';

// function Login() {
//    const dispatch = useDispatch();
//    const { api_key, secret, sk } = useSelector(authSelector);
//    const authorize = () => {
//       window.location.href = `http://www.last.fm/api/auth/?api_key=${api_key}`;
//    };
//    useEffect(() => {
//       const url = window.location.href;
//       if (url.indexOf('?token=') != -1 || url.indexOf('&token=') != -1) {
//          const token = url.split('token=')[1];
//          dispatch(setToken(token));

//          const api_sig = MD5(
//             `api_key${api_key}methodauth.getSessiontoken${token}${secret}`
//          );
//          // dispatch(setApiSignature(api_sig))

//          // const url = `https://ws.audioscrobbler.com/2.0/?method=auth.getSession&api_key=${api_key}&api_sig=${api_sig}&token=${token}&format=json` full url to get session key

//          fetch(
//             `https://ws.audioscrobbler.com/2.0/?method=auth.getSession&api_key=${api_key}&api_sig=${api_sig}&token=${token}&format=json`
//          )
//             .then((res) => res.json())
//             .then((data) => {
//                return dispatch(setSk(data.session.key));
//             });
//       }
//    }, []);
//    return (
//       <Container>
//          <button onClick={authorize}>Connect to last.fm</button>
//       </Container>
//    );
// }

// export default Login;

// const Container = styled.section`
//    display: flex;
//    justify-content: center;
//    align-items: center;
//    font-size: 22px;
//    color: black;
//    font-family: monospace;
//    height: 100vh;
//    width: 100vw;
//    background-color: #fbc;
//    button {
//       height: 55px;
//       width: fit-content;
//       padding: 0 30px;
//       background-color: #fff;
//       border: none;
//       border-radius: 5px;
//       cursor: pointer;
//       font-size: 22px;
//    }
// `;

// import {createSlice} from '@reduxjs/toolkit'

// const initialState = {
//    token: '',
//    api_key: 'fad3f80f9f436c3798263b87553f645d',
//    secret: '57f55113dfa056a3e58b95abf0d62bbe',
//    api_sig: '',
//    sk: ''   
// }

// const authSlice = createSlice({
//    name: 'auth',
//    initialState,
//    reducers: {
//       setToken(state, action) {
//          state.token = action.payload
//       },
//       setApiSignature(state, action) {
//          state.api_sig = action.payload
//       },
//       setSk(state, action) {
//          state.sk = action.payload
//       },
//    }
// })

// export const authSelector = (state) => state.auth
// export const {setToken, setApiSignature, setSk} = authSlice.actions
// export const authReducer = authSlice.reducer