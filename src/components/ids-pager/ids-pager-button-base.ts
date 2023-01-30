import IdsLocaleMixin from '../../mixins/ids-locale-mixin/ids-locale-mixin.ts';
import IdsTooltipMixin from '../../mixins/ids-tooltip-mixin/ids-tooltip-mixin.ts';
import IdsElement from '../../core/ids-element.ts';
import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';

const Base = IdsLocaleMixin(
  IdsTooltipMixin(
    IdsEventsMixin(
      IdsElement
    )
  )
);

export default Base;
