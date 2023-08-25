export default async function addUserData(dataName, dataValue,typeOfData="") {
  console.log('encodeDataValue');
  console.log(dataValue);
  const encodeDataValue = encodeURIComponent(dataValue);
  console.log(encodeDataValue);
  const session = localStorage.getItem('loginSession');
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${session}`,
    },
    body: JSON.stringify({ name: dataName, data: encodeDataValue })
  };

  try {
    const response = await fetch(`https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/account/add-data${typeOfData===""?"":`/${typeOfData}`}`, options);
    console.log(`https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/account/add-data${typeOfData===""?"":`/${typeOfData}`}`)
    const responseData = await response.json();
    console.log('responseData');//test
    console.log(responseData);//test

    if (responseData.status===true) {
      // fn();
      console.log(`Response: added ${dataName}`);
    } else {
      console.log(`Error: Can not add ${dataName}`);
    }
    return responseData;
  } catch (err) {
    console.log(`Error: Connection!`);
    console.error(err);
    return {status: false};
  }
}