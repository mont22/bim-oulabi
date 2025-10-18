import {createAsyncThunk} from '@reduxjs/toolkit';
import {domainsApi} from '../../api/domains';
import {bidsApi} from '../../api/bids';
import {PlaceBidRequest} from '../../types/domain.types';
import {AxiosError} from 'axios';
import {ApiError} from '../../types/api.types';

export const fetchDomainsThunk = createAsyncThunk(
  'domains/fetchDomains',
  async (_, {rejectWithValue}) => {
    try {
      const response = await domainsApi.getDomains();
      // Extract the data array from the response
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data?.message) {
        return rejectWithValue(axiosError.response.data.message);
      }
      return rejectWithValue('Failed to fetch domains. Please try again.');
    }
  },
);

export const fetchDomainByIdThunk = createAsyncThunk(
  'domains/fetchDomainById',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await domainsApi.getDomainById(id);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data?.message) {
        return rejectWithValue(axiosError.response.data.message);
      }
      return rejectWithValue('Failed to fetch domain details. Please try again.');
    }
  },
);

export const placeBidThunk = createAsyncThunk(
  'domains/placeBid',
  async (data: PlaceBidRequest, {rejectWithValue}) => {
    try {
      const response = await bidsApi.placeBid(data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data?.message) {
        return rejectWithValue(axiosError.response.data.message);
      }
      return rejectWithValue('Failed to place bid. Please try again.');
    }
  },
);

export const fetchBidsByDomainIdThunk = createAsyncThunk(
  'domains/fetchBidsByDomainId',
  async (domainId: number, {rejectWithValue}) => {
    try {
      const response = await bidsApi.getBidsByDomainId(domainId);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data?.message) {
        return rejectWithValue(axiosError.response.data.message);
      }
      return rejectWithValue('Failed to fetch bids. Please try again.');
    }
  },
);

