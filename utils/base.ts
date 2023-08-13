const productionUrls = {
  productionUrl1: "https://snapline.ai.antrikshdev.tech",
  productionUrl2: "https://snapline.antrikshdev.tech",
  productionUrl3: "https://prompt.ai.antrikshdev.tech",
};

export const API_URL =
  process.env.NEXT_PUBLIC_URL ||
  productionUrls.productionUrl1 ||
  productionUrls.productionUrl2 ||
  productionUrls.productionUrl3;
