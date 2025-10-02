import { useAuth } from '@/contexts/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Building2 } from 'lucide-react';

export const OrgSwitcher = () => {
  const { currentOrg, organizations, switchOrg } = useAuth();

  if (organizations.length <= 1) return null;

  return (
    <div className="px-4 pb-4">
      <Select value={currentOrg?.id} onValueChange={switchOrg}>
        <SelectTrigger className="w-full bg-background/50 border-border/50">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <SelectValue placeholder="Select organization" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {organizations.map((org) => (
            <SelectItem key={org.id} value={org.id}>
              {org.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
