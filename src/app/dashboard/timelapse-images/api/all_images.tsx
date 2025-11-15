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

// Camera interface based on your API response
export interface CameraResponse {
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

// Camera API response
export interface CameraApiResponse {
    success: boolean;
    message: string;
    data: CameraResponse[];
}

// Simplified camera interface for UI
export interface Camera {
    id: number;
    name: string;
    location?: string;
    isActive: boolean;
}

// API function - using your exact structure
export const Allimages = async (
    data: AllImagesRequest
): Promise<AllImagesResponse> => {
    try {
        console.log('Calling API with data:', data);
        const response = await axios.post<AllImagesResponse>(
            "/s3/images",
            data
        );
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error as AxiosError, "Getting the Project Camera Images");
        throw error;
    }
};


// Real camera API function
export const getCameras = async (projectId: number): Promise<Camera[]> => {
    try {
        console.log('Fetching cameras for project:', projectId);
        const response = await axios.get<CameraApiResponse>(
            `camera/get-all/${projectId}`
        );
        console.log('Camera API Response:', response.data);

        if (response.data.success) {
            // Transform the API response to our simplified Camera interface
            return response.data.data.map(camera => ({
                id: camera.cam_id,
                name: camera.cam_name,
                location: camera.area || camera.project_name,
                isActive: camera.is_live && camera.is_activated
            }));
        } else {
            throw new Error(response.data.message || 'Failed to fetch cameras');
        }
    } catch (error) {
        handleAxiosError(error as AxiosError, "Getting Project Cameras");
        throw error;
    }
};

// Error handler
const handleAxiosError = (error: AxiosError, context: string) => {
    console.error(`Error in ${context}:`, error.message);
    if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
    }
    if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
    }
};