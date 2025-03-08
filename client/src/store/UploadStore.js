import { create } from "zustand";
import axios from "axios";

const UploadStore = create((set) => ({
    UploadImage: async (image) => {
        try {
            const formData = new FormData();
            formData.append("image", image); // ✅ ফাইল ডাটা যুক্ত করা

            let res = await axios.post("/api/v1/upload-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // ✅ ফাইল আপলোডের জন্য প্রয়োজনীয় হেডার
                },
            });

            if (res.data.status === "success") {
                return res;
            } else {
                return res;
            }
        } catch (error) {
            console.error("Upload Error:", error);
            return { status: "error", message: "Upload failed!" };
        }
    },
}));

export default UploadStore;
