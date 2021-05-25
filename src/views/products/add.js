import React, { useState } from 'react';
import { Layout } from '@ui-kitten/components';
import FormProduct from '../../components/_shared/formProduct';
import { connect } from 'react-redux';
import { addProduct } from '../../redux/products/actions';
import Navbar from '../../components/navbar';
import { ROUTES } from '../../config/routes';
import PropTypes from 'prop-types';

const AddProduct = ({
  loadingProduct,
  errorProduct,
  addProductAction,
  currentUser,
  navigation,
}) => {
  if (currentUser && currentUser.role != 'ROLE_ADMIN')
    navigation.navigate(ROUTES.home);

  const [fields, setFields] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
  });
  const [messageError, setMessageError] = useState('');

  const onSubmit = () => {
    if (
      fields.name ||
      fields.image ||
      fields.description ||
      fields.description
    ) {
      setMessageError('');
      setFields({
        name: '',
        image: '',
        description: '',
        price: '',
      });
      addProductAction(fields);
    } else {
      setMessageError('Merci de remplir tous les champs');
    }
  };

  return (
    <>
      <Navbar />
      <Layout style={{ flex: 1, padding: 20 }}>
        <FormProduct
          title="Nouveau produit"
          fields={fields}
          setFields={setFields}
          error={errorProduct}
          loading={loadingProduct}
          onSubmit={onSubmit}
          messageError={messageError}
        />
      </Layout>
    </>
  );
};

const mapStateToProps = ({ products, authUser }) => {
  const { error: errorProduct, loading: loadingProduct } = products;
  const { current: currentUser } = authUser;
  return { loadingProduct, errorProduct, currentUser };
};

const mapDispatchToProps = {
  addProductAction: addProduct,
};

AddProduct.propTypes = {
  loadingProduct: PropTypes.bool,
  errorProduct: PropTypes.string,
  addProductAction: PropTypes.func,
  currentUser: PropTypes.object,
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
