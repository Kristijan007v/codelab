import { ClCheckbox, ClTextInput, ClTextInputFormik } from '@codelab/ui';
import { useLocalStorage } from '@codelab/hooks';
import Head from 'next/head';

import styles from '../scss/Home.module.css';
import ClAvatar from '@codelab/ui/src/components/avatar/Avatar';

export default function Home() {
  //set ts type to default or dark
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  const handleThemeChange = () => {
    if (theme === 'default') {
      setTheme('dark');
    } else {
      setTheme('default');
    }
  };

  return (
    <div className={`${styles.container} theme--${theme}`}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <ClCheckbox />
        <ClAvatar>
          <span>AB</span>
        </ClAvatar>
      </main>
    </div>
  );
}
