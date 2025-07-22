import React, { useState } from 'react';
import { 
  Inbox, 
  Send, 
  Archive, 
  Users, 
  MessageSquare, 
  FileText, 
  Calendar,
  Filter,
  Search,
  Star,
  Trash2,
  Eye,
  Reply,
  Forward,
  Download,
  Bell,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  Building,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import EnhancedHeader from '@/components/layout/EnhancedHeader';

interface Message {
  id: string;
  type: 'inbox' | 'outbox' | 'archive';
  subject: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
  status: 'unread' | 'read' | 'replied' | 'forwarded';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  attachments?: string[];
  tags?: string[];
}

interface Member {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'offline' | 'away';
  avatar?: string;
}

const InboxOutbox: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // بيانات الرسائل التجريبية
  const messages: Message[] = [
    {
      id: '1',
      type: 'inbox',
      subject: 'طلب انضمام جديد لمجموعة الإلكترونيات',
      sender: 'أحمد محمد',
      recipient: 'أنت',
      content: 'مرحباً، أود الانضمام إلى مجموعة شراء الأجهزة الإلكترونية. لدي خبرة في هذا المجال وأعتقد أنني سأكون إضافة مفيدة للمجموعة.',
      timestamp: new Date('2024-01-15T10:30:00'),
      status: 'unread',
      priority: 'medium',
      category: 'طلبات الانضمام',
      tags: ['إلكترونيات', 'عضوية جديدة']
    },
    {
      id: '2',
      type: 'inbox',
      subject: 'عرض من مورد للمواد الخام',
      sender: 'شركة المواد المتقدمة',
      recipient: 'أنت',
      content: 'نحن نقدم عرضاً خاصاً للمواد الخام بخصم 15% للطلبات الجماعية. العرض ساري حتى نهاية الشهر.',
      timestamp: new Date('2024-01-15T09:15:00'),
      status: 'read',
      priority: 'high',
      category: 'عروض الموردين',
      tags: ['مواد خام', 'خصم', 'عرض محدود']
    },
    {
      id: '3',
      type: 'outbox',
      subject: 'رد على استفسار حول شروط التسليم',
      sender: 'أنت',
      recipient: 'سارة أحمد',
      content: 'شكراً لاستفسارك. شروط التسليم تشمل التوصيل المجاني للطلبات فوق 1000 ريال، والدفع عند الاستلام متاح.',
      timestamp: new Date('2024-01-15T08:45:00'),
      status: 'replied',
      priority: 'medium',
      category: 'استفسارات',
      tags: ['تسليم', 'شروط']
    },
    {
      id: '4',
      type: 'inbox',
      subject: 'تحديث حالة الطلب #12345',
      sender: 'نظام إدارة الطلبات',
      recipient: 'أنت',
      content: 'تم تحديث حالة طلبك رقم 12345. الطلب الآن في مرحلة التجهيز وسيتم الشحن خلال 48 ساعة.',
      timestamp: new Date('2024-01-14T16:20:00'),
      status: 'read',
      priority: 'low',
      category: 'تحديثات النظام',
      tags: ['طلب', 'تحديث', 'شحن']
    },
    {
      id: '5',
      type: 'archive',
      subject: 'تأكيد اكتمال المشروع',
      sender: 'مدير المشروع',
      recipient: 'أنت',
      content: 'تم اكتمال مشروع شراء المعدات بنجاح. جميع الأعضاء راضون عن النتائج والتوفير المحقق.',
      timestamp: new Date('2024-01-10T14:30:00'),
      status: 'read',
      priority: 'medium',
      category: 'إنجازات',
      tags: ['مشروع مكتمل', 'نجاح']
    }
  ];

  // بيانات الأعضاء
  const members: Member[] = [
    {
      id: '1',
      name: 'أحمد محمد',
      role: 'عضو',
      status: 'online'
    },
    {
      id: '2',
      name: 'سارة أحمد',
      role: 'مشرف',
      status: 'away'
    },
    {
      id: '3',
      name: 'محمد علي',
      role: 'مدير',
      status: 'online'
    },
    {
      id: '4',
      name: 'فاطمة حسن',
      role: 'عضو',
      status: 'offline'
    }
  ];

  // فلترة الرسائل
  const filteredMessages = messages.filter(message => {
    const matchesTab = message.type === activeTab;
    const matchesSearch = message.subject.includes(searchTerm) || 
                         message.sender.includes(searchTerm) ||
                         message.content.includes(searchTerm);
    const matchesCategory = filterCategory === 'all' || message.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || message.status === filterStatus;
    
    return matchesTab && matchesSearch && matchesCategory && matchesStatus;
  });

  // الحصول على فئات فريدة
  const categories = ['all', ...Array.from(new Set(messages.map(msg => msg.category)))];
  const statuses = ['all', 'unread', 'read', 'replied', 'forwarded'];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread': return <Bell className="w-4 h-4 text-blue-500" />;
      case 'read': return <Eye className="w-4 h-4 text-gray-500" />;
      case 'replied': return <Reply className="w-4 h-4 text-green-500" />;
      case 'forwarded': return <Forward className="w-4 h-4 text-purple-500" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getMemberStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const handleMessageAction = (messageId: string, action: string) => {
    alert(`تم تنفيذ ${action} للرسالة ${messageId}`);
  };

  const handleComposeMessage = () => {
    setComposeOpen(true);
  };

  const renderMessageList = () => (
    <div className="space-y-4">
      {/* شريط البحث والفلترة */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="البحث في الرسائل..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-right"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="فلترة حسب الفئة" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'جميع الفئات' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="فلترة حسب الحالة" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status === 'all' ? 'جميع الحالات' : 
                 status === 'unread' ? 'غير مقروءة' :
                 status === 'read' ? 'مقروءة' :
                 status === 'replied' ? 'تم الرد' : 'تم التحويل'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* قائمة الرسائل */}
      <div className="space-y-3">
        {filteredMessages.map((message) => (
          <Card 
            key={message.id} 
            className={`cursor-pointer hover:shadow-md transition-shadow ${
              message.status === 'unread' ? 'border-l-4 border-l-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => {
              setSelectedMessage(message);
              setMessageOpen(true);
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(message.status)}
                    <h3 className={`font-semibold ${message.status === 'unread' ? 'text-blue-900' : 'text-gray-900'}`}>
                      {message.subject}
                    </h3>
                    <Badge className={getPriorityColor(message.priority)}>
                      {message.priority === 'urgent' ? 'عاجل' :
                       message.priority === 'high' ? 'مهم' :
                       message.priority === 'medium' ? 'متوسط' : 'منخفض'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {activeTab === 'outbox' ? `إلى: ${message.recipient}` : `من: ${message.sender}`}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {message.timestamp.toLocaleDateString('ar-SA')} - {message.timestamp.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {message.category}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-700 text-sm line-clamp-2">
                    {message.content}
                  </p>
                  
                  {message.tags && message.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <Tag className="w-3 h-3 ml-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMessageAction(message.id, 'أرشفة');
                    }}
                  >
                    <Archive className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMessageAction(message.id, 'حذف');
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد رسائل</h3>
          <p className="text-gray-600">لم يتم العثور على رسائل تطابق معايير البحث</p>
        </div>
      )}
    </div>
  );

  const renderMembers = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">أعضاء المجموعة</h3>
        <Badge variant="outline">
          {members.length} عضو
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((member) => (
          <Card key={member.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getMemberStatusColor(member.status)} rounded-full border-2 border-white`}></div>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <p className="text-xs text-gray-500">
                    {member.status === 'online' ? 'متصل الآن' :
                     member.status === 'away' ? 'غائب' : 'غير متصل'}
                  </p>
                </div>
                
                <Button size="sm" variant="outline">
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <EnhancedHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="max-w-7xl mx-auto p-6 pt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">نظام الرسائل</h1>
            <p className="text-gray-600">إدارة الرسائل الواردة والصادرة والأرشيف</p>
          </div>
          <Button onClick={handleComposeMessage} className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            إنشاء رسالة
          </Button>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">الرسائل الواردة</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {messages.filter(m => m.type === 'inbox').length}
                  </p>
                </div>
                <Inbox className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">الرسائل الصادرة</p>
                  <p className="text-2xl font-bold text-green-600">
                    {messages.filter(m => m.type === 'outbox').length}
                  </p>
                </div>
                <Send className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">الأرشيف</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {messages.filter(m => m.type === 'archive').length}
                  </p>
                </div>
                <Archive className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">غير مقروءة</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {messages.filter(m => m.status === 'unread').length}
                  </p>
                </div>
                <Bell className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* علامات التبويب */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="inbox" className="flex items-center gap-2">
              <Inbox className="w-4 h-4" />
              الواردة
            </TabsTrigger>
            <TabsTrigger value="outbox" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              الصادرة
            </TabsTrigger>
            <TabsTrigger value="archive" className="flex items-center gap-2">
              <Archive className="w-4 h-4" />
              الأرشيف
            </TabsTrigger>
            <TabsTrigger value="members" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              الأعضاء
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inbox">
            {renderMessageList()}
          </TabsContent>

          <TabsContent value="outbox">
            {renderMessageList()}
          </TabsContent>

          <TabsContent value="archive">
            {renderMessageList()}
          </TabsContent>

          <TabsContent value="members">
            {renderMembers()}
          </TabsContent>
        </Tabs>
      </div>

      {/* نافذة عرض الرسالة */}
      <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              {selectedMessage?.subject}
            </DialogTitle>
            <DialogDescription>
              {selectedMessage && (
                <div className="flex items-center gap-4 text-sm">
                  <span>من: {selectedMessage.sender}</span>
                  <span>إلى: {selectedMessage.recipient}</span>
                  <span>{selectedMessage.timestamp.toLocaleString('ar-SA')}</span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor(selectedMessage.priority)}>
                  {selectedMessage.priority === 'urgent' ? 'عاجل' :
                   selectedMessage.priority === 'high' ? 'مهم' :
                   selectedMessage.priority === 'medium' ? 'متوسط' : 'منخفض'}
                </Badge>
                <Badge variant="outline">
                  {selectedMessage.category}
                </Badge>
              </div>
              
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-gray-900 leading-relaxed">
                  {selectedMessage.content}
                </p>
              </div>
              
              {selectedMessage.tags && selectedMessage.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedMessage.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      <Tag className="w-3 h-3 ml-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleMessageAction(selectedMessage.id, 'رد')}>
                  <Reply className="w-4 h-4 ml-2" />
                  رد
                </Button>
                <Button variant="outline" onClick={() => handleMessageAction(selectedMessage.id, 'تحويل')}>
                  <Forward className="w-4 h-4 ml-2" />
                  تحويل
                </Button>
                <Button variant="outline" onClick={() => handleMessageAction(selectedMessage.id, 'أرشفة')}>
                  <Archive className="w-4 h-4 ml-2" />
                  أرشفة
                </Button>
                <Button variant="outline" onClick={() => handleMessageAction(selectedMessage.id, 'حذف')}>
                  <Trash2 className="w-4 h-4 ml-2" />
                  حذف
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* نافذة إنشاء رسالة */}
      <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
        <DialogContent className="max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              إنشاء رسالة جديدة
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">المستقبل</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المستقبل" />
                </SelectTrigger>
                <SelectContent>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name} - {member.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">الموضوع</label>
              <Input placeholder="موضوع الرسالة" className="text-right" />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">الأولوية</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">منخفضة</SelectItem>
                  <SelectItem value="medium">متوسطة</SelectItem>
                  <SelectItem value="high">مهمة</SelectItem>
                  <SelectItem value="urgent">عاجلة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">المحتوى</label>
              <Textarea 
                placeholder="اكتب رسالتك هنا..."
                className="min-h-32 text-right"
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button onClick={() => {
                alert('تم إرسال الرسالة بنجاح');
                setComposeOpen(false);
              }}>
                <Send className="w-4 h-4 ml-2" />
                إرسال
              </Button>
              <Button variant="outline" onClick={() => setComposeOpen(false)}>
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InboxOutbox;

