import IdsColorVariantMixin from '../../mixins/ids-color-variant-mixin/ids-color-variant-mixin.ts';
import IdsLocaleMixin from '../../mixins/ids-locale-mixin/ids-locale-mixin.ts';
import IdsTooltipMixin from '../../mixins/ids-tooltip-mixin/ids-tooltip-mixin.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsElement from '../../core/ids-element.ts';

const Base = IdsColorVariantMixin(
  IdsLocaleMixin(
    IdsTooltipMixin(
      IdsThemeMixin(
        IdsEventsMixin(
          IdsElement
        )
      )
    )
  )
);

export default Base;
