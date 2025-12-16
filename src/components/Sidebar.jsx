import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser
} from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { otherUsers } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ LOGOUT HANDLER (CORRECT)
  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/user/logout`,
        { withCredentials: true }
      );

      toast.success(res.data.message);
      navigate("/login");

      // ✅ RESET STATE CORRECTLY
      dispatch(setAuthUser(null));
      dispatch(setMessages([]));
      dispatch(setOtherUsers([]));
      dispatch(setSelectedUser(null));

    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  // ✅ SEARCH HANDLER (DOES NOT MUTATE REDUX)
  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    const foundUser = otherUsers.find(user =>
      user.fullName?.toLowerCase().includes(search.toLowerCase())
    );

    if (!foundUser) {
      toast.error("User not found!");
    }
  };

  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <form
        onSubmit={searchSubmitHandler}
        className='flex items-center gap-2'
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='input input-bordered rounded-md'
          type="text"
          placeholder='Search...'
        />
        <button type='submit' className='btn bg-zinc-700 text-white'>
          <BiSearchAlt2 className='w-6 h-6 outline-none' />
        </button>
      </form>

      <div className="divider px-3"></div>

      {/* ✅ USERS LIST (ALWAYS INTACT) */}
      <OtherUsers />

      <div className='mt-2'>
        <button
          onClick={logoutHandler}
          className='btn btn-sm'
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
