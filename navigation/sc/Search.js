import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView, Modal, TouchableHighlight, ActivityIndicator, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

const Search = ({ route, navigation }) => {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default category

  const { book } = route.params || {};

  const fetchBooksBySubject = async (subject) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&startIndex=0&maxResults=40`
      );
      const data = await response.json();
  
      // If a single book is provided, add it to the list of books
      if (book) {
        setBooks((prevBooks) => {
          const uniqueBooks = [...prevBooks, book, ...data.items].reduce(
            (unique, item) => (unique.some((i) => i.id === item.id) ? unique : [...unique, item]),
            []
          );
          return uniqueBooks;
        });
      } else {
        setBooks((prevBooks) => {
          const uniqueBooks = [...prevBooks, ...data.items].reduce(
            (unique, item) => (unique.some((i) => i.id === item.id) ? unique : [...unique, item]),
            []
          );
          return uniqueBooks;
        });
      }
    } catch (error) {
      console.error(`Error fetching books for subject ${subject}:`, error);
    }
  };
  

  useEffect(() => {
    // Fetch books for different subjects
    const subjects = ['Romance','Science Fiction', 'Mystery/Thriller', 'Horror','Fantasy', 'Historical Fiction','Autobiography',
  'Poetry','Comedy','Travel'
  ]; // Add more subjects as needed

    subjects.forEach((subject) => {
      fetchBooksBySubject(subject);
    });
  }, [book]);

  useEffect(() => {
    if (search === '') {
      setFiltered([]);
      return;
    }

    // Ensure books is always an array
    const booksArray = Array.isArray(books) ? books : [];
    const filteredBooks = booksArray.filter(
      (book) =>
        book.volumeInfo.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
    setFiltered(filteredBooks);
  }, [search, books]);

  return (
    <View style={styles.container}>
      <View style={{ borderRadius: 20, flexDirection: 'row', borderWidth:0.5,borderColor:'#666',backgroundColor: '#dfe4ea',alignItems:'center',padding:5}}>
        <Icon name='search' size={30} color='#666' />
        <TextInput
          placeholder='Search for a book'
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
              navigation.navigate('Book Info', { isbn: book?.selfLink });
              console.log(book?.selfLink);
            }}>
              <Image
                source={{
                  uri:
                    book?.volumeInfo?.imageLinks?.thumbnail ||
                    book?.volumeInfo?.imageLinks?.smallThumbnail ||
                    'https://dummyimage.com/100x100/000/fff',
                }}
                style={{ height: 150, width: 120,borderRadius:10 }}
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
        <View style={{ justifyContent: 'center', alignItems: 'center',marginTop:40}}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
          Oops...we didn't find anything{'\n'}that matches this search
        </Text>
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
    fontStyle: 'italic', // Add this property to make the text italic

  },
});

export default Search;