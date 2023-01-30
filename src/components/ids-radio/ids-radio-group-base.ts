import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsDirtyTrackerMixin from '../../mixins/ids-dirty-tracker-mixin/ids-dirty-tracker-mixin.ts';
import IdsLocaleMixin from '../../mixins/ids-locale-mixin/ids-locale-mixin.ts';
import IdsValidationMixin from '../../mixins/ids-validation-mixin/ids-validation-mixin.ts';
import IdsElement from '../../core/ids-element.ts';

const Base = IdsValidationMixin(
  IdsDirtyTrackerMixin(
    IdsLocaleMixin(
      IdsEventsMixin(
        IdsElement
      )
    )
  )
);

export default Base;
