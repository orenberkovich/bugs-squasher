import { BugsContextProvider } from "./utils/BugsContext";
import Header from "./components/Header";
import GameContent from "./components/GameContent";

function App() {

  return (
    <BugsContextProvider>
      <Header />
      <GameContent />
    </BugsContextProvider>
  );
}

export default App;
