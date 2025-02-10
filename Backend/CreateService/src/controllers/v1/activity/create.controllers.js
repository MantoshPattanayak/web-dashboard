const db = require("../../../models/index");
const statusCode = require("../../../utils/statusCode");

const QueryTypes = db.QueryTypes;
const sequelize = db.sequelize;
const role = db.roles
const logger = require('../../../logger/logger.js')

const createRole = async (req, res) => {
    // store the request body in a user object
    // Save User in the database
    try {
    //   console.log("hfkd");
      let createRole;
      const { roleCode, roleName } = req.body;
  
      console.log("create Role", roleName, roleCode);
  
      // check if the request body is empty
      if (roleCode && roleName) {
        console.log("jfd", roleCode, roleName);
  
        createRole = await role.create({
          roleCode: roleCode,
          roleName: roleName,
          statusId: 1
        });
        if (createRole) {
          console.log("ja", createRole);
  
          return res.status(statusCode.SUCCESS.code).json({
            message: "Role created successfully",
          });
        }
        return res.status(statusCode.BAD_REQUEST.code).json({
          message: "Role is not created",
        });
      } else {
        return res.status(statusCode.BAD_REQUEST.code).json({
          message: "please provide all required details",
        });
      }
    } catch (error) {
      logger.error(`An error occurred: ${error.message}`); // Log the error
  
      return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({
        message: error.message,
      });
    }
  };

  module.exports = {
    createRole
  }