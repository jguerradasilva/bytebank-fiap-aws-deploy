import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LanguageIcon from '@mui/icons-material/Language';

export function getIconComponent(iconName: string) {
  switch (iconName) {
    case 'AttachMoneyIcon':
      return AttachMoneyIcon;
    case 'StorefrontIcon':
      return StorefrontIcon;
    case 'LanguageIcon':
      return LanguageIcon;
    default:
      return AttachMoneyIcon;
  }
}
