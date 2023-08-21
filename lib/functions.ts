import { Media } from "@/utils/prompt";
import axios from "axios";
import { toast } from "react-hot-toast";

export const imageUrlCloudinary = (image: Media) => {
  const imageBucket =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "pvserver";
  // https://res.cloudinary.com/demo/image/upload/c_scale,h_300,w_300/dpr_auto/cld-sample-5.jpg
  const url = `https://res.cloudinary.com/${imageBucket}/${image.resource_type}/upload/c_scale,h_300,w_300/dpr_auto,f_auto,q_auto/v1/${image.public_id}`;
  return url;
};

export const saveMediaToDB = async ({
  format,
  height,
  public_id,
  resource_type,
  secure_url,
  signature,
  url,
  width,
}: {
  url: string;
  secure_url: string;
  public_id: string;
  format: string;
  signature: string;
  width: number;
  height: number;
  resource_type: string;
}) => {
  const res = await axios.post("/api/prompt/asset/create", {
    url,
    secure_url,
    public_id,
    format,
    width,
    height,
    resource_type,
    signature,
  });

  if (res.status !== 201) {
    toast.error("Media not saved to DB");
    throw new Error("Media not saved to DB");
  }

  if (process.env.NODE_ENV === "development") {
    console.log("Media saved to DB");
  }
  return res.data;
};
