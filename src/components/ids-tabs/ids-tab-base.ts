import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsColorVariantMixin from '../../mixins/ids-color-variant-mixin/ids-color-variant-mixin.ts';
import IdsOrientationMixin from '../../mixins/ids-orientation-mixin/ids-orientation-mixin.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsHideFocusMixin from '../../mixins/ids-hide-focus-mixin/ids-hide-focus-mixin.ts';
import IdsElement from '../../core/ids-element.ts';

const Base = IdsColorVariantMixin(
  IdsOrientationMixin(
    IdsThemeMixin(
      IdsHideFocusMixin(
        IdsEventsMixin(
          IdsElement
        )
      )
    )
  )
);

export default Base;
