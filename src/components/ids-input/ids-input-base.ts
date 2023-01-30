import IdsLocaleMixin from '../../mixins/ids-locale-mixin/ids-locale-mixin.ts';
import IdsKeyboardMixin from '../../mixins/ids-keyboard-mixin/ids-keyboard-mixin.ts';
import IdsDirtyTrackerMixin from '../../mixins/ids-dirty-tracker-mixin/ids-dirty-tracker-mixin.ts';
import IdsClearableMixin from '../../mixins/ids-clearable-mixin/ids-clearable-mixin.ts';
import IdsColorVariantMixin from '../../mixins/ids-color-variant-mixin/ids-color-variant-mixin.ts';
import IdsFieldHeightMixin from '../../mixins/ids-field-height-mixin/ids-field-height-mixin.ts';
import IdsLabelStateMixin from '../../mixins/ids-label-state-mixin/ids-label-state-mixin.ts';
import IdsMaskMixin from '../../mixins/ids-mask-mixin/ids-mask-mixin.ts';
import IdsValidationMixin from '../../mixins/ids-validation-mixin/ids-validation-mixin.ts';
import IdsTooltipMixin from '../../mixins/ids-tooltip-mixin/ids-tooltip-mixin.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsAutoComplete from './ids-autocomplete.ts';
import IdsElement from '../../core/ids-element.ts';

const Base = IdsTooltipMixin(
  IdsLabelStateMixin(
    IdsAutoComplete(
      IdsFieldHeightMixin(
        IdsDirtyTrackerMixin(
          IdsClearableMixin(
            IdsColorVariantMixin(
              IdsThemeMixin(
                IdsMaskMixin(
                  IdsValidationMixin(
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
  )
);

export default Base;
