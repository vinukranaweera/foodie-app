import AppNavigation from "./src/navigation";
import { Provider } from 'react-redux';
import store from "./src/redux/store";
import FavoritesLoader from "./src/components/FavoritesLoader"; // adjust path

export default function App() {

  return (
    <Provider store={store}>
      <FavoritesLoader />
      <AppNavigation />
    </Provider>
  );
}
