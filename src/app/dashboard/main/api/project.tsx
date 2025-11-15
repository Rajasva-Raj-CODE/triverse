import axios from "@/api/axiosInstance";
import { AxiosError } from "axios";

export interface Project {
    project_id: number;
    company_id: number;
    project_name: string;
    project_image: string | null;
    location: string;
    created_by: number;
    updated_by: number | null;
    is_activated: boolean;
    is_deleted: boolean;
    created_date: string;
    updated_date: string | null;
    client_name: string | null;
    general_contractor: string | null;
    height_of_project: string | null;
    location_link: string | null;
    project_category: string | null;
    project_value: string | null;
    timeline: string | null;
    country: string;
    city: string;
    state: string;
    nearby_landmark: string;
    start_date: string;
    end_date: string;
    expected_end_date: string;
    status: string;
}

// Full API response structure
interface AllProjectsResponse {
    success: boolean;
    message: string;
    total_count: number;
    data: Project[];
}

// Request body interface
interface AllProjectsRequest {
    searchText: string;
    companyId: number;
    limit: number;
    skip: number;
}

// API function
export const AllProjects = async (
    data: AllProjectsRequest
): Promise<AllProjectsResponse> => {
    try {
        const response = await axios.post<AllProjectsResponse>(
            "project/all",
            data
        );
        return response.data;
    } catch (error) {
        handleAxiosError(error as AxiosError, "Getting all projects");
        throw error;
    }
};

// Error handler
const handleAxiosError = (error: AxiosError, context: string) => {
    console.error(`Error in ${context}:`, error.message);
};
