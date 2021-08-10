import Text from './Text';
import style from './Theme.module.scss';

function App() {
  return (
    <div data-theme='dark' className={style.wrapper}>
      HELLO WORLD!
      <Text />
    </div>
  );
}

export default App;
