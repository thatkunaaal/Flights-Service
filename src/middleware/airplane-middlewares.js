const { StatusCodes } = require("http-status-codes");
const {ErrorResponse} = require("../utils/common");

function validateCreateRequest(req,res,next){

    if(!req.body.modelNumber){
        ErrorResponse.message = "ModelNumber should be passed while creating an airplane";
        ErrorResponse.error = {explanation: "ModelNumber should be passed while creating an airplane"};

        return res.status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    next();
}

module.exports = {
     validateCreateRequest,
}