import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/navbar';
import ListCart from '../../components/listCart';
import { Text, Layout, Button, Icon } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import { deleteCart, clearCart } from '../../redux/cart/actions';
import { currentProduct } from '../../redux/products/actions';
import { ROUTES } from '../../config/routes';
import { addOrder, resetSuccessOrder } from '../../redux/order/actions';
import PropTypes from 'prop-types';

const CartScreen = ({
  allCart,
  deleteCartAction,
  currentProductAction,
  navigation,
  currentUser,
  addOrderAction,
  clearCartAction,
  successOrder,
  resetSuccessOrderAction,
}) => {
  const [total, setTotal] = useState(0);
  const [updateTotal, setUpdateTotal] = useState(false);
  useEffect(() => {
    if (allCart && allCart.length > 0) {
      let priceTotal = 0;
      allCart.map((c) => (priceTotal += parseFloat(c.price) * c.quantity));
      setTotal(priceTotal.toFixed(2));
    } else {
      setTotal(0);
    }

    return () => resetSuccessOrderAction();
  }, [allCart, updateTotal]);

  return (
    <>
      <Navbar />
      <Layout style={{ flex: 1, padding: 20 }}>
        {successOrder ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text appearance="hint" category="h4">
              Merci pour votre achat !
            </Text>
            <Icon style={styles.icon} name="checkmark-circle-outline" />
          </View>
        ) : (
          <>
            <ListCart
              currentProductAction={currentProductAction}
              updateTotal={updateTotal}
              navigation={navigation}
              setUpdateTotal={setUpdateTotal}
              data={allCart}
              deleteCartAction={deleteCartAction}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                }}
              >
                Total :
              </Text>
              <Text
                style={{
                  fontSize: 25,
                }}
              >
                {total} €
              </Text>
            </View>
            <Button
              disabled={allCart && allCart.length > 0 ? false : true}
              status="primary"
              onPress={() => {
                if (currentUser) {
                  clearCartAction();
                  addOrderAction(allCart, total);
                } else {
                  navigation.navigate(ROUTES.signIn);
                }
              }}
            >
              Commander
            </Button>
          </>
        )}
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 112,
    height: 112,
  },
});

const mapStateToProps = ({ authUser, cart, orders }) => {
  const { current: currentUser, loading: loadingUser } = authUser;
  const { all: allCart, loading: loadingCart } = cart;
  const { success: successOrder } = orders;

  return {
    currentUser,
    loadingUser,
    allCart,
    loadingCart,
    successOrder,
  };
};

const mapDispatchToProps = {
  deleteCartAction: deleteCart,
  currentProductAction: currentProduct,
  addOrderAction: addOrder,
  clearCartAction: clearCart,
  resetSuccessOrderAction: resetSuccessOrder,
};

CartScreen.propTypes = {
  currentUser: PropTypes.object,
  loadingUser: PropTypes.bool,
  allCart: PropTypes.array,
  loadingCart: PropTypes.bool,
  successOrder: PropTypes.bool,
  deleteCartAction: PropTypes.func,
  currentProductAction: PropTypes.func,
  addOrderAction: PropTypes.func,
  clearCartAction: PropTypes.func,
  resetSuccessOrderAction: PropTypes.func,
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
