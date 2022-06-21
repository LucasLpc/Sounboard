import { FlatList, SafeAreaView } from "react-native";
import ListItem from "../components/ListItem";
import { useSelector } from 'react-redux';

const Library = ({route}) => {
  const allSamples = useSelector((state) => state.samples.value);

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={sample => sample.id}
        data={allSamples}
        renderItem={({item}) => (
          <ListItem title={item.title} sampleID={item.id} sampleURI={item.uri} playButtonID={route.params.idPlayButton} />
        )}
      />
    </SafeAreaView>
  );
};

export default Library;