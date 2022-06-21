import { useState } from "react";

import { Pressable, SafeAreaView, TextInput, View, FlatList } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import SearchListItem from "../components/SearchListItem";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sounds, setSounds] = useState([]);

  const search = async () => {
    setSounds([])

    const result = await fetch(`https://freesound.org/apiv2/search/text/?token=93laPQpr36aXM4EHcmwdZ7vv96WDZX5CQlHrPJ74&query=${searchTerm}`)
    .then((response) => {
      return response.json();
    });

    let allSounds = [];

    for (const sound of result.results) {
      const soundResult = await fetch(`https://freesound.org/apiv2/sounds/${sound.id}/?token=cczgHGWcYV1kdk2ch1asDGhZTCoPjC5pHVbSZ00p`)
      .then((response) => {
        return response.json();
      });
      allSounds.push(soundResult);
    }
    setSounds(allSounds);
  }

  return (
    <SafeAreaView>
      <View style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        margin: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10
      }}>
        <TextInput
          placeholder="Search"
          value={searchTerm}
          onChangeText={setSearchTerm}
          style= {{
            width: "85%"
          }}
        />
        <Pressable onPress={search} style={{ width: "10%" }}>
          <Ionicons name="search" color={"#000000"} size={30}/>
        </Pressable>
      </View>
      <FlatList
        data={sounds}
        keyExtractor={sound => sound.id}
        renderItem={sound => <SearchListItem id={sound.item.id} title={sound.item.name} sampleURI={sound.item.previews['preview-hq-mp3']}/>}
      />
    </SafeAreaView>
  );
};

export default Search;