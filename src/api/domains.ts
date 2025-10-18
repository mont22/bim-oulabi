import {apiClient} from './client';
import {Domain, DomainDetail} from '../types/domain.types';
import {ApiResponse, DomainsApiResponse} from '../types/api.types';

export const domainsApi = {
  getDomains: async () => {
    const response = await apiClient.get<DomainsApiResponse<Domain>>('/domains');
    return response.data;
  },

  getDomainById: async (id: number): Promise<ApiResponse<DomainDetail>> => {
    const response = await apiClient.get<ApiResponse<DomainDetail>>(
      `/domains/${id}`,
    );
    return response.data;
  },
};

