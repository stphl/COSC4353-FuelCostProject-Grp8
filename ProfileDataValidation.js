// Profile data validation

// Check if the field max length match requirements
function CheckMaxLength(field, length) {
    if (field.length <= length)
        return true
    else
        return false
}

// Check if the field min length match requirements
function CheckMinLength(field, length) {
    if (field.length > length)
        return true
    else
        return false
}

// Check the field is not null or undefined
function CheckRequired(field) {
    if (field === null || field === undefined)
        return false
    else 
        return true
}

module.exports.CheckMaxLength = CheckMaxLength
module.exports.CheckMinLength = CheckMinLength
module.exports.CheckRequired = CheckRequired