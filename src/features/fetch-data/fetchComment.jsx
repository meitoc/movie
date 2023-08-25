export default async function fetchComment(movieId) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ type:"movie", movie_id: movieId })
    };
    console.log("Fetching data ...")
    try {
      const response = await fetch('https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/comment', options);
      const responseData = await response.json();
      console.log("Data Comment Fetched")
      console.log(responseData);//test
  
      if (responseData.status) {
        return responseData.data;
      } else {
        console.log(`Error: Can not fetch`);
        return null;
      }
    } catch (err) {
      console.log(`Error: Connection!`);
      console.error(err);
      return null;
    }
  }