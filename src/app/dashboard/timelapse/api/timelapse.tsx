import axios from "@/api/axiosInstance";
import { AxiosError } from "axios";

// Request payload interface
export interface AllTimelapseVideoRequest {
    company_id: number;
    project_id: number;
    category: string;
    cam_id?: number;
}

// Nested camera object
interface RegisterCamera {
    cam_id: number;
    company_name: string;
    project_name: string;
    cam_name: string;
    is_live: boolean;
    created_at: string;
    updated_at: string;
    company_id: number;
    project_id: number;
    created_by: number;
    updated_by: number | null;
    is_activated: boolean;
    is_deleted: boolean;
    created_date: string;
    updated_date: string | null;
    area: string | null;
}

// Each video object in the response
export interface VideoResponse {
    video_id: number;
    s3_path: string;
    s3_url: string;
    video_type: string;
    task_id: string;
    cam_id: number;
    user_id: number;
    created_by: number;
    updated_by: number | null;
    is_activated: boolean;
    is_deleted: boolean;
    created_date: string;
    updated_date: string | null;
    company_id: number;
    project_id: number;
    tbl_register_camera: RegisterCamera;
}

// Final response shape
export interface TimelapseVideoResponse {
    success: boolean;
    message: string;
    count: number;
    data: VideoResponse[];
}

// API function
export const AllTimelapseVideo = async (
    data: AllTimelapseVideoRequest
): Promise<TimelapseVideoResponse> => {
    try {
        const response = await axios.post<TimelapseVideoResponse>(
            "s3/default_timelapse",
            data
        );
        return response.data;
    } catch (error) {
        handleAxiosError(error as AxiosError, "Getting the Timelapse info");
        throw error;
    }
};

// Error handler
const handleAxiosError = (error: AxiosError, context: string) => {
    console.error(`Error in ${context}:`, error.message);
};
