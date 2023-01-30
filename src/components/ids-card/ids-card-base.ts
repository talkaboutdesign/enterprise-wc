import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsSelectionMixin from '../../mixins/ids-selection-mixin/ids-selection-mixin.ts';
import IdsElement from '../../core/ids-element.ts';
import IdsRippleMixin from '../../mixins/ids-ripple-mixin/ids-ripple-mixin.ts';

const Base = IdsThemeMixin(
  IdsRippleMixin(
    IdsEventsMixin(
      IdsSelectionMixin(
        IdsElement
      )
    )
  )
);

export default Base;
