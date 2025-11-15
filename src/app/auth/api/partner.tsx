
import axios from 'axios';

export type PartnerPayload = {
  firstName: string;
  lastName: string;
  email: string;
  message?: string;
};

export async function createPartner(data: PartnerPayload) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/partner_request`, data); 
  return response.data;
}
