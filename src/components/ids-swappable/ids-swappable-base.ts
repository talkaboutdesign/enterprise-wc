import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsKeyboardMixin from '../../mixins/ids-keyboard-mixin/ids-keyboard-mixin.ts';
import IdsLocaleMixin from '../../mixins/ids-locale-mixin/ids-locale-mixin.ts';
import IdsSelectionMixin from '../../mixins/ids-selection-mixin/ids-selection-mixin.ts';
import IdsElement from '../../core/ids-element.ts';

const Base = IdsThemeMixin(
  IdsKeyboardMixin(
    IdsLocaleMixin(
      IdsEventsMixin(
        IdsSelectionMixin(
          IdsElement
        )
      )
    )
  )
);

export default Base;
