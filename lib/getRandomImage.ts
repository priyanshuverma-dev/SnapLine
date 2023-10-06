import axios from "axios";

const getRandomImage = () =>
  axios
    .get("https://api.api-ninjas.com/v1/randomimage?category=technology", {
      responseType: "blob",
      headers: {
        "X-Api-Key": "/DwSiAao0fcHw+IqKJT0cg==8SshQlV5eeiYXUNg",
        Accept: "image/jpg",
      },
    })
    .then((res) => URL.createObjectURL(res.data));

export default getRandomImage;
