import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsColorVariantMixin from '../../mixins/ids-color-variant-mixin/ids-color-variant-mixin.ts';
import IdsLocaleMixin from '../../mixins/ids-locale-mixin/ids-locale-mixin.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsTooltipMixin from '../../mixins/ids-tooltip-mixin/ids-tooltip-mixin.ts';
import IdsRippleMixin from '../../mixins/ids-ripple-mixin/ids-ripple-mixin.ts';
import IdsHideFocusMixin from '../../mixins/ids-hide-focus-mixin/ids-hide-focus-mixin.ts';
import IdsElement from '../../core/ids-element.ts';

const Base = IdsTooltipMixin(
  IdsThemeMixin(
    IdsLocaleMixin(
      IdsRippleMixin(
        IdsColorVariantMixin(
          IdsHideFocusMixin(
            IdsEventsMixin(
              IdsElement
            )
          )
        )
      )
    )
  )
);

export default Base;
