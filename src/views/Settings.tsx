import { setSettingsPage } from '../actions/session';
import EmptyPlaceholder from '../controls/EmptyPlaceholder';
import { PropsCallback } from '../types/IExtensionContext';
import { IState } from '../types/IState';
import { ComponentEx, connect, extend, translate } from '../util/ComponentEx';

import MainPage from './MainPage';

import * as React from 'react';
import { Panel, Tab, Tabs } from 'react-bootstrap';
import * as Redux from 'redux';

interface ISettingsPage {
  title: string;
  component: React.ComponentClass<any>;
  props: PropsCallback;
  visible: () => boolean;
}

interface ICombinedSettingsPage {
  title: string;
  elements: ISettingsPage[];
}

interface ISettingsProps {
  objects: ISettingsPage[];
}

interface IConnectedProps {
  settingsPage: string;
}

interface IActionProps {
  onSetPage: (page: string) => void;
}

type IProps = ISettingsProps & IConnectedProps & IActionProps;

/**
 * settings dialog
 *
 * @class Settings
 * @extends {ComponentEx<ISettingsProps, {}>}
 */
class Settings extends ComponentEx<IProps, {}> {
  public render(): JSX.Element {
    const { settingsPage, objects } = this.props;

    const combined = objects.reduce((prev: ICombinedSettingsPage[], current: ISettingsPage) => {
      const result = prev.slice();
      const existingPage = prev.find((ele: ICombinedSettingsPage) => ele.title === current.title);
      if (existingPage === undefined) {
        result.push({ title: current.title, elements: [ current ] });
      } else {
        existingPage.elements.push(current);
      }
      return result;
    }, []);

    const page = combined.find(iter => iter.title === settingsPage) !== undefined
      ? settingsPage : combined[0].title;

    return (
      <MainPage>
        <MainPage.Body>
          <Tabs id='settings-tab' activeKey={page} onSelect={this.setCurrentPage}>
            {combined.map(this.renderTab)}
          </Tabs>
        </MainPage.Body>
      </MainPage>
    );
  }

  private renderTab = (page: ICombinedSettingsPage): JSX.Element => {
    const { t } = this.props;

    const elements = page.elements.filter(ele => (ele.visible === undefined) || ele.visible());

    const content = (elements.length > 0)
      ? (
        <div>
          {elements.map(this.renderTabElement)}
        </div>
      ) : (
        <EmptyPlaceholder
          icon='settings'
          text={t('Nothing to configure.')}
          subtext={t('Other games may require settings here.')}
        />
      );

    return (
      <Tab key={page.title} eventKey={page.title} title={t(page.title)}>
        {content}
      </Tab>
    );
  }

  private renderTabElement = (page: ISettingsPage, idx: number): JSX.Element => {
    const props = page.props !== undefined ? page.props() : {};
    const PanelX: any = Panel;
    return (
      <Panel key={idx}>
        <PanelX.Body>
        {idx !== 0 ? <hr style={{ marginTop: 0 }} /> : null}
        <page.component {...props} />
        </PanelX.Body>
      </Panel>
    );
  }

  private setCurrentPage = (page) => {
    this.props.onSetPage(page);
  }
}

function registerSettings(instanceGroup: undefined,
                          title: string,
                          component: React.ComponentClass<any>,
                          props: PropsCallback,
                          visible: () => boolean): ISettingsPage {
  return { title, component, props, visible };
}

function mapStateToProps(state: IState): IConnectedProps {
  return {
    settingsPage: state.session.base.settingsPage,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>): IActionProps {
  return {
    onSetPage: (title: string) => dispatch(setSettingsPage(title)),
  };
}

export default
  translate(['common'], { wait: false })(
    connect(mapStateToProps, mapDispatchToProps)(
      extend(registerSettings)(
        Settings))) as React.ComponentClass<{}>;
