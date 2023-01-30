import IdsElement from '../../core/ids-element.ts';
import IdsPagerMixin from '../../mixins/ids-pager-mixin/ids-pager-mixin.ts';
import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';

const Base = IdsPagerMixin(
  IdsEventsMixin(
    IdsElement
  )
);

export default Base;
