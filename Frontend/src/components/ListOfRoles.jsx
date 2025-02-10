import React, { useEffect, useState, useCallback } from 'react';
import "./ListOfRoles.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const ListOfRoles = () => {
  let navigate = useNavigate();
  const [roleListData, setRoleListData] = useState([]);
  const [givenReq, setGivenReq] = useState('');

  //function to execute fetch search query result
  function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    }
  }

  //debounced function to execute API calls after a delay
  const debouncedFetchRoleList = useCallback(debounce(getRoleListData, 600), []);

  // Function to fetch role list data
  async function getRoleListData(givenReq = null) {
    fetch('https://workingproject.onrender.com/api/role/viewRole', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(async (res) => {
        let data = await res.json();
        console.log("response received", data.Role);
        if(givenReq) {
          givenReq = givenReq.toLowerCase();
          let filteredData = data.Role.filter((role) => {
            return role.roleCode.toLowerCase().includes(givenReq) ||
            ("active".includes(givenReq) && role.statusId == 1) ||
            ("inactive".includes(givenReq) && role.statusId == 2);
          });
          setRoleListData(filteredData);
          return;
        }
        setRoleListData(data.Role);
      })
      .catch(error => {
        console.error(error);
      })
  }

  function handleSearchQuery(e) {
    e.preventDefault();
    let value = e.target.value;
    console.log(value);
    setGivenReq(value);
    return;
  }

  //on page load fetch roles data
  useEffect(() => {
    getRoleListData()
  }, []);

  //page regresh on search query input
  useEffect(() => {
    if (givenReq != null) {
      debouncedFetchRoleList(givenReq);
    }
  }, [givenReq])


  return (
    <div className='ListOfRoles'>
      <div className='table-heading'>
        <h2 className="">View Roles</h2>
      </div>
      <div className="search_text_conatiner">
        <button className='search_field_button' onClick={() => navigate('/create')}>
          <FontAwesomeIcon icon={faPlus} /> Create new Role
        </button>
        <input
          type="text"
          className="search_input_field"
          placeholder="Search..."
          id="myInput"
          value={givenReq}
          onChange={handleSearchQuery}
          autoComplete='off'
        />
      </div>
      <div className="table_Container">
        <table>
          <thead>
            <tr>
              <th scope="col">Role Name</th>
              <th scope="col">Role Code</th>
              <th scope="col">Role Status</th>
            </tr>
          </thead>
          <tbody>
            {
              roleListData?.length > 0 && roleListData?.map((item, index) => {
                return (<tr key={index}>
                  <td>{item.roleName}</td>
                  <td>{item.roleCode}</td>
                  <td>{item.statusId == 1 ? 'Active' : 'Inactive'}</td>
                </tr>)
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOfRoles;
