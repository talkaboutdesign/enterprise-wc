import IdsMonthViewAttributeMixin from '../ids-month-view/ids-month-view-attribute-mixin.ts';
import IdsDateAttributeMixin from '../../mixins/ids-date-attribute-mixin/ids-date-attribute-mixin.ts';
import IdsLocaleMixin from '../../mixins/ids-locale-mixin/ids-locale-mixin.ts';
import IdsPickerPopup from '../ids-picker-popup/ids-picker-popup.ts';

const Base = IdsMonthViewAttributeMixin(
  IdsDateAttributeMixin(
    IdsLocaleMixin(
      IdsPickerPopup
    )
  )
);

export default Base;
