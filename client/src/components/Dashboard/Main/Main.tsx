import classNames from 'classnames/bind';

import styles from '../dashboard.module.scss';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { trpc } from '../../../utils/client';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const cx = classNames.bind(styles);

export const Main: React.FC = () => {
  const toast = useRef<Toast>(null);
  const [prompt, setPrompt] = useState('');
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
      <Button onClick={() => generateText.mutate()} className={cx('secret-zone__button')} label={'Analizuot testa'} />
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
