import IdsKeyboardMixin from '../../mixins/ids-keyboard-mixin/ids-keyboard-mixin.ts';
import IdsElement from '../../core/ids-element.ts';
import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';

const Base = IdsKeyboardMixin(
  IdsEventsMixin(
    IdsElement
  )
);

export default Base;
