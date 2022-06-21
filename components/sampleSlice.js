import { createSlice } from "@reduxjs/toolkit";


const initialState = 
{
  value: 
  [
    {
      id: 0,
      title: "ClapOne",
      uri: require("../assets/samples/clap_1.wav")
    },
    {
      id: 1,
      title: "ClapTwo",
      uri: require("../assets/samples/clap_2.wav")
    },
    {
      id: 2,
      title: "FxOne",
      uri: require("../assets/samples/fx_1.wav")
    },
    {
      id: 3,
      title: "FxTwo",
      uri: require("../assets/samples/fx_2.wav")
    },
    {
      id: 4,
      title: "KickOne",
      uri: require("../assets/samples/kick_1.wav")
    },
    {
      id: 5,
      title: "KickTwo",
      uri: require("../assets/samples/kick_2.wav")
    },
    {
      id: 6,
      title: "ShakerOne",
      uri: require("../assets/samples/shaker_1.wav")
    },
    {
      id: 7,
      title: "ShakerTwo",
      uri: require("../assets/samples/shaker_2.wav")
    },
    {
      id: 8,
      title: "ShakerThree",
      uri: require("../assets/samples/shaker_3.wav")
    },
    {
      id: 9,
      title: "SnareOne",
      uri: require("../assets/samples/snare_1.wav")
    },
    {
      id: 10,
      title: "SnareTwo",
      uri: require("../assets/samples/snare_2.wav")
    },
    {
      id: 11,
      title: "TomOne",
      uri: require("../assets/samples/tom_1.wav")
    },
    {
      id: 12,
      title: "TomTwo",
      uri: require("../assets/samples/tom_2.wav")
    },
    {
      id: 13,
      title: "TomThree",
      uri: require("../assets/samples/tom_3.wav")
    },
    {
      id: 14,
      title: "TomFour",
      uri: require("../assets/samples/tom_4.wav")
    }
  ]
};

const sampleSlice = createSlice({
  name: 'samples',
  initialState,
  reducers: {
    addSample: (state, action) => {
      let lastID = 0;
      state.value.forEach(sample => {
        if (sample.id > lastID) {
          lastID = sample.id + 1;
        }
      });

      const sampleToAdd = {
        id: action.payload.id,
        title: action.payload.title,
        uri: { uri: action.payload.sampleURI}
      }

      state.value.push(sampleToAdd);
    },
    resetSamples: (state) => {
      state.value = initialState.value;
    }
  }
});

export const { addSample, resetSamples } = sampleSlice.actions;
export default sampleSlice.reducer;