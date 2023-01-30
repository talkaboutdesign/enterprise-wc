import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsColorVariantMixin from '../../mixins/ids-color-variant-mixin/ids-color-variant-mixin.ts';
import IdsElement from '../../core/ids-element.ts';

const Base = IdsColorVariantMixin(
  IdsThemeMixin(
    IdsEventsMixin(
      IdsElement
    )
  )
);

export interface IdsHierarchyItemInfo {
  id: string;
  name: string;
  position: string;
  employmentType: string;
  parentItem: string;
  isLeaf: boolean;
  color: string;
  picture?: string;
}

export default Base;
