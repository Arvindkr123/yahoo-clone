import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    allMails: [],
    sentMails: [],
    recivedMails: [],
    deleteMails: [],
  },
  reducers: {
    addMail(state, action) {
      console.log(action.payload);
    },
  },
});

export const { addMail } = mailSlice.actions;
export default mailSlice;
