import React from 'react';
import { Button, Icon, List, ListItem } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { ROUTES } from '../../config/routes';
import PropTypes from 'prop-types';

const ListOrder = ({ data, getCurrentOrderAction, navigation }) => {
  const renderItemAccessory = (props, id) => (
    <Button
      status="basic"
      onPress={() => {
        getCurrentOrderAction(id);
        navigation.navigate(ROUTES.currentMyOrder);
      }}
    >
      <Icon {...props} name={'eye'} />
    </Button>
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      onPress={() => {
        getCurrentOrderAction(item.id);
        navigation.navigate(ROUTES.currentMyOrder);
      }}
      title={` Commande n°${index + 1} le ${item.createdAt} `}
      description={`${item.total} €`}
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

ListOrder.propTypes = {
  data: PropTypes.array,
  getCurrentOrderAction: PropTypes.func,
  navigation: PropTypes.object,
};

export default ListOrder;
