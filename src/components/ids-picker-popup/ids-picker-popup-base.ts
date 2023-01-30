import IdsAttachmentMixin from '../../mixins/ids-attachment-mixin/ids-attachment-mixin.ts';
import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsPopupOpenEventsMixin from '../../mixins/ids-popup-open-events-mixin/ids-popup-open-events-mixin.ts';
import IdsPopupInteractionsMixin from '../../mixins/ids-popup-interactions-mixin/ids-popup-interactions-mixin.ts';
import IdsElement from '../../core/ids-element.ts';

const Base = IdsPopupOpenEventsMixin(
  IdsPopupInteractionsMixin(
    IdsEventsMixin(
      IdsAttachmentMixin(
        IdsElement
      )
    )
  )
);

export default Base;
