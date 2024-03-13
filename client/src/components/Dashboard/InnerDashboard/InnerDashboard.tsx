import { BreadCrumb } from 'primereact/breadcrumb';
import { TemplateType } from 'primereact/utils';
import classNames from 'classnames/bind';
import { NavLink, useLocation } from 'react-router-dom';
import { BreadcrumbData } from 'use-react-router-breadcrumbs';
import { MainHeader } from '../Header/MainHeader';

import styles from '../dashboard.module.scss';
import { useState } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import ContextContainer from '../../Layout/ContextContainer';
import { Main } from '../Main/Main';

const home = { icon: 'pi pi-home', url: '/dashboard' };
const cx = classNames.bind(styles);

interface InnerDashboardProps {
  breadcrumbs: BreadcrumbData<string>[];
  children?: React.ReactNode;
}

export const InnerDashboard: React.FC<InnerDashboardProps> = ({ children, breadcrumbs }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = () => setIsSidebarVisible((currentState) => !currentState);

  const location = useLocation();
  const hideBreadcrumbsPath = location.pathname === `/dashboard`;

  const crumbs = breadcrumbs.reduce((res: { url: string; template: TemplateType<any> }[] | undefined, { match }) => {
    if (!match || !match.route) return;

    if (!match.route.breadcrumb || !res) return res;

    const type = typeof match.route.breadcrumb;
    if (type === 'string')
      res.push({
        template: <NavLink to={match.pathname}>{match.route.breadcrumb as string}</NavLink>,
        url: match.pathname,
      });
    if (type === 'function') {
      const Component: React.FC = match.route.breadcrumb as React.FC;
      res.push({
        template: (
          <NavLink to={match.pathname}>
            <Component />
          </NavLink>
        ),
        url: match.pathname,
      });
    }

    return res;
  }, []);

  return (
    <>
      <MainHeader toggleSidebar={toggleSidebar}>{children}</MainHeader>
      <Sidebar isVisible={isSidebarVisible} setIsVisible={setIsSidebarVisible}>
        {children}
      </Sidebar>
      <ContextContainer classNames={cx('dashboard__content--student-context')}>
        <div className={cx('dashboard__content')}>
          {/* Hide breadcrumbs in dashboard */}
          {!hideBreadcrumbsPath && <BreadCrumb className={cx('dashboard__breadcrumbs')} model={crumbs} home={home} />}
          <Main />
        </div>
      </ContextContainer>
    </>
  );
};
