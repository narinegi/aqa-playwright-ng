import signupData from "./positive.js";

export const firstNameDetails = {
    shortValue: 'N',
    invalidValue1: 'N@rine!',
    invalidValue2: '   Test ',
    invalidValue3: '      ',
    invalidValue4: '000',
    notEnglishValue: 'хеллоу',
    longValue: 'Doesnotmeetrequirementsandfailsvalidationpleasecorrect',
    LongInvalidValue: 'Doesnotmeetrequirementsandfailsvalidationpleasecorrect!!!'
};
export const lastNameDetails = {
    shortValue: 'I',
    invalidValue1: 'Ilnytsk@',
    invalidValue2: '   Ilnytska ',
    invalidValue3: '       ',
    invalidValue4: '123',
    notEnglishValue: 'Ільницька',
    longValue: 'Doesnotmeetrequirementsandfailsvalidationpleasecorrect',
    LongInvalidValue: 'Doesnotmeetrequirementsandfailsvalidationpleasecorrect'
};
export const emailDetails = {
    invalidValue1: '   @testtets.com',
    invalidValue2: 'testng.com',
    invalidValue3: '     ',
    invalidValue4: 'narine@.com',
    invalidValue5: 'narinei@test.om',
    invalidValue6: '@testtest.com',
    invalidValue7: 'narine@test'
};
export const passwordDetails = {
    invalidValue1: 'onlylowercase',
    invalidValue2: 'nOnNUMERIC',
    invalidValue3: '      ',
    invalidValue4: '7006555',
    invalidValue5: 'TESTNG',
    notEnglishValue: 'Ільницька',
    shortValue: 'Hello',
    longValue: 'Doesnotmeetrequirementsandfailsvalidationpleasecorrect'
};
export const passwordConfirmation = {
    noMatch: 'noMatchPass1',
    invalidValue1: 'onlylowercase',
    invalidValue2: 'nOnNUMERIC',
    invalidValue3: '     ',
    invalidValue4: '7006555',
    invalidValue5: 'TESTNG',
    notEnglishValue: 'Ільницька',
    shortValue: 'Hello',
    longValue: 'Doesnotmeetrequirementsandfailsvalidationpleasecorrect'
};
