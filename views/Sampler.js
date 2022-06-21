import { SafeAreaView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { useSelector, useDispatch } from 'react-redux';


import PlayButton from "../components/PlayButton";

// To reset playButtons
// import { resetPlayButtons } from '../components/playButtonSlice';
// import { resetSamples } from "../components/sampleSlice";

const Sampler = ({ navigation }) => {
  // To reset playButtons and samples
  // const dispatch = useDispatch();
  // dispatch(resetPlayButtons());
  // dispatch(resetSamples());

  const playButtons =  useSelector((state) => state.playButtons.value);
  const samples =  useSelector((state) => state.samples.value);

  return (
    <SafeAreaView style={{
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    }}>
      <Grid style={{
        marginVertical: "20%"
      }}>
        {
          playButtons.map((row, index) => 
            <Col
              key={index}
              style={{
                justifyContent: "space-around",
                marginHorizontal: 20,
              }}
            >
              {
                row.map((infos, index) => (
                  <Row
                    key={index}
                    style={{
                      height: "15%",
                    }}
                  >
                    <PlayButton
                      id={infos.id}
                      data={samples[infos.sampleID] ? samples[infos.sampleID] : samples[samples.length - 1]}
                      color={infos.color ? infos.color : "#000000"}
                      navigation={navigation}
                    />
                  </Row>
                ))
              }
            </Col>
          )
        }
      </Grid>
    </SafeAreaView>
  );
};

export default Sampler;