import {
  Icon,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
  Text,
  Divider,
} from '@ui-kitten/components';
import { TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../config/routes';
import { connect } from 'react-redux';
import { getNameRole } from '../../config/utils';
import { logoutUser } from '../../redux/auth/actions';

const UserIcon = (props) => <Icon {...props} name="person-outline" />;

const CartIcon = (props, infiniteAnimationIconRef) => (
  <Icon
    animationConfig={{ cycles: Infinity }}
    animation="shake"
    ref={infiniteAnimationIconRef}
    {...props}
    name="shopping-cart-outline"
  />
);

const MyAccountIcon = (props) => <Icon {...props} name="edit-outline" />;
const MyProducts = (props) => <Icon {...props} name="edit-outline" />;

const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

const Navbar = ({ currentUser, loadingUser, allcart, logoutUserAction }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const infiniteAnimationIconRef = React.useRef();

  React.useEffect(() => {
    infiniteAnimationIconRef.current.startAnimation();
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const renderMenuAction = () => (
    <TopNavigationAction icon={UserIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => {
    const cart = allcart ? allcart : [];
    return (
      <React.Fragment>
        <View>
          <TopNavigationAction
            onPress={() => navigation.navigate(ROUTES.cart)}
            disabled={loadingUser}
            icon={(props) => CartIcon(props, infiniteAnimationIconRef)}
          />
          {cart.length > 0 && (
            <TouchableOpacity
              style={{
                borderRadius: 20,
                position: 'absolute',
                top: -4,
                left: -4,
                backgroundColor: '#292929',
                borderWidth: 1,
                borderColor: '#fff',
                paddingLeft: 4,
                paddingRight: 4,
                opacity: 0.8,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                }}
              >
                {allcart.length}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {!loadingUser && currentUser ? (
          <>
            <Text style={{ alignSelf: 'center' }}>{currentUser.name}</Text>

            <OverflowMenu
              anchor={renderMenuAction}
              visible={menuVisible}
              onBackdropPress={toggleMenu}
            >
              <MenuItem
                onPress={() => {
                  setMenuVisible(!menuVisible);
                }}
                title={
                  <Text status="primary" style={{ textAlign: 'center' }}>
                    {getNameRole(currentUser.role)}
                  </Text>
                }
              />
              {currentUser.role === 'ROLE_ADMIN' && (
                <MenuItem
                  onPress={() => {
                    setMenuVisible(!menuVisible);
                    navigation.navigate(ROUTES.addProduct);
                  }}
                  accessoryLeft={MyProducts}
                  title="Ajouter des produits"
                />
              )}

              <MenuItem
                onPress={() => {
                  setMenuVisible(!menuVisible);
                  navigation.navigate(ROUTES.myOrders);
                }}
                accessoryLeft={MyAccountIcon}
                title="Mes commandes"
              />
              <MenuItem
                onPress={() => {
                  logoutUserAction();
                  setMenuVisible(!menuVisible);
                }}
                accessoryLeft={LogoutIcon}
                title="Déconnexion"
              />
            </OverflowMenu>
          </>
        ) : (
          <TopNavigationAction
            onPress={() => navigation.navigate(ROUTES.signIn)}
            disabled={loadingUser}
            icon={UserIcon}
          />
        )}
      </React.Fragment>
    );
  };
  const renderTitleLeft = () => (
    <TouchableWithoutFeedback onPress={() => navigation.navigate(ROUTES.home)}>
      <Text category="h6">My Store</Text>
    </TouchableWithoutFeedback>
  );
  return (
    <TopNavigation
      alignment="center"
      accessoryLeft={renderTitleLeft}
      accessoryRight={renderRightActions}
    />
  );
};

const mapStateToProps = ({ authUser, cart }) => {
  const { current: currentUser, loading: loadingUser } = authUser;
  const { all: allcart } = cart;
  return { currentUser, loadingUser, allcart };
};

export default connect(mapStateToProps, {
  logoutUserAction: logoutUser,
})(Navbar);
