import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userState = {
  user: string | null;
};

const initialState: userState = {
  user: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    editUser(state, { payload }: PayloadAction<string>) {
      state.user = payload;
    },
  },
});

export const { editUser } = userSlice.actions;
export default userSlice.reducer;
