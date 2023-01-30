import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsLocaleMixin from '../../mixins/ids-locale-mixin/ids-locale-mixin.ts';
import IdsElement from '../../core/ids-element.ts';

const Base = IdsLocaleMixin(
  IdsEventsMixin(
    IdsElement
  )
);

export default Base;
