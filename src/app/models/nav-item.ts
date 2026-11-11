export interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: number | string;
  badgeType?: 'check' | 'count';
}
