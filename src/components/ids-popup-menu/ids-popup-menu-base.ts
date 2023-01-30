import IdsAttachmentMixin from '../../mixins/ids-attachment-mixin/ids-attachment-mixin.ts';
import IdsPopupOpenEventsMixin from '../../mixins/ids-popup-open-events-mixin/ids-popup-open-events-mixin.ts';
import IdsPopupInteractionsMixin from '../../mixins/ids-popup-interactions-mixin/ids-popup-interactions-mixin.ts';
import IdsMenu from '../ids-menu/ids-menu.ts';

const Base = IdsPopupOpenEventsMixin(
  IdsPopupInteractionsMixin(
    IdsAttachmentMixin(
      IdsMenu
    )
  )
);

export default Base;
