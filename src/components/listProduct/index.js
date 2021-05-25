import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card, List, Text, Button } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import { ROUTES } from '../../config/routes';
import { AppImages } from '../../img';

const ListProduct = ({
  data,
  currentProductAction,
  loadingProducts,
  navigation,
  addCartAction,
  allCart,
  loadingCart,
  updateCartAction,
}) => {
  const renderItemHeader = (headerProps, item) => (
    <View {...headerProps}>
      <Text style={styles.title} category="h6">
        {item.name}
      </Text>
    </View>
  );

  const renderItemFooter = (footerProps, item) => {
    const isInCart = allCart
      ? allCart.some((a) => a && a.id === item.id)
      : false;
    const quantityInCart =
      allCart && allCart.length > 0
        ? allCart.findIndex((c) => c.id === item.id)
        : -1;
    return (
      <View style={styles.footerCard}>
        <Button
          disabled={loadingCart || loadingProducts}
          onPress={() => {
            currentProductAction(item.id);
            navigation.navigate(ROUTES.currentProduct);
          }}
          status="info"
        >
          Voir
        </Button>
        <Button
          onPress={() =>
            isInCart ? updateCartAction(item.id) : addCartAction(item)
          }
          disabled={loadingCart || loadingProducts}
          status="basic"
        >
          {'Ajouter'}
          {' ('}
          {quantityInCart !== -1 ? allCart[quantityInCart].quantity : 0}
          {')'}
        </Button>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <Card
      onPress={() => {
        currentProductAction(item.id);
        navigation.navigate(ROUTES.currentProduct);
      }}
      style={styles.card}
      status="primary"
      header={(headerProps) => renderItemHeader(headerProps, item)}
      footer={(footerProps) => renderItemFooter(footerProps, item)}
    >
      <View>
        <Image
          defaultSource={AppImages.loading}
          style={styles.image}
          source={{ uri: item.image }}
        />
        <Text style={styles.price}>{item.price} €</Text>
      </View>
    </Card>
  );
  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={renderItem}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    maxHeight: '100%',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'stretch',
  },
  card: {
    margin: 10,
  },
  title: {
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    color: 'white',
    bottom: 10,
    right: 10,
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: '#2541cc',
    padding: 5,
  },
  footerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

ListProduct.propTypes = {
  data: PropTypes.array,
  currentProductAction: PropTypes.func,
  loadingProducts: PropTypes.bool,
  navigation: PropTypes.object,
  addCartAction: PropTypes.func,
  allCart: PropTypes.array,
  loadingCart: PropTypes.bool,
  updateCartAction: PropTypes.func,
};

export default ListProduct;
