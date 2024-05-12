export const status = {
    code : {
        "ok" : 200,
        "create" : 201,
        "badRequest" : 400,
        "notFound" : 404,
        "unAuthorize": 401

    },
    status : {
        "success" : "ok",
        "failed" : "error"

    },
    message:{
        "maxMill":'"mileage" must be a safe number',
        "minMill":"Mileage has to be from 0 to 999999",
        "brand_required": "Car brand id is required",
        "model_required": "Car model id is required",
        "incorrect_mileage": "Invalid mileage type",
        "fake_brand": "Brand not found",
        "fake_model": "Model not found",
        "unauthorized": "Not authenticated"
    }

}