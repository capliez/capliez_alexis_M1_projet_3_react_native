import { Layout } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/navbar';
import SignUpForm from '../../components/_shared/formAuth';
import { ROUTES } from '../../config/routes';
import {
  clearErrorUser,
  clearSuccessUser,
  registerUser,
} from '../../redux/auth/actions';

const SignUpScreen = ({
  navigation,
  registerUserAction,
  successUser,
  errorUser,
  loadingUser,
  currentUser,
  clearSuccessUserAction,
  clearErrorUserAction,
}) => {
  const [email, setEmail] = useState('capliezalexis@yahoo.fr');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    successUser || (currentUser && navigation.navigate(ROUTES.home));
    return () => {
      clearSuccessUserAction();
      clearErrorUserAction();
    };
  }, [successUser, currentUser]);

  const onSubmit = () => {
    if (email && password && name) {
      setMessageError('');
      registerUserAction({
        email: email,
        password: password,
        name: name,
      });
    } else {
      setMessageError('Merci de remplir tous les champs');
    }
  };

  return (
    <>
      <Navbar />
      <Layout style={{ flex: 1, padding: 20 }}>
        <SignUpForm
          setEmail={setEmail}
          email={email}
          name={name}
          setName={setName}
          title="Inscription"
          isName={true}
          password={password}
          errorUser={errorUser}
          setPassword={setPassword}
          loading={loadingUser}
          setSecureTextEntry={setSecureTextEntry}
          secureTextEntry={secureTextEntry}
          onSubmit={onSubmit}
          messageError={messageError}
        />
      </Layout>
    </>
  );
};
const mapStateToProps = ({ authUser }) => {
  const {
    success: successUser,
    current: currentUser,
    error: errorUser,
    loading: loadingUser,
  } = authUser;
  return { successUser, currentUser, loadingUser, errorUser };
};

const mapDispatchToProps = {
  registerUserAction: registerUser,
  clearErrorUserAction: clearErrorUser,
  clearSuccessUserAction: clearSuccessUser,
};

SignUpScreen.propTypes = {
  loadingUser: PropTypes.bool,
  currentUser: PropTypes.object,
  errorUser: PropTypes.string,
  successUser: PropTypes.bool,
  registerUserAction: PropTypes.func,
  clearErrorUserAction: PropTypes.func,
  clearSuccessUserAction: PropTypes.func,
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
