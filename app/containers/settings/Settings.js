import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Layout from '../MainLayout';
import SettingsLayout from '../../components/settings/SettingsLayout';
import SettingsMenu from '../../components/settings/menu/SettingsMenu';
import { buildRoute } from '../../lib/routing-helpers';
import type { InjectedContainerProps } from '../../types/injectedPropsType';


@inject('stores', 'actions') @observer
export default class Settings extends Component {

  static defaultProps = { actions: null, stores: null };
  props: InjectedContainerProps;

  isActivePage = (route: string) => {
    const { location } = this.props.stores.router;
    if (location) {
      return location.pathname === buildRoute(route);
    }
    return false;
  };

  render() {
    const { actions, children } = this.props;
    const menu = (
      <SettingsMenu
        onItemClick={(route) => actions.router.goToRoute.trigger({ route })}
        isActiveItem={this.isActivePage}
      />
    );
    return (
      <Layout>
        <SettingsLayout menu={menu}>
          {children}
        </SettingsLayout>
      </Layout>
    );
  }
}
