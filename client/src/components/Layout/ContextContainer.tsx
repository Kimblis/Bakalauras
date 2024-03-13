import { ReactNode } from 'react';
import styles from './ContextContainer.module.scss';

interface ContextContainerProps {
  children: ReactNode;
  classNames?: string;
}

const ContextContainer: React.FC<ContextContainerProps> = ({ children, classNames }) => {
  return <main className={`${styles.context} ${classNames || ''}`}>{children}</main>;
};

export default ContextContainer;
