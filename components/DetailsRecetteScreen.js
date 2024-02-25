import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function DetailsRecetteScreen({ route }) {
  const { recetteId } = route.params;
  const [recetteDetail, setRecetteDetail] = useState(null);

  useEffect(() => {
    const fetchRecetteDetail = async () => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recetteId}`);
        const data = await response.json();
        setRecetteDetail(data.drinks[0]);
      } catch (error) {
        console.error('Error fetching recette details:', error);
      }
    };

    fetchRecetteDetail();

    return () => {
      setRecetteDetail(null);
    };
  }, [recetteId]);

  return (
    <View style={styles.container}>
      {recetteDetail ? (
        <>
          <Text style={styles.title}>Recette: {recetteDetail.strDrink}</Text>
          <Image
            source={{ uri: recetteDetail.strDrinkThumb }}
            style={{ width: 300, height: 300 }}
          />
          <Text style={styles.category}>Categorie: {recetteDetail.strCategory}</Text>
          <Text style={styles.instructions}>Instructions: {recetteDetail.strInstructions}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
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
  category: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
});

export default DetailsRecetteScreen;
