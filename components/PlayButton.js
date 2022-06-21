import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Pressable, Text } from 'react-native';

const PlayButton = ({id, data, color, navigation}) => {
  const [play, setPlay] = useState(false);
  const [sample, setSample] = useState();

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

  useEffect(() => {
    return sample?.sound ? ()=>{sample?.sound.unloadAsync(); setPlay(false)} : undefined;
  }, [sample]);


  return (
    <Pressable
    title={data.title}
    onPress={play ? stopSample : playSample}
    style={({ pressed }) => [
      { 
        justifyContent: "center",
        opacity: pressed
          ? .5
          : 1,
        backgroundColor: color,
        height: "100%",
        width: "100%",
        borderRadius: 20
      }
    ]}
    onLongPress={() => navigation.navigate('Samples', {idPlayButton: id})}>
      <Text style={{textAlign: "center"}}>{data.title}</Text>
    </Pressable>
  );
};

export default PlayButton;