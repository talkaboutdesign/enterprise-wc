import IdsFieldHeightMixin from '../../mixins/ids-field-height-mixin/ids-field-height-mixin.ts';
import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsElement from '../../core/ids-element.ts';

const Base = IdsFieldHeightMixin(
  IdsEventsMixin(
    IdsElement
  )
);

export default Base;
