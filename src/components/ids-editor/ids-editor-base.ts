import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsLocaleMixin from '../../mixins/ids-locale-mixin/ids-locale-mixin.ts';
import IdsLabelStateMixin from '../../mixins/ids-label-state-mixin/ids-label-state-mixin.ts';
import IdsDirtyTrackerMixin from '../../mixins/ids-dirty-tracker-mixin/ids-dirty-tracker-mixin.ts';
import IdsValidationMixin from '../../mixins/ids-validation-mixin/ids-validation-mixin.ts';
import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsElement from '../../core/ids-element.ts';

const Base = IdsThemeMixin(
  IdsValidationMixin(
    IdsLabelStateMixin(
      IdsDirtyTrackerMixin(
        IdsLocaleMixin(
          IdsEventsMixin(
            IdsElement
          )
        )
      )
    )
  )
);

export default Base;
