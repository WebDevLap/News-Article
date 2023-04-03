import axios from 'axios';
import { useEffect } from 'react';
import {
  setUserName,
  setUserRole,
  setUserVerified,
  userExit,
} from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';

export function useLogicForSigns() {
  const dispatch = useDispatch();

  useEffect(() => {
    const data = localStorage.getItem('userData');
    axios
      .get(
        `https://6403387ef61d96ac487a1e4d.mockapi.io/users?mail=${
          data && JSON.parse(data)['email']
        }`,
      )
      .then(res => res.data)
      .then(json => {
        if (!json.length) {
          localStorage.removeItem('userData');
          dispatch(userExit());
        } else {
          dispatch(setUserVerified(true));
          dispatch(setUserName(json[0].name));
          dispatch(setUserRole(json[0].role));
        }
      });
  }, []);
}
