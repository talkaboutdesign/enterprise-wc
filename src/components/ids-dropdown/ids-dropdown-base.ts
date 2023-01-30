import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsKeyboardMixin from '../../mixins/ids-keyboard-mixin/ids-keyboard-mixin.ts';
import IdsPopupOpenEventsMixin from '../../mixins/ids-popup-open-events-mixin/ids-popup-open-events-mixin.ts';
import IdsFieldHeightMixin from '../../mixins/ids-field-height-mixin/ids-field-height-mixin.ts';
import IdsColorVariantMixin from '../../mixins/ids-color-variant-mixin/ids-color-variant-mixin.ts';
import IdsTooltipMixin from '../../mixins/ids-tooltip-mixin/ids-tooltip-mixin.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsLocaleMixin from '../../mixins/ids-locale-mixin/ids-locale-mixin.ts';
import IdsDirtyTrackerMixin from '../../mixins/ids-dirty-tracker-mixin/ids-dirty-tracker-mixin.ts';
import IdsElement from '../../core/ids-element.ts';
import IdsValidationInputMixin from '../../mixins/ids-validation-mixin/ids-validation-input-mixin.ts';
import IdsLabelStateParentMixin from '../../mixins/ids-label-state-mixin/ids-label-state-parent-mixin.ts';
import IdsXssMixin from '../../mixins/ids-xss-mixin/ids-xss-mixin.ts';

const Base = IdsThemeMixin(
  IdsDirtyTrackerMixin(
    IdsValidationInputMixin(
      IdsLabelStateParentMixin(
        IdsFieldHeightMixin(
          IdsColorVariantMixin(
            IdsPopupOpenEventsMixin(
              IdsTooltipMixin(
                IdsXssMixin(
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
  )
);

export default Base;
