import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsDirtyTrackerMixin from '../../mixins/ids-dirty-tracker-mixin/ids-dirty-tracker-mixin.ts';
import IdsLabelStateMixin from '../../mixins/ids-label-state-mixin/ids-label-state-mixin.ts';
import IdsValidationMixin from '../../mixins/ids-validation-mixin/ids-validation-mixin.ts';
import IdsHitboxMixin from '../../mixins/ids-hitbox-mixin/ids-hitbox-mixin.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsLocaleMixin from '../../mixins/ids-locale-mixin/ids-locale-mixin.ts';
import IdsElement from '../../core/ids-element.ts';

const Base = IdsDirtyTrackerMixin(
  IdsLabelStateMixin(
    IdsValidationMixin(
      IdsHitboxMixin(
        IdsThemeMixin(
          IdsLocaleMixin(
            IdsEventsMixin(
              IdsElement
            )
          )
        )
      )
    )
  )
);

export default Base;
