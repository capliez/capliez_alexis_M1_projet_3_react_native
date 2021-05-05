import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Input, Text, Icon, Button } from '@ui-kitten/components';
import PropTypes from 'prop-types';

const FormProduct = ({
  setFields,
  fields,
  title,
  onSubmit,
  loading,
  error,
  messageError,
}) => {
  return (
    <>
      <Text style={{ textAlign: 'center' }} category="h5">
        {title}
      </Text>
      <Input
        value={fields.name}
        label="Titre"
        status={error ? 'danger' : 'basic'}
        clearButtonMode="always"
        placeholder="Titre"
        disabled={loading}
        onChangeText={(nextValue) =>
          setFields({ ...fields, name: nextValue.trimStart() })
        }
      />
      <Input
        value={fields.description}
        label="Description"
        status={error ? 'danger' : 'basic'}
        disabled={loading}
        style={styles.input}
        clearButtonMode="always"
        placeholder="Description"
        onChangeText={(nextValue) =>
          setFields({ ...fields, description: nextValue.trimStart() })
        }
      />
      <Input
        value={fields.image}
        label="Url Image"
        style={styles.input}
        clearButtonMode="always"
        status={error ? 'danger' : 'basic'}
        disabled={loading}
        placeholder="url"
        onChangeText={(nextValue) =>
          setFields({ ...fields, image: nextValue.trimStart() })
        }
      />
      <Input
        value={fields.price}
        label="Prix"
        style={styles.input}
        status={error ? 'danger' : 'basic'}
        disabled={loading}
        clearButtonMode="always"
        placeholder="Prix"
        onChangeText={(nextValue) =>
          setFields({ ...fields, price: nextValue.trimStart() })
        }
      />
      <Button
        style={styles.button}
        onPress={() => onSubmit()}
        disabled={loading}
        appearance="filled"
      >
        Valider
      </Button>
      <Text style={styles.textError} status="danger">
        {messageError || error}
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

export default FormProduct;
