import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsLocaleMixin from '../../mixins/ids-locale-mixin/ids-locale-mixin.ts';
import IdsElement from '../../core/ids-element.ts';
import IdsCalendarEventsMixin from '../../mixins/ids-calendar-events-mixin/ids-calendar-events-mixin.ts';
import IdsDateAttributeMixin from '../../mixins/ids-date-attribute-mixin/ids-date-attribute-mixin.ts';

const Base = IdsThemeMixin(
  IdsDateAttributeMixin(
    IdsCalendarEventsMixin(
      IdsLocaleMixin(
        IdsEventsMixin(
          IdsElement
        )
      )
    )
  )
);

export default Base;
