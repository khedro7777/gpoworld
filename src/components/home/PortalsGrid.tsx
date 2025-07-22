
import React from 'react';
import PortalCard from '../gateways/PortalCard';
import { 
  ShoppingCart, 
  Megaphone, 
  Building2, 
  TrendingUp, 
  Truck, 
  User, 
  Users, 
  Wrench, 
  Package, 
  Gavel, 
  FileText, 
  Handshake,
  Bot,
  MessageSquare
} from 'lucide-react';

interface SearchFilters {
  query: string;
  gateway: string;
  groupType: string;
  country: string;
  platformService: string;
}

interface PortalsGridProps {
  searchFilters?: SearchFilters;
}

const PortalsGrid: React.FC<PortalsGridProps> = ({ searchFilters }) => {
  const portals = [
    {
      id: 'cooperative-purchasing',
      title: 'الشراء التعاوني',
      description: 'انضم لمجموعات الشراء للحصول على أفضل الأسعار',
      icon: ShoppingCart,
      route: '/create-group',
      kycRequired: true,
      pointsRequired: true,
      activeGroups: [
        {
          id: '1',
          name: 'مجموعة شراء الأجهزة الإلكترونية',
          description: 'نبحث عن موردين للأجهزة الإلكترونية بأسعار الجملة',
          phase: 'التكوين',
          memberCount: 12,
          maxMembers: 50,
          status: 'البحث عن أعضاء',
          rating: 4.5,
          category: 'إلكترونيات'
        },
        {
          id: '2',
          name: 'مجموعة شراء المواد الخام',
          description: 'شراء المواد الخام للصناعات الصغيرة',
          phase: 'نشط',
          memberCount: 25,
          maxMembers: 30,
          status: 'انتظار العرض',
          rating: 4.2,
          category: 'مواد خام'
        }
      ]
    },
    {
      id: 'cooperative-marketing',
      title: 'التسويق التعاوني',
      description: 'تعاون في الحملات التسويقية لتقليل التكاليف',
      icon: Megaphone,
      route: '/marketing',
      kycRequired: true,
      pointsRequired: true,
      activeGroups: [
        {
          id: '3',
          name: 'حملة تسويق للمنتجات المحلية',
          description: 'حملة تسويقية مشتركة للمنتجات المحلية',
          phase: 'التفاوض',
          memberCount: 8,
          status: 'قيد التفاوض',
          rating: 4.7,
          category: 'تسويق'
        }
      ]
    },
    {
      id: 'company-formation',
      title: 'تكوين الشركات',
      description: 'أسس شركتك مع شركاء أو بشكل فردي',
      icon: Building2,
      route: '/company-formation',
      activeGroups: [
        {
          id: '4',
          name: 'تأسيس شركة تكنولوجيا',
          description: 'تأسيس شركة تكنولوجيا مع شركاء',
          phase: 'التكوين',
          memberCount: 3,
          maxMembers: 5,
          status: 'البحث عن أعضاء',
          rating: 4.3,
          category: 'تكنولوجيا'
        }
      ]
    },
    {
      id: 'investment-groups',
      title: 'مجموعات الاستثمار',
      description: 'استثمر مع آخرين في مشاريع واعدة',
      icon: TrendingUp,
      route: '/investment',
      kycRequired: true,
      pointsRequired: true,
      activeGroups: [
        {
          id: '5',
          name: 'استثمار في العقارات',
          description: 'استثمار جماعي في المشاريع العقارية',
          phase: 'نشط',
          memberCount: 15,
          status: 'قيد التفاوض',
          rating: 4.6,
          category: 'عقارات'
        },
        {
          id: '6',
          name: 'استثمار في الذكاء الاصطناعي',
          description: 'استثمار في شركات الذكاء الاصطناعي الناشئة',
          phase: 'التكوين',
          memberCount: 7,
          maxMembers: 20,
          status: 'البحث عن أعضاء',
          rating: 4.8,
          category: 'تكنولوجيا'
        }
      ]
    },
    {
      id: 'suppliers',
      title: 'الموردين',
      description: 'اعثر على موردين معتمدين وموثوقين',
      icon: Truck,
      route: '/suppliers',
      kycRequired: true,
      pointsRequired: true,
      activeGroups: [
        {
          id: '7',
          name: 'موردي المواد الغذائية',
          description: 'شبكة موردين للمواد الغذائية العضوية',
          phase: 'نشط',
          memberCount: 20,
          status: 'نشط',
          rating: 4.4,
          category: 'مواد غذائية'
        }
      ]
    },
    {
      id: 'freelancers',
      title: 'المستقلين',
      description: 'اعثر على أفضل المواهب المستقلة',
      icon: User,
      route: '/freelancer-dashboard',
      mcpExam: true,
      activeGroups: [
        {
          id: '8',
          name: 'مجموعة المطورين',
          description: 'شبكة من المطورين المحترفين',
          phase: 'نشط',
          memberCount: 45,
          status: 'نشط',
          rating: 4.9,
          category: 'تطوير'
        },
        {
          id: '9',
          name: 'مجموعة المصممين',
          description: 'شبكة من المصممين المبدعين',
          phase: 'نشط',
          memberCount: 32,
          status: 'نشط',
          rating: 4.7,
          category: 'تصميم'
        }
      ]
    },
    {
      id: 'freelancer-groups',
      title: 'مجموعات المستقلين',
      description: 'انضم لمجموعات المستقلين لمشاريع أكبر',
      icon: Users,
      route: '/freelancer-groups',
      mcpExam: true,
      activeGroups: [
        {
          id: '10',
          name: 'مجموعة تطوير التطبيقات',
          description: 'فريق لتطوير التطبيقات المتكاملة',
          phase: 'نشط',
          memberCount: 8,
          maxMembers: 10,
          status: 'البحث عن أعضاء',
          rating: 4.8,
          category: 'تطوير'
        }
      ]
    },
    {
      id: 'service-providers',
      title: 'مقدمي الخدمات',
      description: 'اعثر على مقدمي الخدمات المحترفين',
      icon: Wrench,
      route: '/services',
      activeGroups: [
        {
          id: '11',
          name: 'خدمات الاستشارات القانونية',
          description: 'شبكة من المحامين والمستشارين القانونيين',
          phase: 'نشط',
          memberCount: 15,
          status: 'نشط',
          rating: 4.6,
          category: 'قانوني'
        }
      ]
    },
    {
      id: 'product-listings',
      title: 'عرض المنتجات',
      description: 'اعرض منتجاتك للبيع أو الشراء',
      icon: Package,
      route: '/products',
      activeGroups: [
        {
          id: '12',
          name: 'منتجات الحرف اليدوية',
          description: 'منصة لعرض الحرف اليدوية المحلية',
          phase: 'نشط',
          memberCount: 30,
          status: 'نشط',
          rating: 4.5,
          category: 'حرف يدوية'
        }
      ]
    },
    {
      id: 'arbitration-documentation',
      title: 'التحكيم والتوثيق',
      description: 'خدمات التحكيم والتوثيق القانوني',
      icon: Gavel,
      route: '/arbitration',
      activeGroups: [
        {
          id: '13',
          name: 'قضايا التحكيم التجاري',
          description: 'حل النزاعات التجارية بالتحكيم',
          phase: 'نشط',
          memberCount: 5,
          status: 'نشط',
          rating: 4.9,
          category: 'قانوني'
        }
      ]
    },
    {
      id: 'arbitration-requests',
      title: 'طلبات التحكيم',
      description: 'قدم طلب تحكيم لحل النزاعات',
      icon: FileText,
      route: '/arbitration-requests',
      activeGroups: [
        {
          id: '14',
          name: 'طلبات التحكيم العقاري',
          description: 'طلبات تحكيم في النزاعات العقارية',
          phase: 'نشط',
          memberCount: 8,
          status: 'قيد المراجعة',
          rating: 4.4,
          category: 'عقارات'
        }
      ]
    },
    {
      id: 'ai-agents',
      title: 'وكلاء الذكاء الاصطناعي',
      description: 'استخدم وكلاء الذكاء الاصطناعي لأتمتة عملياتك',
      icon: Bot,
      route: '/ai-agents',
      kycRequired: true,
      pointsRequired: true,
      activeGroups: [
        {
          id: '16',
          name: 'وكيل التفاوض الذكي',
          description: 'وكيل ذكي متخصص في التفاوض التجاري',
          phase: 'نشط',
          memberCount: 25,
          status: 'نشط',
          rating: 4.8,
          category: 'ذكاء اصطناعي'
        },
        {
          id: '17',
          name: 'وكيل تحليل السوق',
          description: 'يحلل اتجاهات السوق ويقدم التوصيات',
          phase: 'نشط',
          memberCount: 18,
          status: 'نشط',
          rating: 4.9,
          category: 'تحليل'
        }
      ]
    },
    {
      id: 'smart-negotiation',
      title: 'حلول التفاوض الذكي',
      description: 'أدوات التفاوض المدعومة بالذكاء الاصطناعي',
      icon: Handshake,
      route: '/negotiations',
      activeGroups: [
        {
          id: '15',
          name: 'تفاوض العقود التجارية',
          description: 'تفاوض ذكي على العقود التجارية',
          phase: 'التفاوض',
          memberCount: 12,
          status: 'قيد التفاوض',
          rating: 4.7,
          category: 'تجاري'
        }
      ]
    },
    {
      id: 'inbox-outbox',
      title: 'نظام الرسائل',
      description: 'إدارة الرسائل الواردة والصادرة والتواصل مع الأعضاء',
      icon: MessageSquare,
      route: '/inbox-outbox',
      kycRequired: false,
      pointsRequired: false,
      activeGroups: [
        {
          id: '16',
          name: 'رسائل جديدة',
          description: 'رسائل واردة جديدة تحتاج للمراجعة',
          phase: 'نشط',
          memberCount: 15,
          status: 'نشط',
          rating: 4.8,
          category: 'تواصل'
        },
        {
          id: '17',
          name: 'رسائل مهمة',
          description: 'رسائل ذات أولوية عالية',
          phase: 'عاجل',
          memberCount: 8,
          status: 'عاجل',
          rating: 4.9,
          category: 'إدارة'
        }
      ]
    }
  ];

  // فلترة البوابات حسب معايير البحث
  const filteredPortals = portals.filter(portal => {
    if (!searchFilters) return true;
    
    const { query, gateway, groupType } = searchFilters;
    
    // فلترة حسب النص
    if (query && !portal.title.includes(query) && !portal.description.includes(query)) {
      return false;
    }
    
    // فلترة حسب البوابة
    if (gateway && portal.id !== gateway) {
      return false;
    }
    
    // فلترة حسب نوع المجموعة
    if (groupType && !portal.activeGroups.some(group => 
      (groupType === 'seeking-members' && group.status === 'البحث عن أعضاء') ||
      (groupType === 'seeking-suppliers' && group.title.includes('مورد')) ||
      (groupType === 'seeking-freelancers' && group.title.includes('مستقل'))
    )) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="mb-16" dir="rtl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          بواباتنا الرئيسية
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          اختر البوابة التي تناسب احتياجاتك وانضم إلى المجموعات النشطة أو أنشئ مجموعتك الخاصة
        </p>
        {searchFilters && (searchFilters.query || searchFilters.gateway || searchFilters.groupType) && (
          <p className="text-sm text-blue-600 mt-2">
            عرض {filteredPortals.length} من {portals.length} بوابة حسب معايير البحث
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPortals.map((portal) => (
          <PortalCard key={portal.id} {...portal} />
        ))}
      </div>
      
      {filteredPortals.length === 0 && searchFilters && (searchFilters.query || searchFilters.gateway || searchFilters.groupType) && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لم يتم العثور على بوابات تطابق معايير البحث</p>
          <p className="text-gray-400 text-sm mt-2">جرب تعديل معايير البحث أو مسح الفلاتر</p>
        </div>
      )}
    </div>
  );
};

export default PortalsGrid;
