import '../ids-card.ts';
import '../ids-card-action.ts';
import '../../ids-image/ids-image.ts';
import '../../ids-menu-button/ids-menu-button.ts';
import '../../ids-popup-menu/ids-popup-menu.ts';
import '../../ids-popup/ids-popup.ts';
import '../../ids-menu/ids-menu-item.ts';
import '../../ids-menu/ids-menu-group.ts';
import avatarPlaceholder from '../../../assets/images/10.jpg.ts';

document.querySelectorAll('ids-image').forEach((image: any) => {
  image.src = avatarPlaceholder;
});
