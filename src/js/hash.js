export function hashPassword(password)
{
  var hashVal = 0;
  if(password.length == 0 ) return hashVal;

  for(let i = 0; i< password.length; i++)
  {
    let charPassword = password.charCodeAt(i);
    hashVal = ((hashVal<<5) - hashVal) + charPassword;

    hashVal = hashVal & hashVal;
  }
  return hashVal.toString();
}
