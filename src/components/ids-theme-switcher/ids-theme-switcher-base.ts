import IdsColorVariantMixin from '../../mixins/ids-color-variant-mixin/ids-color-variant-mixin.ts';
import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsLocaleMixin from '../../mixins/ids-locale-mixin/ids-locale-mixin.ts';
import IdsElement from '../../core/ids-element.ts';

const Base = IdsLocaleMixin(
  IdsColorVariantMixin(
    IdsEventsMixin(
      IdsElement
    )
  )
);

export default Base;
