import { useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const useGetMessages = () => {
  const { selectedUser } = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // ✅ Do nothing if no user selected
    if (!selectedUser?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/message/${selectedUser._id}`,
          { withCredentials: true }   // ✅ CORRECT PLACE
        );

        dispatch(setMessages(res.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [selectedUser?._id, dispatch]); // ✅ FIXED DEPENDENCIES
};

export default useGetMessages;
