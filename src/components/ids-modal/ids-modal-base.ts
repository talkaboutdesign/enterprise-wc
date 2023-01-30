import IdsBreakpointMixin from '../../mixins/ids-breakpoint-mixin/ids-breakpoint-mixin.ts';
import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsFocusCaptureMixin from '../../mixins/ids-focus-capture-mixin/ids-focus-capture-mixin.ts';
import IdsKeyboardMixin from '../../mixins/ids-keyboard-mixin/ids-keyboard-mixin.ts';
import IdsPopupInteractionsMixin from '../../mixins/ids-popup-interactions-mixin/ids-popup-interactions-mixin.ts';
import IdsPopupOpenEventsMixin from '../../mixins/ids-popup-open-events-mixin/ids-popup-open-events-mixin.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsXssMixin from '../../mixins/ids-xss-mixin/ids-xss-mixin.ts';
import IdsElement from '../../core/ids-element.ts';

const Base = IdsXssMixin(
  IdsBreakpointMixin(
    IdsFocusCaptureMixin(
      IdsKeyboardMixin(
        IdsPopupInteractionsMixin(
          IdsPopupOpenEventsMixin(
            IdsThemeMixin(
              IdsEventsMixin(
                IdsElement
              )
            )
          )
        )
      )
    )
  )
);

export default Base;
