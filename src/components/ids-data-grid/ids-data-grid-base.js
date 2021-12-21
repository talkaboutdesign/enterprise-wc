import IdsElement from '../../core/ids-element';
import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin';
import IdsKeyboardMixin from '../../mixins/ids-keyboard-mixin/ids-keyboard-mixin';
import IdsLocaleMixin from '../../mixins/ids-locale-mixin/ids-locale-mixin';

const Base = IdsLocaleMixin(
  IdsKeyboardMixin(
    IdsThemeMixin(
      IdsEventsMixin(
        IdsElement
      )
    )
  )
);

export default Base;