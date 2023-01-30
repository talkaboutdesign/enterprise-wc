import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsColorVariantMixin from '../../mixins/ids-color-variant-mixin/ids-color-variant-mixin.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsHitboxMixin from '../../mixins/ids-hitbox-mixin/ids-hitbox-mixin.ts';
import IdsElement from '../../core/ids-element.ts';

const Base = IdsHitboxMixin(
  IdsColorVariantMixin(
    IdsThemeMixin(
      IdsEventsMixin(
        IdsElement
      )
    )
  )
);

export default Base;
