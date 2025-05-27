import { ImageRestoreParams } from "@/dataHelper/imageRestore.dataHelper";
import AIClient from "./AIClient";

export const imageRestoreApi = {
    restoreImage: (imageRestoreParams: ImageRestoreParams): Promise<Blob> => {
        const formData = new FormData();
        formData.append('image', imageRestoreParams.image);
        formData.append('mode', imageRestoreParams.mode);
        return AIClient.post("/restore", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob',
        }).then(res => res.data);
    },
  };
  