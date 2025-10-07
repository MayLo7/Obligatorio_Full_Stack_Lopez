const { StatusCodes } = require('http-status-codes');
const { createError } = require('../utils/errors');
const userService = require('../services/user.service');
const updateUserPlanSchema = require('../validators/update.user.plan.schema')





const updateUserPlan = async (req, res) => {
  const { body } = req;

  if (!body) {
    res.status(StatusCodes.BAD_REQUEST).json(createError('bad_request', 'INVALID body'));
    return;
  }
  const { error } = updateUserPlanSchema.validate(body);
  if (error) {
    res.status(StatusCodes.BAD_REQUEST).json(createError('bad_request', error.details[0].message));
    return;
  }

  try {
    const updated = await userService.updateUserPlan(req.params.id, body.plan);
    console.log("Updated user plan:", updated);
    res.status(StatusCodes.OK).json(updated);
  } catch (e) {
    res.status(e.code || 500).json(createError(e.status || 'internal_error', e.message));
  }
};

module.exports = { updateUserPlan };