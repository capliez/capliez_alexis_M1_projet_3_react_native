import React from 'react';
import { connect } from 'react-redux';
import { Text, Layout } from '@ui-kitten/components';
import Loading from '../../components/_shared/loading';
import Navbar from '../../components/navbar';
import PropTypes from 'prop-types';
import Current from '../../components/currentProduct';
import { addCart, updateCart } from '../../redux/cart/actions';

const CurrentProduct = ({
  loadingProduct,
  currentProduct,
  addCartAction,
  updateCartAction,
  allCart,
}) => {
  const renderProduct = () => {
    if (loadingProduct) return <Loading />;
    if (!loadingProduct && currentProduct)
      return (
        <Current
          allCart={allCart}
          updateCartAction={updateCartAction}
          current={currentProduct}
          addCartAction={addCartAction}
        />
      );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <Navbar />
      {renderProduct()}
    </Layout>
  );
};

const mapStateToProps = ({ products, cart }) => {
  const {
    error: errorProduct,
    loading: loadingProduct,
    current: currentProduct,
  } = products;
  const { all: allCart } = cart;
  return { loadingProduct, errorProduct, currentProduct, allCart };
};

CurrentProduct.propTypes = {
  currentProduct: PropTypes.object,
  loadingProduct: PropTypes.bool,
  addCartAction: PropTypes.func,
  updateCartAction: PropTypes.func,
  allCart: PropTypes.array,
};

export default connect(mapStateToProps, {
  addCartAction: addCart,
  updateCartAction: updateCart,
})(CurrentProduct);
