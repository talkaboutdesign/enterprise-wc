import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsElement from '../../core/ids-element.ts';
import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';

const Base = IdsThemeMixin(
  IdsEventsMixin(
    IdsElement
  )
);

export default Base;
