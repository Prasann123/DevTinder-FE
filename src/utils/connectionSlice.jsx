import { createSlice } from "@reduxjs/toolkit";

export const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnection: (state, action) => action.payload,
    removeConnection: () => null,
  },
});

export const { addConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
