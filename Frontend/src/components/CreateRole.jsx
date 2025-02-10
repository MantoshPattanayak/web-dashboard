import React, { useState } from 'react';
import './CreateRole.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dataLength } from '../utils/regexExpAndDataLength';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const CreateRole = () => {
  const [postRoleData, setPostRoleData] = useState({
    roleName: "",
    roleCode: ""
  });
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({});
    setPostRoleData({ ...postRoleData, [name]: value });
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const errors = validate(postRoleData);
      setErrors(errors);
      if (Object.keys(errors).length === 0) {
        fetch("https://workingproject.onrender.com/api/role/create", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ roleName: postRoleData.roleName || null, roleCode: postRoleData.roleCode || null }),
        })
        .then(async (res) => {
          console.log("Response: " + await res.json());
          toast.success("Role created successfully", {
            autoClose: 1000,
            onClose: () => {
              setTimeout(() => navigate('/'), 500);
            }
          });
          setPostRoleData({ roleName: "", roleCode: "" });
        })
        .catch((error) => {
          console.error("Error while submitting...", error);
          toast.error("Error while submitting..");
        })
      } else {
        // Iterate over all input field errors
        Object.values(errors).forEach(error => {
          toast.error(error);
        });
      }
    } catch (err) {
      console.error("Error: " + err);
      toast.error("Failed to create role. Please try again.");
    }
  };

  const validate = (value) => {
    const errors = {};
    const Role_Name_regex = /^[a-zA-Z0-9\s]+$/;
    const Role_Code_regex = /^[A-Z_]+$/;
    if (!value.roleName) {
      errors.roleName = "Role Name is Required!";
    } else if (!Role_Name_regex.test(value.roleName)) {
      errors.roleName = "Role Name is not valid";
    }
    if (!value.roleCode) {
      errors.roleCode = "Role Code is Required!";
    } else if (!Role_Code_regex.test(value.roleCode)) {
      errors.roleCode = "Role Code is not valid";
    }
    return errors;
  }

  return (
    <div className='CreateNewRoleContainer'>
      <div className='form-heading'>
        <h2 className="">Create new Role</h2>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <button className="back-button" onClick={() => navigate('/')}>
            <FontAwesomeIcon icon={faArrowLeftLong} /> Back
          </button>
        </div>
        <div className="grid grid-cols-3 gap-1">
          <div className="form-group col-span-1">
            <label htmlFor="input2">Role name<span className='text-red-500'>*</span></label>
            <input type="text" name='roleName' value={postRoleData.roleName} placeholder="Enter role name" autoComplete='off' maxLength={dataLength.NAME} onChange={handleChange} />
            {errors.roleName && <p className='error-message'>{errors.roleName}</p>}
          </div>
          <div className="form-group col-span-1">
            <label htmlFor="input3">Role code <i>(In uppercase without space)</i><span className='text-red-500'>*</span></label>
            <input type="text" name='roleCode' value={postRoleData.roleCode} placeholder="Enter role code" autoComplete='off' maxLength={dataLength.NAME} onChange={handleChange} />
            {errors.roleCode && <p className='error-message'>{errors.roleCode}</p>}
          </div>
        </div>
        <div className="buttons-container">
          <button type='button' className="approve-button" onClick={handleCreate}>Submit</button>
          <button type='button' className="cancel-button" onClick={(e) => setPostRoleData({ roleName: "", roleCode: "" })}>Cancel</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateRole;
