function endpointNotFound(request, response, next){
    response.status(404).send({message: "Endpoint not found"})
}

function prismaErrors(error, request, response, next){
    if(error.name === "PrismaClientValidationError"){
        return response.status(400).send({message: "Bad request"})
    }
    if(error.code === "P2002"){
        return response.status(400).send({message: "Unique constraint violation"})
    }
    next(error);
}

function customErrors(error, request, response, next){
    if(error.status && error.message){
        return response.status(error.status).send({message: error.message});
    }
    next(error);
}


function internalServerError(error, request, response, next){
    response.status(500).send({message: "Internal server error"})
}

module.exports = { endpointNotFound, prismaErrors, customErrors, internalServerError };