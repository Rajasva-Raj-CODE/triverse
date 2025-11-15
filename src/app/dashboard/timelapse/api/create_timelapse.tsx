
import axios, { AxiosError } from "axios";

// ✅ Token
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdXJpbWVocmE4OTkxQGdtYWlsLmNvbSIsInVzZXJfaWQiOjEsInJvbGUiOiJUUklWRVJTRV9TVVBFUl9BRE1JTiIsImV4cCI6MTc4NTY1MDY4NH0.QzCgeJ75ve5lSPJoTv6AmXJlmhfRzC001xwfsVNwg18';

// ✅ Request payload type
export interface CustomTimelapseRequest {
    cam_id: number;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    resolution: number;
    speed: "fast" | "medium" | "slow";
}

// ✅ Response type
export interface CustomResponse {
    message: string;
    task_id: string;
}

// ✅ API Function (no base URL)
export const CustomTimelapse = async (
    data: CustomTimelapseRequest
): Promise<CustomResponse> => {
    try {
        const response = await axios.post<CustomResponse>(
            "https://api-py.triverse.live/v1/custom_timelapse/",
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                timeout: 10000,
            }
        );
        return response.data;
    } catch (error) {
        handleAxiosError(error as AxiosError, "Custom Timelapse Creation");
        throw error;
    }
};


// Recurring Timelapse API
export interface RecurringTimelapseRequest {
    cam_id: number;
    start_time: string;
    end_time: string;
    resolution: number;
    speed: "fast" | "medium" | "slow";
    time_period: "daily" | "weekly" | "monthly";
}

// Response interface
export interface RecurringResponse {
    message: string;
    task_id: string;
}



export const RecurringTimelapse = async (
    data: RecurringTimelapseRequest
): Promise<CustomResponse> => {
    try {
        const response = await axios.post<RecurringResponse>(
            "https://api-py.triverse.live/v1/recurring_timelapse/add_task/",
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                timeout: 10000,
            }
        );
        return response.data;
    } catch (error) {
        handleAxiosError(error as AxiosError, "Recurring Timelapse Creation");
        throw error;
    }
};


// Project Timelapse API
export interface ProjectTimelapseRequest {
    cam_ids: number[];
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    speed: "fast" | "medium" | "slow";
}


// Response interface
export interface ProjectResponse {
    message: string;
    task_id: string;
}


// ✅ API Function (no base URL)
export const ProjectTimelapse = async (
    data: ProjectTimelapseRequest
): Promise<CustomResponse> => {
    try {
        const response = await axios.post<ProjectResponse>(
            "https://api-py.triverse.live/v1/project_timelapse/",
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                timeout: 10000,
            }
        );
        return response.data;
    } catch (error) {
        handleAxiosError(error as AxiosError, "Project Timelapse Creation");
        throw error;
    }
};



// 🚨 Error handler
const handleAxiosError = (error: AxiosError, context: string) => {
    console.error(`Error in ${context}:`, error.message || "Unknown error");
};







