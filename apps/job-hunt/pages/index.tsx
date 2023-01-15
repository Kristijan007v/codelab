import {
  ClButton,
  ClCheckbox,
  ClCheckInputFormik,
  ClCol,
  ClContainer,
  ClDropzone,
  ClDropzoneFormik,
  ClRadioInputFormik,
  ClRow,
  ClSelectInput,
  ClSelectInputFormik,
  ClSliderInputFormik,
  ClTextInput,
  ClTextInputFormik,
} from '@codelab/ui';
import { useLocalStorage } from '@codelab/hooks';
import Head from 'next/head';

import { Form, Formik } from 'formik';
import { jobAddSchema } from '@codelab/validations';
import ClOverlay from '@codelab/ui/src/components/overlay/Overlay';
import ClModal from '@codelab/ui/src/components/modal/Modal';
import { useState } from 'react';

// import { ClAvatar } from '@codelab/ui/src/components/avatar/Avatar';

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
  const checks = [
    { label: 'Check1', value: 'check1' },
    { label: 'Check2', value: 'check2' },
  ];
  const radios = [
    { label: 'radio1', value: 'radio1' },
    { label: 'radio2', value: 'radio2' },
  ];
  const selectOptions = [
    {
      groupLabel: 'Fruits',
      options: [
        { label: 'Apple', value: 'apple' },
        { label: 'Mango', value: 'mango' },
      ],
    },
    {
      groupLabel: 'Meat',
      options: [
        { label: 'Mutton', value: 'mutton' },
        { label: 'Chicken', value: 'chicken' },
      ],
    },
  ];
  const validationSchema = jobAddSchema;

  const [visible, setVisible] = useState(false);

  return (
    <div className={`theme--${theme}`}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <ClOverlay visible={visible} position={'center'} backdropBlur animation='zoom' onClick={() => setVisible((v) => !v)}>
        <ClModal>
          <main>
            <ClContainer>
              <Formik
                validationSchema={validationSchema}
                initialValues={{}}
                onSubmit={(values) => console.log(values)}
              >
                <Form>
                  <ClRow>
                    <ClCol sm={4}>
                      <ClTextInputFormik placeholder={'Job Title'} name='title' />
                    </ClCol>

                    <ClCol sm={4}>
                      <ClTextInputFormik
                        Control='textarea'
                        placeholder={'Select Food'}
                        name='description'
                      />
                    </ClCol>
                    <ClCol sm={4}>
                      <ClSliderInputFormik name='price' />
                    </ClCol>
                    <ClCol sm={12}>
                      <ClDropzoneFormik
                        name='photos'
                        // uploadConfig={{
                        //   url: 'http://localhost:4000/api/upload/products',
                        //   method: 'post',
                        // }}
                      />
                    </ClCol>
                    <ClCol>
                      <ClButton>Submit</ClButton>
                    </ClCol>
                  </ClRow>
                </Form>
              </Formik>
            </ClContainer>

            {/* <ClAvatar variant={'success'} size='xxl'>
          <span>AB</span>
        </ClAvatar> */}
          </main>
        </ClModal>
      </ClOverlay>
      <ClButton onClick={() => setVisible((v) => !v)}>Toogle Overlay</ClButton>
    </div>
  );
}
