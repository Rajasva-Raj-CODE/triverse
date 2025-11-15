import axios from "@/api/axiosInstance";
import { AxiosError } from "axios";

// Request payload interface
export interface AllImagesRequest {
    companyId: number;
    projectId: number;
    cameraId: number;
    fromDate?: string;
    toDate?: string;
    limit: number;
    skip: number;
}

// Image object in the response
export interface ImageResponse {
    image_id: number;
    s3_url: string;
    cam_id: number;
    company_id: number;
    project_id: number;
    created_by: number;
    updated_by: number | null;
    is_activated: boolean;
    is_deleted: boolean;
    created_date: string;
    updated_date: string | null;
    s3_path: string | null;
}

// Final response shape
export interface AllImagesResponse {
    success: boolean;
    message: string;
    totle_count: number;
    data: ImageResponse[];
}

// API function
export const Allimages = async (
    data: AllImagesRequest
): Promise<AllImagesResponse> => {
    try {
        const response = await axios.post<AllImagesResponse>(
            "s3/images",
            data
        );
        return response.data;
    } catch (error) {
        handleAxiosError(error as AxiosError, "Getting the Project Camera Images");
        throw error;
    }
};

// Error handler
const handleAxiosError = (error: AxiosError, context: string) => {
    console.error(`Error in ${context}:`, error.message);
};
