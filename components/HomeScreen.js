import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  const [cocktails, setCocktails] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a&p=${page}`
      );
      const data = await response.json();
      if (page === 1) {
        setCocktails(data.drinks);
      } else {
        setCocktails(prevCocktails => [...prevCocktails, ...data.drinks]);
      }
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 20 }}>
      <TouchableOpacity
        style={{ marginBottom: 20 }}
        onPress={() => navigation.navigate('Detail recette', { recetteId: item.idDrink })}
      >
        <Text style={styles.cocktailName}>{item.strDrink}</Text>
        <Image
          source={{ uri: item.strDrinkThumb }}
          style={{ width: 300, height: 300 }}
        />
      </TouchableOpacity>
    </View>
  );

  const handleEndReached = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cocktails</Text>
      <FlatList
        data={cocktails}
        renderItem={renderItem}
        keyExtractor={item => item.idDrink}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cocktailName: {
    fontSize: 20, 
    textAlign: 'center',
  },
});

export default HomeScreen;
