const Joi= require('joi');


// sign validate 
exports.validatesign = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })
  


  exports.loginvalidate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

