import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import {
  Input,
  Text,
  Icon,
  Button,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import PropTypes from 'prop-types';

const StarIcon = (props) => <Icon {...props} name="star" />;
const UserIcon = (props) => <Icon {...props} name="person-outline" />;

const FormAuth = ({
  secureTextEntry,
  setSecureTextEntry,
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  messageError,
  errorUser,
  loading,
  setName,
  name,
  isName,
  title,
  setRoleIndex,
  isSignUp,
  roleIndex,
  ROLES,
}) => {
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderOption = (title) => (
    <SelectItem key={title} accessoryLeft={StarIcon} title={title} />
  );

  return (
    <>
      <Text style={{ textAlign: 'center' }} category="h5">
        {title}
      </Text>
      {isName && (
        <Input
          value={name}
          label="Nom"
          clearButtonMode="always"
          disabled={loading}
          status={errorUser ? 'danger' : 'basic'}
          placeholder="Nom"
          onChangeText={(nextValue) => setName(nextValue.trimStart())}
        />
      )}
      <Input
        value={email}
        label="Adresse email"
        clearButtonMode="always"
        style={styles.input}
        disabled={loading}
        status={errorUser ? 'danger' : 'basic'}
        placeholder="Email"
        onChangeText={(nextValue) => setEmail(nextValue.trimStart())}
      />
      <Input
        clearButtonMode="always"
        style={styles.input}
        value={password}
        disabled={loading}
        label="Mot de passe"
        placeholder="Mot de passe"
        status={errorUser ? 'danger' : 'basic'}
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={(nextValue) => setPassword(nextValue.trimStart())}
      />

      {isSignUp && (
        <Select
          label="Rôle"
          status={errorUser ? 'danger' : 'basic'}
          disabled={loading}
          style={styles.input}
          placeholder="Choisir le rôle"
          value={ROLES[roleIndex.row].name}
          selectedIndex={roleIndex}
          onSelect={(index) => setRoleIndex(index)}
        >
          {ROLES.map((r) => renderOption(r.name))}
        </Select>
      )}
      <Button
        style={styles.button}
        onPress={() => onSubmit()}
        appearance="filled"
        disabled={loading}
      >
        Valider
      </Button>
      <Text style={styles.textError} status="danger">
        {messageError || errorUser}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
  },
  button: {
    margin: 20,
  },
  textError: {
    textAlign: 'center',
  },
});

FormAuth.propTypes = {
  title: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  setSecureTextEntry: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string,
  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
  onSubmit: PropTypes.func,
  messageError: PropTypes.string,
  errorUser: PropTypes.string,
  loading: PropTypes.bool,
  setName: PropTypes.func,
  name: PropTypes.string,
  isName: PropTypes.bool,
  roleIndex: PropTypes.object,
  setRoleIndex: PropTypes.func,
  isSignUp: PropTypes.bool,
  ROLES: PropTypes.array,
};

export default FormAuth;
