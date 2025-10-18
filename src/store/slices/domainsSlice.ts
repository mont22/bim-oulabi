import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DomainsState, DomainStatus, DomainDetail} from '../../types/domain.types';
import {
  fetchDomainsThunk,
  fetchDomainByIdThunk,
  placeBidThunk,
  fetchBidsByDomainIdThunk,
} from '../thunks/domainsThunks';

const initialState: DomainsState = {
  domains: [],
  currentDomain: null,
  isLoading: false,
  error: null,
  activeTab: DomainStatus.ACTIVE,
};

const domainsSlice = createSlice({
  name: 'domains',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<DomainStatus>) => {
      state.activeTab = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    updateDomainFromWebSocket: (state, action: PayloadAction<DomainDetail>) => {
      if (state.currentDomain?.id === action.payload.id) {
        state.currentDomain = action.payload;
      }
      const index = state.domains.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.domains[index] = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDomainsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDomainsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.domains = action.payload;
        state.error = null;
      })
      .addCase(fetchDomainsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchDomainByIdThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDomainByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentDomain = action.payload;
        state.error = null;
      })
      .addCase(fetchDomainByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(placeBidThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(placeBidThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(placeBidThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchBidsByDomainIdThunk.pending, state => {
        state.error = null;
      })
      .addCase(fetchBidsByDomainIdThunk.fulfilled, (state, action) => {
        if (state.currentDomain) {
          state.currentDomain.bids = action.payload;
        }
        state.error = null;
      })
      .addCase(fetchBidsByDomainIdThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {setActiveTab, clearError, updateDomainFromWebSocket} =
  domainsSlice.actions;
export default domainsSlice.reducer;

