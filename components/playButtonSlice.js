import { createSlice } from "@reduxjs/toolkit";

const initialState = 
{
  value :
  [
    [
      {
        id: 0,
        sampleID: 0,
        color: "#fad390"
      },
      {
        id: 1,
        sampleID: 1,
        color: "#eb2f06"
      },
      {
        id: 2,
        sampleID: 2,
        color: "#6a89cc"
      },
      {
        id: 3,
        sampleID: 3,
        color: "#b8e994"
      }
    ],
    [
      {
        id: 4,
        sampleID: 4,
        color: "#f6b93b"
      },
      {
        id: 5,
        sampleID: 5,
        color: "#e55039"
      },
      {
        id: 6,
        sampleID: 6,
        color: "#4a69bd"
      },
      {
        id: 7,
        sampleID: 7,
        color: "#78e08f"
      }
    ],
    [
      {
        id: 8,
        sampleID: 8,
        color: "#e58e26"
      },
      {
        id: 9,
        sampleID: 9,
        color: "#b71540"
      },
      {
        id: 10,
        sampleID: 10,
        color: "#40739e"
      },
      {
        id: 11,
        sampleID: 11,
        color: "#079992"
      }
    ]
  ]
};

const playButtonSlice = createSlice({
  name: "playButtons",
  initialState,
  reducers: {
    changeSampleOfPlayButton: (state, action) => {
      let changed = false;
      state.value.forEach((group) => {
        group.forEach((btn) => {
          if (action.payload.playButtonID === btn.id) {
            btn.sampleID = action.payload.sampleID
            changed = true;
            return;
          }
        });
        if (changed) return;
      });
    },
    resetPlayButtons: (state) => {
      state.value = initialState.value;
    }
  }
});

export const { changeSampleOfPlayButton, resetPlayButtons } = playButtonSlice.actions;
export default playButtonSlice.reducer;