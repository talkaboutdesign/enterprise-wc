import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsKeyboardMixin from '../../mixins/ids-keyboard-mixin/ids-keyboard-mixin.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsHeader from '../ids-header/ids-header.ts';

const Base = IdsThemeMixin(
  IdsKeyboardMixin(
    IdsEventsMixin(
      IdsHeader
    )
  )
);

export default Base;
