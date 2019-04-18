// routes/user.js

//routes for table user
import { getAllUsers, getUserById, updateUser } from '../handlers/user';
const Joi = require('joi');
const userSchema = require('../schemas/user/user');
const updateUserSchema = require('../schemas/user/update');

const user = [
  {
      method: 'GET',
      path: '/user/all',
      handler: getAllUsers,
      options: {
          // API Documentation Generation
          tags: ['api'],
          description: 'Get the list of all users',
          plugins: {
              'hapi-swagger': {
                  // description of all possible responses provided by the API with their HTTP code
                  responses: {
                      '200': {
                          'description': 'Success',
                          'schema': Joi.array().items(userSchema)
                      },
                      '404': {
                          'description': 'Not Found',
                          'schema': Joi.object({
                              error: Joi.object({
                                  error_type: 'DATABASE_REQUIREMENTS',
                                  error_message: 'No existing data'
                              }),
                          })
                      },
                      '500': {
                          'description': 'Internal server error',
                          'schema': Joi.object({
                              error: Joi.object({
                                  error_type: 'SERVER_ERROR',
                                  error_message: 'Unspecified_server_error',
                                  inner_error: '<ERROR_MESSAGE>'
                              }),
                          })
                      }
                  }
              }
          },
      }
  },
  {
      method: 'GET',
      path: '/user/{id}',
      handler: getUserById,
      options: {
          // JOI validation for the request
          validate: {
              params: {
                  id: Joi.number().integer().required()
              }
          },
          // API Documentation Generation
          tags: ['api'],
          description: 'Get a specific user by using its id',
          plugins: {
              'hapi-swagger': {
                  // description of all possible responses provided by the API with their HTTP code
                  responses: {
                      '200': {
                          'description': 'Success',
                          'schema': userSchema
                      },
                      '400': {
                          'description': 'Bad Request',
                          'schema': Joi.object({
                              error: Joi.object({
                                  statusCode: '400',
                                  error: 'Bad Request',
                                  message: 'Invalid request params input'
                              }),
                          })
                      },
                      '404': {
                          'description': 'Not Found',
                          'schema': Joi.object({
                              error: Joi.object({
                                  error_type: 'DATABASE_REQUIREMENTS',
                                  error_message: 'id doesn\'t exist'
                              }),
                          })
                      },
                      '500': {
                          'description': 'Internal server error',
                          'schema': Joi.object({
                              error: Joi.object({
                                  error_type: 'SERVER_ERROR',
                                  error_message: 'Unspecified_server_error',
                                  inner_error: '<ERROR_MESSAGE>'
                              }),
                          })
                      }
                  }
              }
          },
      }
  },
  {
      method: 'PUT',
      path: '/user',
      handler: updateUser,
      options:{
          validate:{
              payload: updateUserSchema,
              //Show error for debug
              failAction: (request, h, err) => {
                  throw err;
                  return;
              }
          },
          // API Documentation Generation
          tags: ['api'],
          description: 'Update a user',
          plugins: {
              'hapi-swagger': {
                  // description of all possible responses provided by the API with their HTTP code
                  responses: {
                      '200': {
                          'description': 'Success',
                          'schema': Joi.array().items(Joi.number().integer())
                      },
                      '400': {
                          'description': 'Bad Request',
                          'schema': Joi.object({
                              statusCode: 400,
                              error: 'Bad Request',
                              message: 'Invalid request params input'

                          })
                      },
                      '409':{
                          'description': 'Database error',
                          'schema': Joi.object({
                              error: Joi.object({
                                  error_type: 'DATABASE_ERROR',
                                  error_message: 'Bad parameter name',
                                  inner_error: '<ERROR_MESSAGE>'
                              }),
                          })
                      },
                      '500': {
                          'description': 'Internal server error',
                          'schema': Joi.object({
                              error: Joi.object({
                                  error_type: 'SERVER_ERROR',
                                  error_message: 'Unspecified_server_error',
                                  inner_error: '<ERROR_MESSAGE>'
                              }),
                          })
                      }
                  }
              }
          },

      }
  }
];
export default user;