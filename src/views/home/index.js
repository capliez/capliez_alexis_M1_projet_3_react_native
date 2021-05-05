import { Divider, Layout, Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/navbar';
import { getProducts, currentProduct } from '../../redux/products/actions';
import ListProduct from '../../components/listProduct';
import Loading from '../../components/_shared/loading';
import { addCart, updateCart } from '../../redux/cart/actions';

const HomeScreen = ({
  currentUser,
  loadingUser,
  getProductsAction,
  allProducts,
  loadingProducts,
  currentProductAction,
  navigation,
  currentProduct,
  addCartAction,
  allCart,
  loadingCart,
  updateCartAction,
}) => {
  useEffect(() => {
    !allProducts && getProductsAction();
  }, [allProducts]);

  return (
    <>
      <Navbar />
      <Divider />
      <Layout style={{ flex: 1 }}>
        {loadingProducts && <Loading />}
        {!loadingProducts && allProducts && (
          <ListProduct
            currentProductAction={currentProductAction}
            data={allProducts}
            currentProduct={currentProduct}
            navigation={navigation}
            addCartAction={addCartAction}
            loadingCart={loadingCart}
            allCart={allCart}
            updateCartAction={updateCartAction}
          />
        )}
      </Layout>
    </>
  );
};

const mapStateToProps = ({ authUser, products, cart }) => {
  const { current: currentUser, loading: loadingUser } = authUser;
  const { all: allCart, loading: loadingCart } = cart;
  const {
    all: allProducts,
    loading: loadingProducts,
    current: currentProduct,
  } = products;
  return {
    currentUser,
    loadingUser,
    allProducts,
    loadingProducts,
    currentProduct,
    allCart,
    loadingCart,
  };
};

export default connect(mapStateToProps, {
  getProductsAction: getProducts,
  currentProductAction: currentProduct,
  addCartAction: addCart,
  updateCartAction: updateCart,
})(HomeScreen);
