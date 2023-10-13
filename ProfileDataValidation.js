// Profile data validation

// Check if the field lengths match requirements
function CheckMaxLength(field, length) {
    if (field.length <= length)
        return true
    else
        return false
}

function CheckMinLength(field, length) {
    if (field.length > length)
        return true
    else
        return false
}

function CheckRequired(field) {
    if (field === null || field === undefined)
        return false
    else 
        return true
}

module.exports.CheckMaxLength = CheckMaxLength
module.exports.CheckMinLength = CheckMinLength
module.exports.CheckRequired = CheckRequired