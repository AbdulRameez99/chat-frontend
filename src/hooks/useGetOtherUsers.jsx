import { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
import { BASE_URL } from '..';

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/user`,
          { withCredentials: true } // ✅ correct way
        );

        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchOtherUsers();
  }, [dispatch]); // ✅ correct dependency
};

export default useGetOtherUsers;
