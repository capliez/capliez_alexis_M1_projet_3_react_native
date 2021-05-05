import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';
const Loading = () => (
  <Layout style={styles.container}>
    <Spinner status="primary" size="giant" />
  </Layout>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Loading;
