export default async function fetchSubmitOTP(dataName, dataValue) {
  const encodeDataValue = encodeURIComponent(dataValue);
  console.log('encodeDataValue');
  console.log(encodeDataValue);
  const session = localStorage.getItem('loginSession');
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${session}`,
    },
    body: JSON.stringify({ waiting_key: dataName, otp: encodeDataValue })
  };

  try {
    const response = await fetch('https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/account/submit-otp', options);
    const responseData = await response.json();
    console.log(responseData);//test

    if (responseData.status) {
      console.log(`Response: submited session ${encodeDataValue}`);
    } else {
      if(responseData.comment==="locked") console.log(`Error: locked`);
      console.log(`Error: Can not submit ${encodeDataValue}`);
    }
    return responseData;
  } catch (err) {
    console.log(`Error: Connection!`);
    console.error(err);
    return {result: false};
  }
}