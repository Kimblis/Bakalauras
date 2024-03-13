import classNames from 'classnames/bind';

import styles from '../dashboard.module.scss';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

export const Main: React.FC = () => {
  const toast = useRef<Toast>(null);
  const [prompt, setPrompt] = useState('');
  return <div>Yooo</div>;
};
