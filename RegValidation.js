//The following function Checks if the length of the password is longer than 8 characters
function CheckLength(p1) {
    if(p1.length >= 8)
      return true
    else
      return false
}

//The following function Checks if the password has special symbols
function CheckSymb(p1) {
  if((p1.indexOf("!") != -1) || (p1.indexOf(".") != -1) || (p1.indexOf(",") != -1) || (p1.indexOf("^") != -1) || (p1.indexOf("$") != -1) || (p1.indexOf("#") != -1) || (p1.indexOf("@") != -1))
    return true
  else
    return false
}

//The following function Checks if the password has atleast 1 lower case and 1 upper case character
function CheckLowUp(p1) {
  const lowerC = /[a-z]/;
  const upperC = /[A-Z]/;
  if((p1.match(lowerC) != null) && (p1.match(upperC) != null))
    return true
  else
    return false
}

//The Following function checks if both the entered passwords match
function CheckMatch(p1,p2) {
  if (p1 === p2)
    return true
  else
    return false
}

module.exports.CheckLength = CheckLength
module.exports.CheckSymb = CheckSymb
module.exports.CheckLowUp = CheckLowUp
module.exports.CheckMatch = CheckMatch