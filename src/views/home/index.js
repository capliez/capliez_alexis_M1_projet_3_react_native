import { Divider, Layout } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/navbar';
import { getProducts, currentProduct } from '../../redux/products/actions';
import ListProduct from '../../components/listProduct';
import Loading from '../../components/_shared/loading';
import { addCart, updateCart } from '../../redux/cart/actions';
import PropTypes from 'prop-types';

const HomeScreen = ({
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

const mapStateToProps = ({ products, cart }) => {
  const { all: allCart, loading: loadingCart } = cart;
  const {
    all: allProducts,
    loading: loadingProducts,
    current: currentProduct,
  } = products;
  return {
    allProducts,
    loadingProducts,
    currentProduct,
    allCart,
    loadingCart,
  };
};

const mapDispatchToProps = {
  getProductsAction: getProducts,
  currentProductAction: currentProduct,
  addCartAction: addCart,
  updateCartAction: updateCart,
};

HomeScreen.propTypes = {
  getProductsAction: PropTypes.func,
  allProducts: PropTypes.array,
  loadingProducts: PropTypes.bool,
  currentProductAction: PropTypes.func,
  navigation: PropTypes.object,
  currentProduct: PropTypes.object,
  addCartAction: PropTypes.func,
  allCart: PropTypes.array,
  loadingCart: PropTypes.bool,
  updateCartAction: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
