import IdsChartLegendMixin from '../../mixins/ids-chart-legend-mixin/ids-chart-legend-mixin.ts';
import IdsChartSelectionMixin from '../../mixins/ids-chart-selection-mixin/ids-chart-selection-mixin.ts';
import IdsLocaleMixin from '../../mixins/ids-locale-mixin/ids-locale-mixin.ts';
import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin.ts';
import IdsThemeMixin from '../../mixins/ids-theme-mixin/ids-theme-mixin.ts';
import IdsElement from '../../core/ids-element.ts';

const Base = IdsChartLegendMixin(
  IdsChartSelectionMixin(
    IdsThemeMixin(
      IdsLocaleMixin(
        IdsEventsMixin(
          IdsElement
        )
      )
    )
  )
);

export default Base;
