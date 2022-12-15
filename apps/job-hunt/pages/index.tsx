import { ClButton, ClLabel, ClSwitch, ClTooltip } from '@codelab/ui';
import Head from 'next/head';
import { useState } from 'react';

import styles from '../scss/Home.module.css';

export default function Home() {
  const triggerChildren = 'Tooltip Trigger';

  //set ts type to default or dark
  const [theme, setTheme] = useState('default');

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
        <ClTooltip triggerProps={{ children: triggerChildren, className: 'btn btn-primary' }}>
          Test tooltip
        </ClTooltip>

        <ClButton variant={'primary'} aria-label='Test' title='This is a test'>
          Test button
        </ClButton>
        <ClSwitch
          htmlFor='Test'
          label={theme === 'dark' ? 'Dark mode' : 'Light mode'}
          onCheckedChange={handleThemeChange}
        />
        <ClLabel htmlFor='Test'>Test label</ClLabel>
      </main>
    </div>
  );
}
