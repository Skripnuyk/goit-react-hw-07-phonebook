import { createSlice } from '@reduxjs/toolkit';
import { fetchAddContact, fetchAllContacts, fetchDeleteContact } from './operations';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const pendingReducer = state => {
                state.loading = true;
}
            
const fulfilledAllReducer = (state, { payload }) => {
                state.loading = false;
                state.items = payload.data;
}
            
const rejectedReducer = (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            }
const fulfilledAddReducer = (state, { payload }) => {
    state.loading = false;
    state.items.push(payload);
}

const fulfilledDeleteReducer = (state, { payload }) => {
    state.loading = false;
    const index = state.items.findIndex(item => item.id === payload.id);
    state.items.splice(index, 1);
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    extraReducers: builder => {
        builder
          .addCase(fetchAllContacts.pending, pendingReducer)
          .addCase(fetchAllContacts.fulfilled, fulfilledAllReducer)
          .addCase(fetchAllContacts.rejected, rejectedReducer)
          .addCase(fetchAddContact.pending, pendingReducer)
          .addCase(fetchAddContact.fulfilled, fulfilledAddReducer)
          .addCase(fetchAddContact.rejected, rejectedReducer)
          .addCase(fetchDeleteContact.pending, pendingReducer)
          .addCase(fetchDeleteContact.fulfilled, fulfilledDeleteReducer)
          .addCase(fetchDeleteContact, rejectedReducer);
        },
});
    
export const contactsReducer = contactsSlice.reducer;