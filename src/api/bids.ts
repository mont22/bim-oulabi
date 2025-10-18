import {apiClient} from './client';
import {PlaceBidRequest, PlaceBidResponse, Bid} from '../types/domain.types';
import {ApiResponse} from '../types/api.types';

export const bidsApi = {
  placeBid: async (
    data: PlaceBidRequest,
  ): Promise<ApiResponse<PlaceBidResponse>> => {
    const response = await apiClient.post<ApiResponse<PlaceBidResponse>>(
      '/bid',
      data,
    );
    return response.data;
  },

  getBidsByDomainId: async (domainId: number): Promise<ApiResponse<Bid[]>> => {
    const response = await apiClient.get<ApiResponse<Bid[]>>(
      `/domains/${domainId}/bids`,
    );
    return response.data;
  },
};

