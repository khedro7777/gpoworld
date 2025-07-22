import React, { useState } from 'react';
import { 
  Inbox, 
  Send, 
  Archive, 
  Mail, 
  MessageSquare, 
  FileText, 
  Clock, 
  User, 
  Building, 
  Users,
  Filter,
  Search,
  MoreVertical,
  Eye,
  Reply,
  Forward,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface InboxItem {
  id: string;
  source: 'supplier' | 'freelancer' | 'visitor' | 'system';
  type: 'offer' | 'inquiry' | 'application' | 'notification';
  subject: string;
  content: string;
  sender: string;
  receivedAt: Date;
  read: boolean;
  attachments?: string[];
}

interface OutboxItem {
  id: string;
  recipient: string;
  type: 'invitation' | 'response' | 'notification' | 'decision';
  subject: string;
  content: string;
  sentBy: string;
  sentAt: Date;
  delivered: boolean;
  status: 'sent' | 'delivered' | 'read' | 'failed';
}

interface ArchiveItem {
  id: string;
  type: 'decision' | 'minutes' | 'accepted_offer' | 'contract';
  title: string;
  content: string;
  archivedAt: Date;
  category: string;
  tags: string[];
}

const InboxOutboxSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'outbox' | 'archive'>('inbox');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Sample data
  const inboxItems: InboxItem[] = [
    {
      id: '1',
      source: 'supplier',
      type: 'offer',
      subject: 'عرض توريد أجهزة كمبيوتر',
      content: 'نحن شركة تقنية متخصصة في توريد أجهزة الكمبيوتر والخوادم...',
      sender: 'شركة التقنية المتقدمة',
      receivedAt: new Date('2024-01-15T10:30:00'),
      read: false,
      attachments: ['catalog.pdf', 'price_list.xlsx']
    },
    {
      id: '2',
      source: 'freelancer',
      type: 'application',
      subject: 'طلب انضمام لمشروع تطوير التطبيق',
      content: 'مرحباً، أنا مطور تطبيقات محترف مع خبرة 5 سنوات...',
      sender: 'أحمد محمد',
      receivedAt: new Date('2024-01-14T14:20:00'),
      read: true
    },
    {
      id: '3',
      source: 'visitor',
      type: 'inquiry',
      subject: 'استفسار عن شروط الانضمام',
      content: 'أود معرفة المزيد عن شروط الانضمام للمجموعة...',
      sender: 'سارة أحمد',
      receivedAt: new Date('2024-01-13T09:15:00'),
      read: true
    }
  ];

  const outboxItems: OutboxItem[] = [
    {
      id: '1',
      recipient: 'شركة الموردين المحدودة',
      type: 'invitation',
      subject: 'دعوة لتقديم عرض',
      content: 'ندعوكم لتقديم عرض لتوريد المعدات المطلوبة...',
      sentBy: 'مدير المجموعة',
      sentAt: new Date('2024-01-15T11:00:00'),
      delivered: true,
      status: 'read'
    },
    {
      id: '2',
      recipient: 'فريق التطوير',
      type: 'decision',
      subject: 'قرار اختيار المطور',
      content: 'تم اتخاذ قرار بشأن اختيار المطور للمشروع...',
      sentBy: 'مدير المجموعة',
      sentAt: new Date('2024-01-14T16:30:00'),
      delivered: true,
      status: 'delivered'
    }
  ];

  const archiveItems: ArchiveItem[] = [
    {
      id: '1',
      type: 'decision',
      title: 'قرار اختيار المورد الرئيسي',
      content: 'تم اتخاذ قرار بالإجماع لاختيار شركة التقنية المتقدمة...',
      archivedAt: new Date('2024-01-10T15:00:00'),
      category: 'قرارات',
      tags: ['مورد', 'تقنية', 'إجماع']
    },
    {
      id: '2',
      type: 'accepted_offer',
      title: 'عرض مقبول - تطوير التطبيق',
      content: 'تم قبول عرض أحمد محمد لتطوير التطبيق...',
      archivedAt: new Date('2024-01-08T12:00:00'),
      category: 'عروض مقبولة',
      tags: ['تطوير', 'تطبيق', 'مقبول']
    }
  ];

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'supplier': return <Building className="w-4 h-4" />;
      case 'freelancer': return <User className="w-4 h-4" />;
      case 'visitor': return <Users className="w-4 h-4" />;
      case 'system': return <MessageSquare className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'offer': return 'bg-green-100 text-green-800';
      case 'inquiry': return 'bg-blue-100 text-blue-800';
      case 'application': return 'bg-purple-100 text-purple-800';
      case 'notification': return 'bg-yellow-100 text-yellow-800';
      case 'invitation': return 'bg-orange-100 text-orange-800';
      case 'response': return 'bg-cyan-100 text-cyan-800';
      case 'decision': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Send className="w-4 h-4 text-blue-500" />;
      case 'delivered': return <Mail className="w-4 h-4 text-green-500" />;
      case 'read': return <Eye className="w-4 h-4 text-purple-500" />;
      case 'failed': return <Trash2 className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const renderInbox = () => (
    <div className="space-y-4">
      {inboxItems.map((item) => (
        <div
          key={item.id}
          className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${
            !item.read ? 'bg-blue-50 border-blue-200' : 'bg-white'
          }`}
          dir="rtl"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="flex items-center gap-2">
                {getSourceIcon(item.source)}
                {!item.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{item.subject}</h3>
                  <Badge className={getTypeColor(item.type)}>
                    {item.type === 'offer' ? 'عرض' :
                     item.type === 'inquiry' ? 'استفسار' :
                     item.type === 'application' ? 'طلب انضمام' : 'إشعار'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.sender}</p>
                <p className="text-gray-700 text-sm line-clamp-2">{item.content}</p>
                {item.attachments && (
                  <div className="flex items-center gap-2 mt-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {item.attachments.length} مرفق
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{formatDate(item.receivedAt)}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="w-4 h-4 ml-2" />
                    عرض
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Reply className="w-4 h-4 ml-2" />
                    رد
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward className="w-4 h-4 ml-2" />
                    إعادة توجيه
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="w-4 h-4 ml-2" />
                    أرشفة
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderOutbox = () => (
    <div className="space-y-4">
      {outboxItems.map((item) => (
        <div key={item.id} className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow" dir="rtl">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <Send className="w-5 h-5 text-blue-500 mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{item.subject}</h3>
                  <Badge className={getTypeColor(item.type)}>
                    {item.type === 'invitation' ? 'دعوة' :
                     item.type === 'response' ? 'رد' :
                     item.type === 'decision' ? 'قرار' : 'إشعار'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">إلى: {item.recipient}</p>
                <p className="text-gray-700 text-sm line-clamp-2">{item.content}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-gray-500">بواسطة: {item.sentBy}</span>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(item.status)}
                    <span className="text-xs text-gray-500">
                      {item.status === 'sent' ? 'مرسل' :
                       item.status === 'delivered' ? 'تم التسليم' :
                       item.status === 'read' ? 'تم القراءة' : 'فشل'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{formatDate(item.sentAt)}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="w-4 h-4 ml-2" />
                    عرض
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward className="w-4 h-4 ml-2" />
                    إعادة إرسال
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="w-4 h-4 ml-2" />
                    أرشفة
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderArchive = () => (
    <div className="space-y-4">
      {archiveItems.map((item) => (
        <div key={item.id} className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow" dir="rtl">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <Archive className="w-5 h-5 text-gray-500 mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <Badge className={getTypeColor(item.type)}>
                    {item.type === 'decision' ? 'قرار' :
                     item.type === 'minutes' ? 'محضر' :
                     item.type === 'accepted_offer' ? 'عرض مقبول' : 'عقد'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">التصنيف: {item.category}</p>
                <p className="text-gray-700 text-sm line-clamp-2">{item.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{formatDate(item.archivedAt)}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="w-4 h-4 ml-2" />
                    عرض
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="w-4 h-4 ml-2" />
                    تصدير
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6" dir="rtl">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">نظام الرسائل والأرشيف</h1>
          
          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('inbox')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'inbox' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Inbox className="w-4 h-4" />
              صندوق الوارد
              <Badge variant="secondary">3</Badge>
            </button>
            <button
              onClick={() => setActiveTab('outbox')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'outbox' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Send className="w-4 h-4" />
              صندوق الصادر
              <Badge variant="secondary">2</Badge>
            </button>
            <button
              onClick={() => setActiveTab('archive')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'archive' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Archive className="w-4 h-4" />
              الأرشيف
              <Badge variant="secondary">2</Badge>
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-6 border-b">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="البحث في الرسائل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-right"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="فلترة حسب النوع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="offer">عروض</SelectItem>
                <SelectItem value="inquiry">استفسارات</SelectItem>
                <SelectItem value="application">طلبات انضمام</SelectItem>
                <SelectItem value="notification">إشعارات</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 ml-2" />
              فلترة
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'inbox' && renderInbox()}
          {activeTab === 'outbox' && renderOutbox()}
          {activeTab === 'archive' && renderArchive()}
        </div>
      </div>
    </div>
  );
};

export default InboxOutboxSystem;

