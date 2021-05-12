import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/navbar';
import ListCart from '../../components/listCart';
import { Text, Layout, Button } from '@ui-kitten/components';
import { View } from 'react-native';
import { deleteCart, clearCart } from '../../redux/cart/actions';
import { currentProduct } from '../../redux/products/actions';
import { ROUTES } from '../../config/routes';
import { addOrder } from '../../redux/order/actions';

const CartScreen = ({
  allCart,
  deleteCartAction,
  currentProductAction,
  navigation,
  currentUser,
  addOrderAction,
  clearCartAction,
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
  }, [allCart, updateTotal]);

  return (
    <>
      <Navbar />
      <Layout style={{ flex: 1, padding: 20 }}>
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
      </Layout>
    </>
  );
};

const mapStateToProps = ({ authUser, cart }) => {
  const { current: currentUser, loading: loadingUser } = authUser;
  const { all: allCart, loading: loadingCart } = cart;

  return {
    currentUser,
    loadingUser,
    allCart,
    loadingCart,
  };
};

export default connect(mapStateToProps, {
  deleteCartAction: deleteCart,
  currentProductAction: currentProduct,
  addOrderAction: addOrder,
  clearCartAction: clearCart,
})(CartScreen);
