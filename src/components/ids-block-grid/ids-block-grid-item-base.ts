import IdsElement from '../../core/ids-element.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsSelectionMixin from '../../mixins/ids-selection-mixin/ids-selection-mixin.ts';
import IdsKeyboardMixin from '../../mixins/ids-keyboard-mixin/ids-keyboard-mixin.ts';

const Base = IdsKeyboardMixin(
  IdsThemeMixin(
    IdsEventsMixin(
      IdsSelectionMixin(
        IdsElement
      )
    )
  )
);

export default Base;
