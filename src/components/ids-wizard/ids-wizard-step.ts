import { customElement } from '../../core/ids-decorators.ts';
import Base from './ids-wizard-step-base.ts';

// Note: this component is only used to count steps
// and retrieve attributes via parent for markup for
// simplicity sake and does not actually render it's own markup

/**
 * IDS WizardStep Component
 * @type {IdsWizardStep}
 * @inherits IdsElement
 */
@customElement('ids-wizard-step')
export default class IdsWizardStep extends Base {}
