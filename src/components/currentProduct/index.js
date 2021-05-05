import React from 'react';
import { Text, Button } from '@ui-kitten/components';
import { View, Image, StyleSheet } from 'react-native';
import { AppImages } from '../../img';
import PropTypes from 'prop-types';

const CurrentProduct = ({
  current,
  addCartAction,
  updateCartAction,
  allCart,
}) => {
  const isInCart = allCart
    ? allCart.some((a) => a && a.id === current.id)
    : false;

  return (
    <View>
      <Image
        defaultSource={AppImages.loading}
        style={styles.image}
        source={{ uri: current.image }}
      />

      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.title}>{current.name}</Text>
        <Text style={styles.description}>{current.description}</Text>
        <Text style={styles.price}>{current.price} €</Text>
        <Button
          onPress={() =>
            isInCart ? updateCartAction(current.id) : addCartAction(current)
          }
          status="info"
        >
          {'Ajouter'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'stretch',
  },
  price: {
    fontSize: 20,
    textAlign: 'right',
    marginTop: 30,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    marginTop: 20,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 25,
  },
});

CurrentProduct.propTypes = {
  current: PropTypes.object,
  addCartAction: PropTypes.func,
  updateCartAction: PropTypes.func,
  allCart: PropTypes.array,
};

export default CurrentProduct;
