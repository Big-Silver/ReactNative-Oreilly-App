import { StackNavigator, DrawerNavigator } from 'react-navigation';
import LoginScreen from '../screens/Login';
import ShopScreen from '../screens/Shops';
import VehiclesScreen from '../screens/Vehicles';
import VinScanScreen from '../screens/VinScan';
import PlateScanScreen from '../screens/PlateScan';
import CatalogScreen from '../screens/Catalog';
import MenuContainer from '../screens/Menu';

const MainMenu = DrawerNavigator(
  {
    Shops: {
      screen: ShopScreen
    },
    Vehicles: {
      screen: VehiclesScreen
    },
    VinScan: {
      screen: VinScanScreen
    },
    PlateScan: {
      screen: PlateScanScreen
    },
    Catalog: {
      screen: CatalogScreen
    },
    LogOut: {
      screen: LoginScreen,
      navigationOptions: {
        drawerLabel: 'Log out'
      }
    }
  },
  {
    drawerWidth: 300,
    contentComponent: MenuContainer,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
);

export const OReillyApp = StackNavigator({
  Login: {
    screen: LoginScreen
  },
  Menu: {
    screen: MainMenu
  }
}, {
  headerMode: 'none',
  title: 'Menu',
  initialRouteName: 'Login'
});
