import IdsKeyboardMixin from '../../mixins/ids-keyboard-mixin/ids-keyboard-mixin.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsElement from '../../core/ids-element.ts';
import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';

const Base = IdsKeyboardMixin(
  IdsThemeMixin(
    IdsEventsMixin(
      IdsElement
    )
  )
);

export default Base;
