import axios from "axios";
import { toast } from "react-hot-toast";

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
