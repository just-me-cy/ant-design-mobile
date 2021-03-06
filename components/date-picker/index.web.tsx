/* eslint no-console:0 */
import React from 'react';
import PopupDatePicker from 'rmc-date-picker/lib/Popup';
import RCDatePicker from 'rmc-date-picker/lib/DatePicker';
import { formatFn, getProps } from './utils';
import assign from 'object-assign';
import tsPropsType from './PropsType';
import { getComponentLocale, getLocaleCode } from '../_util/getLocale';

function getDefaultProps() {
  return assign({
    prefixCls: 'am-picker',
    pickerPrefixCls: 'am-picker-col',
    popupPrefixCls: 'am-picker-popup',
  }, getProps());
}

export default class DatePicker extends React.Component<tsPropsType, any> {
  static defaultProps = getDefaultProps();

  static contextTypes = {
    antLocale: React.PropTypes.object,
  };

  render() {
    const { props, context } = this;
    const { children, value, defaultDate, extra, popupPrefixCls } = props;

    const locale = getComponentLocale(props, context, 'DatePicker', () => require('./locale/zh_CN'));
    const localeCode = getLocaleCode(context);
    const { okText, dismissText, DatePickerLocale } = locale;

    if (localeCode) {
      if (value) {
        value.locale(localeCode);
      }
      if (defaultDate) {
        defaultDate.locale(localeCode);
      }
    }

    const dataPicker = (
      <RCDatePicker
        locale={DatePickerLocale}
        minDate={props.minDate}
        maxDate={props.maxDate}
        mode={props.mode}
        pickerPrefixCls={props.pickerPrefixCls}
        prefixCls={props.prefixCls}
        defaultDate={value || defaultDate}
      />
    );
    return (
      <PopupDatePicker
        datePicker={dataPicker}
        WrapComponent="div"
        transitionName="am-slide-up"
        maskTransitionName="am-fade"
        {...props}
        prefixCls={popupPrefixCls}
        date={value || defaultDate}
        dismissText={dismissText}
        okText={okText}
      >
        {children && React.cloneElement(children, { extra: value ? formatFn(this, value) : extra })}
      </PopupDatePicker>
    );
  }
}
