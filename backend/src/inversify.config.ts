import { Container } from 'inversify';

const servicesContainer = new Container({
  skipBaseClassChecks: true,
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

export { servicesContainer };
