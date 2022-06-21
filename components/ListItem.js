import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { changeSampleOfPlayButton } from './playButtonSlice';
import { useSelector, useDispatch } from 'react-redux';

const ListItem = ({title, playButtonID, sampleID, sampleURI}) => {
  const [sample, setSample] = useState();
  const [play, setPlay] = useState(false);
  const playButtons =  useSelector((state) => state.playButtons.value);
  const dispatch = useDispatch();

  let selected = false;
  let selectedByPlayButton = false;
  playButtons.forEach((group)=>{
    group.forEach((sampleSelected)=>{
      if (sampleSelected.sampleID === sampleID) {
        if (sampleSelected.id === playButtonID) {
          selectedByPlayButton = true;
        }
        selected = true;
        return;
      }
    });
    if (selected) return;
  })
  
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

  const dispatchChangePlayButtonSample = () => {
    dispatch(changeSampleOfPlayButton({playButtonID, sampleID}));
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
      <Text>{title}</Text>
      <View style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {
          selected ? 
            selectedByPlayButton ?
            <Ionicons name="checkmark-circle" size={30} color="red"/> :
            <Ionicons name="checkmark-circle" size={30}/> :
          <Pressable
            title={title}
            onPress={dispatchChangePlayButtonSample}
            style={{
              height: 30,
              width: 30,
              borderRadius: 20
            }}
          >
            <Ionicons name="checkmark-circle-outline" size={30}/>
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

export default ListItem;