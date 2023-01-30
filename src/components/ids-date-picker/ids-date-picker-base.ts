import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsKeyboardMixin from '../../mixins/ids-keyboard-mixin/ids-keyboard-mixin.ts';
import IdsLabelStateParentMixin from '../../mixins/ids-label-state-mixin/ids-label-state-parent-mixin.ts';
import IdsDateAttributeMixin from '../../mixins/ids-date-attribute-mixin/ids-date-attribute-mixin.ts';
import IdsMonthViewAttributeMixin from '../ids-month-view/ids-month-view-attribute-mixin.ts';
import IdsDirtyTrackerMixin from '../../mixins/ids-dirty-tracker-mixin/ids-dirty-tracker-mixin.ts';
import IdsFieldHeightMixin from '../../mixins/ids-field-height-mixin/ids-field-height-mixin.ts';
import IdsColorVariantMixin from '../../mixins/ids-color-variant-mixin/ids-color-variant-mixin.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsLocaleMixin from '../../mixins/ids-locale-mixin/ids-locale-mixin.ts';
import IdsValidationInputMixin from '../../mixins/ids-validation-mixin/ids-validation-input-mixin.ts';
import IdsElement from '../../core/ids-element.ts';

const Base = IdsThemeMixin(
  IdsDirtyTrackerMixin(
    IdsLabelStateParentMixin(
      IdsFieldHeightMixin(
        IdsColorVariantMixin(
          IdsValidationInputMixin(
            IdsMonthViewAttributeMixin(
              IdsDateAttributeMixin(
                IdsLocaleMixin(
                  IdsKeyboardMixin(
                    IdsEventsMixin(
                      IdsElement
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  )
);

export default Base;
