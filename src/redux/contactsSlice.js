import { createSlice } from '@reduxjs/toolkit';
import { fetchAddContact, fetchAllContacts, fetchDeleteContact } from './operations';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

// const pendingReducer = state => {
//                 state.loading = true;
// }
            
// const fulfilledAllReducer = (state, { payload }) => {
//                 state.loading = false;
//                 state.items = payload.data;
// }
            
// const rejectedReducer = (state, { payload }) => {
//                 state.loading = false;
//                 state.error = payload;
//             }
// const fulfilledAddReducer = (state, { payload }) => {
//     state.loading = false;
//     state.items.push(payload);
// }

// const fulfilledDeleteReducer = (state, { payload }) => {
//     state.loading = false;
//     const index = state.items.findIndex(item => item.id === payload.id);
//     state.items.splice(index, 1);
// }

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    extraReducers: builder => {
        builder
          .addCase(fetchAllContacts.pending, state => {
            state.loading = true;
          })
          .addCase(fetchAllContacts.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.items = payload.data;
          })
          .addCase(fetchAllContacts.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
          })
          .addCase(fetchAddContact.pending, state => {
            state.loading = true;
          })
          .addCase(fetchAddContact.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.items.push(payload);
          })
          .addCase(fetchAddContact.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
          })
          .addCase(fetchDeleteContact.pending, state => {
            state.loading = true;
          })
          .addCase(fetchDeleteContact.fulfilled, (state, { payload }) => {
            state.loading = false;
            const index = state.items.findIndex(item => item.id === payload.id);
            state.items.splice(index, 1);
          })
          .addCase(fetchDeleteContact, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
          });
        },
});
    
export const contactsReducer = contactsSlice.reducer;