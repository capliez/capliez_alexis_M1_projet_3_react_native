import { Layout, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import Navbar from '../../components/navbar';
import SignUpForm from '../../components/_shared/formAuth';
import { ROUTES } from '../../config/routes';
import {
  clearErrorUser,
  clearSuccessUser,
  loginUser,
} from '../../redux/auth/actions';
import PropTypes from 'prop-types';

const SignInScreen = ({
  navigation,
  loginUserAction,
  successUser,
  errorUser,
  loadingUser,
  currentUser,
  clearSuccessUserAction,
  clearErrorUserAction,
}) => {
  const [email, setEmail] = useState('capliezalexis@yahoo.fr');
  const [password, setPassword] = useState('');
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
    if (email && password) {
      setMessageError('');
      loginUserAction({
        email: email,
        password: password,
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
          password={password}
          title="Connexion"
          errorUser={errorUser}
          setPassword={setPassword}
          loading={loadingUser}
          setSecureTextEntry={setSecureTextEntry}
          secureTextEntry={secureTextEntry}
          onSubmit={onSubmit}
          messageError={messageError}
        />
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate(ROUTES.signUp)}
        >
          <Text style={{ textAlign: 'center' }}>S'inscrire</Text>
        </TouchableWithoutFeedback>
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
  loginUserAction: loginUser,
  clearErrorUserAction: clearErrorUser,
  clearSuccessUserAction: clearSuccessUser,
};

SignInScreen.propTypes = {
  loadingUser: PropTypes.bool,
  currentUser: PropTypes.object,
  errorUser: PropTypes.string,
  successUser: PropTypes.bool,
  loginUserAction: PropTypes.func,
  clearErrorUserAction: PropTypes.func,
  clearSuccessUserAction: PropTypes.func,
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
