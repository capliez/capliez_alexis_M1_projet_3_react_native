import React from 'react';
import { Button, Icon, List, ListItem } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { ROUTES } from '../../config/routes';
const ListCart = ({
  data,
  deleteCartAction,
  updateTotal,
  setUpdateTotal,
  currentProductAction,
  navigation,
}) => {
  const renderItemAccessory = (props, id) => (
    <Button
      status="basic"
      onPress={() => {
        setUpdateTotal(!updateTotal);
        deleteCartAction(id);
      }}
    >
      <Icon {...props} name={'trash'} />
    </Button>
  );

  const renderItem = ({ item }) => (
    <ListItem
      onPress={() => {
        currentProductAction(item.id);
        navigation.navigate(ROUTES.currentProduct);
      }}
      title={`${item.name} ${item.quantity}`}
      description={`${item.price} € `}
      accessoryRight={(props) => renderItemAccessory(props, item.id)}
    />
  );

  return <List style={styles.container} data={data} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  container: {
    maxHeight: '100%',
    backgroundColor: 'white',
  },
});

export default ListCart;
