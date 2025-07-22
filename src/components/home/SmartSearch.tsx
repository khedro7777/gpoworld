import React, { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SmartSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

interface SearchFilters {
  query: string;
  gateway: string;
  groupType: string;
  country: string;
  platformService: string;
}

const SmartSearch: React.FC<SmartSearchProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    gateway: '',
    groupType: '',
    country: '',
    platformService: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const gateways = [
    { value: 'cooperative-purchasing', label: 'الشراء التعاوني' },
    { value: 'collaborative-marketing', label: 'التسويق التعاوني' },
    { value: 'suppliers', label: 'الموردين' },
    { value: 'freelancers', label: 'المستقلين' },
    { value: 'investment', label: 'الاستثمار' },
    { value: 'company-formation', label: 'تكوين الشركات' },
    { value: 'ai-agents', label: 'وكلاء الذكاء الاصطناعي' },
    { value: 'arbitration', label: 'التحكيم' }
  ];

  const groupTypes = [
    { value: 'seeking-members', label: 'تبحث عن أعضاء' },
    { value: 'seeking-suppliers', label: 'تبحث عن موردين' },
    { value: 'seeking-freelancers', label: 'تبحث عن مستقلين' },
    { value: 'closed', label: 'مغلقة' },
    { value: 'open', label: 'مفتوحة' }
  ];

  const countries = [
    { value: 'ps', label: 'فلسطين' },
    { value: 'eg', label: 'مصر' },
    { value: 'sa', label: 'السعودية' },
    { value: 'ae', label: 'الإمارات' },
    { value: 'jo', label: 'الأردن' },
    { value: 'lb', label: 'لبنان' },
    { value: 'sy', label: 'سوريا' },
    { value: 'iq', label: 'العراق' }
  ];

  const platformServices = [
    { value: 'negotiation', label: 'التفاوض الذكي' },
    { value: 'arbitration', label: 'التحكيم' },
    { value: 'documentation', label: 'التوثيق' },
    { value: 'ai-assistance', label: 'المساعدة الذكية' },
    { value: 'market-analysis', label: 'تحليل السوق' }
  ];

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const clearFilters = () => {
    const emptyFilters: SearchFilters = {
      query: '',
      gateway: '',
      groupType: '',
      country: '',
      platformService: ''
    };
    setFilters(emptyFilters);
    onSearch(emptyFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8" dir="rtl">
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-xl font-bold text-gray-900">البحث الذكي</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          فلاتر متقدمة
          <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Basic Search */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <Input
            placeholder="ابحث عن المجموعات، المنتجات، أو الخدمات..."
            value={filters.query}
            onChange={(e) => handleFilterChange('query', e.target.value)}
            className="text-right"
          />
        </div>
        <Button onClick={handleSearch} className="px-6">
          <Search className="w-4 h-4 ml-2" />
          بحث
        </Button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البوابة
            </label>
            <Select
              value={filters.gateway}
              onValueChange={(value) => handleFilterChange('gateway', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر البوابة" />
              </SelectTrigger>
              <SelectContent>
                {gateways.map((gateway) => (
                  <SelectItem key={gateway.value} value={gateway.value}>
                    {gateway.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نوع المجموعة
            </label>
            <Select
              value={filters.groupType}
              onValueChange={(value) => handleFilterChange('groupType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر النوع" />
              </SelectTrigger>
              <SelectContent>
                {groupTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الدولة
            </label>
            <Select
              value={filters.country}
              onValueChange={(value) => handleFilterChange('country', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الدولة" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              خدمات المنصة
            </label>
            <Select
              value={filters.platformService}
              onValueChange={(value) => handleFilterChange('platformService', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الخدمة" />
              </SelectTrigger>
              <SelectContent>
                {platformServices.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2 lg:col-span-4 flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={clearFilters}>
              مسح الفلاتر
            </Button>
            <Button onClick={handleSearch}>
              تطبيق الفلاتر
            </Button>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {(filters.gateway || filters.groupType || filters.country || filters.platformService) && (
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-sm text-gray-600">الفلاتر النشطة:</span>
          {filters.gateway && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {gateways.find(g => g.value === filters.gateway)?.label}
            </span>
          )}
          {filters.groupType && (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {groupTypes.find(t => t.value === filters.groupType)?.label}
            </span>
          )}
          {filters.country && (
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              {countries.find(c => c.value === filters.country)?.label}
            </span>
          )}
          {filters.platformService && (
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
              {platformServices.find(s => s.value === filters.platformService)?.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartSearch;

