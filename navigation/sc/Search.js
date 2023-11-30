import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView, Modal, TouchableHighlight, ActivityIndicator, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

const Search = ({ route, navigation }) => {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const {book} = route.params;
  useEffect(() => {
    if (search === '') {
      setFiltered([]);
      return;
    }
    const filteredBooks = books.filter(
      (book) =>
        book.volumeInfo.title.toLowerCase().indexOf(search.toLowerCase()) !==
        -1
    );
    setFiltered(filteredBooks);
  }, [search, books]);

  useEffect(() => {
    setBooks(book);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ borderRadius: 30, flexDirection: 'row', borderWidth:0.5,borderColor:'#666',backgroundColor: '#dfe4ea',alignItems:'center',padding:5}}>
        <Icon name='search' size={30} color='#666' />
        <TextInput
          placeholder='Name of Book'
          placeholderTextColor='#666'
          onChangeText={(text) => setSearch(text)}
          value={search}
          style={styles.srch}
        />
        {search.length > 0 ? (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Icon name='x-circle-fill' size={24} color='#333' style={{justifyContent: 'flex-end'}} />
          </TouchableOpacity>
        ) : null}
      </View>
      {filtered.length > 0 ? (
        <ScrollView>
          {filtered.map((book) => (
            <TouchableOpacity style={styles.bb} onPress={() => {
              navigation.navigate('Abook', { isbn: book?.selfLink });
            }}>
              <Image
                source={{
                  uri:
                    book?.volumeInfo?.imageLinks?.thumbnail ||
                    book?.volumeInfo?.imageLinks?.smallThumbnail ||
                    'https://dummyimage.com/100x100/000/fff',
                }}
                style={{ height: 200, width: 120 }}
              />
              <View>
                <View style={{ width: 220 }}>
                  <Text style={styles.title}>{`${book.volumeInfo.title}`}</Text>
                </View>
                <View style={{ width: 220 }}>
                  <Text style={styles.author}>{`${book.volumeInfo.authors}`}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : search.length > 0 ? (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>No Books found</Text>
        </View>
      ) : <View />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding:10,
  },
  srch: {
    fontSize: 16,
    flex: 1,
    padding:10,
  },
  v:{
    flexDirection:'row',
    alignItems:'center',
    width:'100%',
  },
  bb: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#666',
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
  },
  author: {
    textAlign: 'center',
    padding: 5,
    color: '#666',
  },
});

export default Search;