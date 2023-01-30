import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsLocaleMixin from '../../mixins/ids-locale-mixin/ids-locale-mixin.ts';
import IdsElement from '../../core/ids-element.ts';

const Base = IdsLocaleMixin(
  IdsThemeMixin(
    IdsEventsMixin(
      IdsElement
    )
  )
);

export default Base;
