import classNames from 'classnames/bind';

import styles from './main.module.scss';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { trpc } from '../../../utils/client';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ImageUploader } from '../../ImageUploader/ImageUploader';
import { ImageListType } from 'react-images-uploading';

const cx = classNames.bind(styles);

export const Main: React.FC = () => {
  const toast = useRef<Toast>(null);
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<ImageListType>([]);
  const generateText = trpc.api.analyzeDocument.useMutation({
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        life: 5000,
        summary: 'Analize atlikta',
      });
    },
    onError: () => {
      toast.current?.show({
        severity: 'error',
        life: 5000,
        summary: 'Analize nepaejo',
      });
    },
  });
  const search = trpc.api.search.useMutation({
    onSuccess: () => {
      toast.current?.show({
        severity: 'success',
        life: 5000,
        summary: 'Analize atlikta',
      });
    },
    onError: () => {
      toast.current?.show({
        severity: 'error',
        life: 5000,
        summary: 'Analize nepaejo',
      });
    },
  });

  return (
    <div className="flex flex-column">
      <div className="py-2 flex align-items-center justify-content-center h-full w-full">
        <ImageUploader images={images} setImages={setImages} />
      </div>
      <Button
        onClick={() => {
          const dataUrls = images.map((image) => ({
            dataUrl: image['data_url'],
            name: image.file?.name,
          }));
          generateText.mutate(dataUrls, { onSuccess: (data) => console.log(data) });
        }}
        className={cx('main__button')}
        label={'Analizuot testa'}
      />
      <div className="flex gap-2">
        <InputText placeholder={'Ivesk uzklausa'} value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <Button
          onClick={() => search.mutate({ prompt })}
          className={cx('secret-zone__notion_button')}
          label={'Ieskoti'}
          disabled={!prompt.length}
        />
      </div>
    </div>
  );
};
