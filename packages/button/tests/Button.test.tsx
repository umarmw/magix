/* eslint-disable no-unused-vars, no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Button, { ButtonWrapper } from '../src/component/Button';
import ButtonData from '../content/Button.content';

describe('<Button />', () => {
  // Could not use beforeEach function here as the props needed for the component
  // inside each test are slightly different

  test('Render link if onClickAction is not set', () => {
    const props = { ...ButtonData };
    delete props.onClickAction;
    const component = mount(<Button {...props} />);
    expect(component.find('a')).toHaveLength(1);
  });

  test('Render button if onClickAction is set', () => {
    const component = shallow(
      <Button
        {...ButtonData}
        onClickAction={e => {
          e.preventDefault();
        }}
      />
    )
      .children()
      .first();
    expect(component.type()).toBe(ButtonWrapper);
  });

  test('Passing title props correctly', () => {
    const component = shallow(<Button {...ButtonData} />)
      .children()
      .first();
    expect(component.prop('title')).toEqual(ButtonData.title);
  });

  test('Passing label props correctly', () => {
    const linkComponent = shallow(<Button {...ButtonData} />)
      .children()
      .first();
    const buttonComponent = shallow(
      <Button
        {...ButtonData}
        onClickAction={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          console.log('Clicked');
        }}
      />
    );
    expect(linkComponent.text()).toEqual(ButtonData.label);
    expect(buttonComponent.text()).toEqual(ButtonData.label);
  });

  test('Passing size class correctly', () => {
    const linkComponent = shallow(<Button {...ButtonData} />)
      .children()
      .first();
    const buttonComponent = shallow(
      <Button
        {...ButtonData}
        onClickAction={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          console.log('Clicked');
        }}
      />
    )
      .children()
      .first();
    expect(linkComponent.hasClass('medium')).toBeTruthy();
    expect(buttonComponent.hasClass('medium')).toBeTruthy();
  });

  test('Passing style class correctly', () => {
    const linkComponent = shallow(<Button {...ButtonData} />)
      .children()
      .first();
    const buttonComponent = shallow(
      <Button
        {...ButtonData}
        onClickAction={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          console.log('Clicked');
        }}
      />
    )
      .children()
      .first();
    expect(linkComponent.hasClass('primary-orange')).toBeTruthy();
    expect(buttonComponent.hasClass('primary-orange')).toBeTruthy();
  });

  test('Passing additional class correctly', () => {
    const linkComponent = shallow(<Button {...ButtonData} />)
      .children()
      .first();
    const buttonComponent = shallow(
      <Button
        {...ButtonData}
        onClickAction={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          console.log('Clicked');
        }}
      />
    )
      .children()
      .first();
    expect(linkComponent.hasClass('otherClass')).toBeTruthy();
    expect(buttonComponent.hasClass('otherClass')).toBeTruthy();
  });

  test('Passing icon props correctly', () => {
    const linkComponent = shallow(<Button {...ButtonData} />)
      .children()
      .first();
    const buttonComponent = shallow(
      <Button
        {...ButtonData}
        onClickAction={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          console.log('Clicked');
        }}
      />
    );
    const linkIconComponent = linkComponent.findWhere(
      e =>
        e.type() === 'img' && e.prop('src') === ButtonData.icon?.image && e.prop('alt') === ButtonData.icon?.description
    );
    const buttonIconComponent = buttonComponent.findWhere(
      e =>
        e.type() === 'img' && e.prop('src') === ButtonData.icon?.image && e.prop('alt') === ButtonData.icon?.description
    );
    expect(linkIconComponent).toHaveLength(1);
    expect(buttonIconComponent).toHaveLength(1);
  });

  test('Not render icon when not set', () => {
    const props = { ...ButtonData };
    delete props.icon;
    const linkComponent = shallow(<Button {...props} />);
    const buttonComponent = shallow(
      <Button
        {...props}
        onClickAction={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          console.log('Clicked');
        }}
      />
    );
    const linkIconComponent = linkComponent.find('.btn__icon');
    const buttonIconComponent = buttonComponent.find('.btn__icon');
    expect(linkIconComponent).toHaveLength(0);
    expect(buttonIconComponent).toHaveLength(0);
  });

  test('Passing url props correctly if set', () => {
    const props = { ...ButtonData };
    delete props.onClickAction;
    const component = mount(<Button {...props} />);
    const link = component.find('a').first();
    expect(link).toHaveLength(1);
    expect(link.prop('href')).toEqual(ButtonData.url);
  });

  test('Open in the same window when openInNewWindow is set to false', () => {
    const props = { ...ButtonData };
    delete props.onClickAction;
    const component = mount(<Button {...props} openInNewWindow={false} />);
    const link = component.find('a').first();
    expect(link).toHaveLength(1);
    expect(link.prop('target')).toEqual('_self');
    expect(true).toBeTruthy();
  });

  test('Open new window when openInNewWindow is set to true', () => {
    const props = { ...ButtonData };
    delete props.onClickAction;
    const component = mount(<Button {...props} />);
    const link = component.find('a').first();
    expect(link).toHaveLength(1);
    expect(link.prop('target')).toEqual('_blank');
  });

  test('Execute onClickAction when passed', () => {
    let number = 0;
    const onClickAction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (e) {
        e.preventDefault();
      }
      number += 1;
    };
    const component = shallow(<Button {...ButtonData} onClickAction={onClickAction} />)
      .children()
      .first();
    component.simulate('click');
    expect(number).toBe(1);
  });

  test('matches snapshot', () => {
    const props = { ...ButtonData };
    delete props.onClickAction;
    const component = mount(<Button {...props} />);
    expect(component).toMatchSnapshot();
  });
});
/* eslint-disable no-unused-vars, no-undef */
