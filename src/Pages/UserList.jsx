import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserList } from '../slices/userListSlice';
import { entriesPerPageValue } from '../utils/constantData';

const UserList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const dispatch = useDispatch();
  const { userList, isLoading, error } = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(fetchUserList({ page: pageNumber, limit: pageLimit }));
  }, [pageNumber, pageLimit, dispatch]);

  const handleChangePerPage = (e) => {
    setPageNumber(1);
    setPageLimit(parseInt(e.target.value, 10));
  };

  return (
   <div className="w-[90%] sm:w-[85%] lg:w-[75%] max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-100 rounded shadow-lg sm:mt-16 lg:mt-24 mt-16">
  <h2 className="text-lg sm:text-xl font-semibold mb-4">User List</h2>

  <div className="mb-4 text-sm sm:text-base flex items-center justify-between">
    <label htmlFor="perPage" className="mr-2">Entries per page:</label>
    <select
      id="perPage"
      value={pageLimit}
      onChange={handleChangePerPage}
      className="ml-2 border rounded px-2 py-1 text-sm sm:text-base"
    >
      {entriesPerPageValue.map((value, index) => (
        <option key={index} value={value}>{value}</option>
      ))}
    </select>
  </div>

  {isLoading ? (
    <div className="flex justify-center items-center">
    <div className="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
  </div>
  
  ) : error ? (
    <div className="text-center text-red-500">{error}</div>
  ) : (
    <div className="overflow-x-auto"> 
      <table className="w-full text-left table-auto sm:table-auto">
        <thead>
          <tr>
            <th className="border-b-2 text-sm sm:text-base px-4 py-2">Name</th>
            <th className="border-b-2 text-sm sm:text-base px-4 py-2">Email</th>
            <th className="border-b-2 text-sm sm:text-base px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr key={index}>
              <td className="border-b px-4 py-2">{user.firstName} {user.lastName}</td>
              <td className="border-b px-4 py-2">{user.email}</td>
              <td className="border-b px-4 py-2">{user.roleId === 1 ? 'USER' : 'ADMIN'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  <div className="flex items-center justify-between mt-4">
    <button
      onClick={() => setPageNumber(pageNumber - 1)}
      disabled={pageNumber === 1 || isLoading}
      className={`${
        pageNumber === 1 || isLoading ? 'bg-gray-400' : 'bg-blue-500'
      } text-white py-2 px-4 sm:w-[100px] w-[90px] rounded transition duration-200`}
    >
      Previous
    </button>

    <div className="text-sm sm:text-base">Page {pageNumber}</div>

    <button
      onClick={() => setPageNumber(pageNumber + 1)}
      disabled={userList.length < pageLimit || isLoading}
      className={`${
        userList.length < pageLimit || isLoading
          ? 'bg-gray-400'
          : 'bg-blue-500'
      } text-white py-2 px-4 sm:w-[100px] w-[90px] rounded transition duration-200`}
    >
      Next
    </button>
  </div>
</div>

  );
};

export default UserList;
