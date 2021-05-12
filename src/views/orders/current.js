import React from 'react';
import { Text, Layout, Button } from '@ui-kitten/components';
import Navbar from '../../components/navbar';
import { connect } from 'react-redux';
import Loading from '../../components/_shared/loading';
import { currentProduct } from '../../redux/products/actions';
import { ROUTES } from '../../config/routes';
import { View } from 'react-native';

const CurrentOrder = ({
  currentOrder,
  loadingOrders,
  allProducts,
  navigation,
  currentProductAction,
}) => {
  if (loadingOrders) return <Loading />;
  return (
    <>
      <Navbar />
      <Layout style={{ flex: 1, padding: 20 }}>
        <Text category="h5">Commande du {currentOrder.createdAt}</Text>
        <Text category="p1">Total {currentOrder.total} €</Text>
        <Text category="h6">Les articles</Text>

        {currentOrder.products.map((p) => {
          const { quantity, id } = p;
          const currentProduct = allProducts.find((c) => c.id === id);
          return (
            <View
              key={id}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text>
                {currentProduct.name} {currentProduct.quantity}
              </Text>
              <Button
                size="small"
                onPress={() => {
                  currentProductAction(id);
                  navigation.navigate(ROUTES.currentProduct);
                }}
              >
                Voir
              </Button>
            </View>
          );
        })}
      </Layout>
    </>
  );
};

const mapStateToProps = ({ orders, products }) => {
  const { current: currentOrder, loading: loadingOrders } = orders;
  const { all: allProducts } = products;

  return {
    currentOrder,
    loadingOrders,
    allProducts,
  };
};

export default connect(mapStateToProps, {
  currentProductAction: currentProduct,
})(CurrentOrder);
