import React, { useEffect } from 'react';
import Navbar from '../../components/navbar';
import { Text, Layout } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { getOrders, getCurrentOrder } from '../../redux/order/actions';
import ListOrder from '../../components/listOrder';
import PropTypes from 'prop-types';

const MyOrdersScreen = ({
  getOrdersAction,
  allOrders,
  getCurrentOrderAction,
  navigation,
}) => {
  useEffect(() => {
    if (!allOrders) getOrdersAction();
  }, [allOrders]);
  return (
    <>
      <Navbar />
      <Layout style={{ flex: 1, padding: 20 }}>
        <Text category="h5">Mes commandes</Text>
        <ListOrder
          data={allOrders}
          getCurrentOrderAction={getCurrentOrderAction}
          navigation={navigation}
        />
      </Layout>
    </>
  );
};

const mapStateToProps = ({ orders }) => {
  const { all: allOrders, loading: loadingOrders } = orders;

  return {
    allOrders,
    loadingOrders,
  };
};

const mapDispatchToProps = {
  getOrdersAction: getOrders,
  getCurrentOrderAction: getCurrentOrder,
};

MyOrdersScreen.propTypes = {
  getOrdersAction: PropTypes.func,
  allOrders: PropTypes.array,
  getCurrentOrderAction: PropTypes.func,
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOrdersScreen);
