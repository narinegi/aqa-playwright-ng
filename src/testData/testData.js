export const test_data = {
    positive_scenario : {
        "email": "aqa-narine0605@test.com",
        "name": "Narine",
        "lastName": "Ilnytskaa",
        "password": "Test@700",
    },
    negative_length : {
        "shortValue" : "n",
        "longValue" : "narineilnytskagasparian"

    },
    negative_name : {
        "incorrectNameValue1" : "test%",
        "incorrectNameValue2" : "0987",

    },
    invalid_email : {
        "invalidEmail" : "aqa-narine700gmail.com",
        "notEnglishValue": "Ільницькаgmail.com"
    },
    invalid_password : {
        "passwordMatchFalse" : "HelloWorldThisispassword",
        "invalidPasswordData" : "ilny123",
        "onlyNumbers": "700"
    }



}