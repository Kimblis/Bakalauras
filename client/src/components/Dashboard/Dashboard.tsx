import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';
import { classNames } from 'primereact/utils';

import { InnerDashboard } from './InnerDashboard/InnerDashboard';
import { NavigationItem } from './NavigationItem/NavigationItem';
import { routes } from '../../routes/router';
import styles from './dashboard.module.scss';

const cx = classNames.bind(styles);

export const Dashboard: React.FC = () => {
  const breadcrumbs = useReactRouterBreadcrumbs(routes);
  let menuOptions = [
    {
      title: 'Pagrindinis',
      link: `/dashboard`,
      icon: () => (
        <div>
          <i className="pi pi-home text-2xl" />
        </div>
      ),
    },
  ];

  return (
    <InnerDashboard breadcrumbs={breadcrumbs}>
      {menuOptions.map(({ title, link, icon }, index) => (
        <NavigationItem to={link} title={title} iconComponent={icon} key={index} />
      ))}
    </InnerDashboard>
  );
};
