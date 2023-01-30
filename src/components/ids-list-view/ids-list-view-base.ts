import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsKeyboardMixin from '../../mixins/ids-keyboard-mixin/ids-keyboard-mixin.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsLocaleMixin from '../../mixins/ids-locale-mixin/ids-locale-mixin.ts';
import IdsElement from '../../core/ids-element.ts';
import IdsPagerMixin from '../../mixins/ids-pager-mixin/ids-pager-mixin.ts';

const Base = IdsLocaleMixin(
  IdsThemeMixin(
    IdsPagerMixin(
      IdsKeyboardMixin(
        IdsEventsMixin(
          IdsElement
        )
      )
    )
  )
);

export default Base;
