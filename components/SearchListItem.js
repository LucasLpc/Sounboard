import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { addSample } from './sampleSlice';

const SearchListItem = ({id, title, sampleURI}) => {

  const [sample, setSample] = useState();
  const [play, setPlay] = useState(false);

  const allSamples = useSelector((state) => state.samples.value);

  const dispatch = useDispatch();

  let alreadyExist = false;

  allSamples.forEach(sampleInfos => {
    if (sampleInfos.id === id) {
      alreadyExist = true;
    }
  });
  
  const playSample = async() => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const sample = await Audio.Sound.createAsync(data.uri);
    setSample(sample);
    await sample?.sound.playAsync();
    setPlay(true);
  }

  const stopSample = async () => {
    await sample?.sound.unloadAsync();
    setPlay(false);
    return undefined;
  }

  const dispacthAddSample = () => {
    alreadyExist = true;
    dispatch(addSample({id, title, sampleURI}))
  }

  useEffect(() => {
    return sample?.sound ? ()=>{sample?.sound.unloadAsync(); setPlay(false)} : undefined;
  }, [sample]);


  return (
    <View style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: "white",
        borderRadius: 15
      }}
    >
      <Text style={{ width: "60%" }}>{title}</Text>
      <View style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {
          alreadyExist ?
            <Ionicons name="add-circle" size={30}/>
          :
            <Pressable
              title={title}
              onPress={dispacthAddSample}
              style={{
                height: 30,
                width: 30,
                borderRadius: 20
              }}
            >
              <Ionicons name="add-circle-outline" size={30}/>
            </Pressable>
        }

        {
          play ?
            <Pressable
              title={title}
              onPress={stopSample}
              style={{
                height: 30,
                width: 30,
                borderRadius: 20
              }}
            >
              <Ionicons name="stop-circle-outline" size={30}/>
            </Pressable>
          : <Pressable
              title={title}
              onPress={playSample}
              style={{
                height: 30,
                width: 30,
                borderRadius: 20
              }}
            >
              <Ionicons name="play-circle-outline" size={30}/>
            </Pressable>
        }
      </View>
    </View>
  );
};

export default SearchListItem;