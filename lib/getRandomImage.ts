import axios from "axios";

const getRandomImage = () =>
  axios
    .get(process.env.RANDOM_API_URL as string, {
      responseType: "blob",
      headers: {
        "X-Api-Key": process.env.RANDOM_API_KEY,
        Accept: "image/jpg",
      },
    })
    .then((res) => URL.createObjectURL(res.data));

export default getRandomImage;
