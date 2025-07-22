import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Vote, 
  Settings, 
  Plus,
  Send,
  UserPlus,
  Archive,
  Bell,
  Eye,
  Download,
  Share,
  Clock,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InboxOutboxSystem from '../inbox/InboxOutboxSystem';

interface GroupMember {
  id: string;
  name: string;
  role: 'founder' | 'member' | 'moderator';
  avatar: string;
  joinedAt: Date;
  status: 'online' | 'offline';
}

interface GroupTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
}

interface VotingItem {
  id: string;
  title: string;
  description: string;
  type: 'supplier_selection' | 'freelancer_selection' | 'internal_decision';
  options: string[];
  votes: { [key: string]: string };
  deadline: Date;
  status: 'active' | 'completed' | 'cancelled';
  anonymous: boolean;
}

const GroupRoom: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newMessage, setNewMessage] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  // Sample data
  const groupInfo = {
    name: 'مجموعة شراء الأجهزة الإلكترونية',
    description: 'مجموعة لشراء أجهزة الكمبيوتر والإلكترونيات بأسعار الجملة',
    status: 'active',
    memberCount: 12,
    maxMembers: 50,
    createdAt: new Date('2024-01-01'),
    category: 'cooperative-purchasing'
  };

  const members: GroupMember[] = [
    {
      id: '1',
      name: 'أحمد محمد',
      role: 'founder',
      avatar: '/avatars/ahmed.jpg',
      joinedAt: new Date('2024-01-01'),
      status: 'online'
    },
    {
      id: '2',
      name: 'فاطمة علي',
      role: 'moderator',
      avatar: '/avatars/fatima.jpg',
      joinedAt: new Date('2024-01-05'),
      status: 'online'
    },
    {
      id: '3',
      name: 'محمد حسن',
      role: 'member',
      avatar: '/avatars/mohamed.jpg',
      joinedAt: new Date('2024-01-10'),
      status: 'offline'
    }
  ];

  const tasks: GroupTask[] = [
    {
      id: '1',
      title: 'مراجعة عروض الموردين',
      description: 'مراجعة وتقييم العروض المقدمة من الموردين',
      assignedTo: 'فاطمة علي',
      status: 'in_progress',
      dueDate: new Date('2024-01-20'),
      priority: 'high'
    },
    {
      id: '2',
      title: 'إعداد معايير الاختيار',
      description: 'وضع معايير واضحة لاختيار أفضل مورد',
      assignedTo: 'أحمد محمد',
      status: 'completed',
      dueDate: new Date('2024-01-15'),
      priority: 'medium'
    }
  ];

  const votingItems: VotingItem[] = [
    {
      id: '1',
      title: 'اختيار المورد الرئيسي',
      description: 'التصويت على اختيار المورد الرئيسي للأجهزة الإلكترونية',
      type: 'supplier_selection',
      options: ['شركة التقنية المتقدمة', 'مؤسسة الإلكترونيات الحديثة', 'شركة الحاسوب المحدودة'],
      votes: { '1': 'شركة التقنية المتقدمة', '2': 'شركة التقنية المتقدمة' },
      deadline: new Date('2024-01-25'),
      status: 'active',
      anonymous: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendInvite = () => {
    if (inviteEmail) {
      alert(`تم إرسال دعوة إلى: ${inviteEmail}`);
      setInviteEmail('');
    }
  };

  const handleSendMessage = () => {
    if (newMessage) {
      alert(`تم إرسال الرسالة: ${newMessage}`);
      setNewMessage('');
    }
  };

  const renderOverview = () => (
    <div className="space-y-6" dir="rtl">
      {/* Group Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            معلومات المجموعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">{groupInfo.name}</h3>
              <p className="text-gray-600 mb-4">{groupInfo.description}</p>
              <div className="flex items-center gap-4">
                <Badge className={getStatusColor(groupInfo.status)}>
                  {groupInfo.status === 'active' ? 'نشطة' : 'غير نشطة'}
                </Badge>
                <span className="text-sm text-gray-500">
                  {groupInfo.memberCount}/{groupInfo.maxMembers} عضو
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">تاريخ الإنشاء:</span>
                <span>{groupInfo.createdAt.toLocaleDateString('ar-SA')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الفئة:</span>
                <span>شراء تعاوني</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الحالة:</span>
                <Badge className={getStatusColor(groupInfo.status)}>نشطة</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2">
              <UserPlus className="w-6 h-6" />
              دعوة أعضاء
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Vote className="w-6 h-6" />
              بدء تصويت
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <FileText className="w-6 h-6" />
              إنشاء مهمة
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Archive className="w-6 h-6" />
              عرض الأرشيف
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            النشاط الأخير
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">تم إكمال مهمة "إعداد معايير الاختيار"</p>
                <p className="text-sm text-gray-500">منذ ساعتين</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Bell className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium">تم استلام عرض جديد من مورد</p>
                <p className="text-sm text-gray-500">منذ 4 ساعات</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 text-purple-500" />
              <div>
                <p className="font-medium">انضم عضو جديد للمجموعة</p>
                <p className="text-sm text-gray-500">أمس</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMembers = () => (
    <div className="space-y-6" dir="rtl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              أعضاء المجموعة ({members.length})
            </CardTitle>
            <Button>
              <UserPlus className="w-4 h-4 ml-2" />
              دعوة عضو
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {member.name.charAt(0)}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      member.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant={member.role === 'founder' ? 'default' : 'secondary'}>
                        {member.role === 'founder' ? 'مؤسس' : 
                         member.role === 'moderator' ? 'مشرف' : 'عضو'}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        انضم في {member.joinedAt.toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invite External */}
      <Card>
        <CardHeader>
          <CardTitle>دعوة مورد أو مستقل خارجي</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="البريد الإلكتروني للمدعو"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="flex-1 text-right"
            />
            <Button onClick={handleSendInvite}>
              <Send className="w-4 h-4 ml-2" />
              إرسال دعوة
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            سيتم إرسال رابط مباشر لصفحة تقديم العرض دون الحاجة للتسجيل الكامل
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6" dir="rtl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              المهام ({tasks.length})
            </CardTitle>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              مهمة جديدة
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{task.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(task.status)}>
                        {task.status === 'pending' ? 'معلقة' :
                         task.status === 'in_progress' ? 'قيد التنفيذ' : 'مكتملة'}
                      </Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority === 'high' ? 'عالية' :
                         task.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        مسندة إلى: {task.assignedTo}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    موعد الانتهاء: {task.dueDate.toLocaleDateString('ar-SA')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderVoting = () => (
    <div className="space-y-6" dir="rtl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Vote className="w-5 h-5" />
              التصويت النشط
            </CardTitle>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              بدء تصويت جديد
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {votingItems.map((voting) => (
            <div key={voting.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{voting.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{voting.description}</p>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(voting.status)}>
                      {voting.status === 'active' ? 'نشط' : 'مكتمل'}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      ينتهي في: {voting.deadline.toLocaleDateString('ar-SA')}
                    </span>
                    {voting.anonymous && (
                      <Badge variant="outline">تصويت سري</Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {voting.options.map((option, index) => {
                  const voteCount = Object.values(voting.votes).filter(vote => vote === option).length;
                  const percentage = Object.keys(voting.votes).length > 0 
                    ? (voteCount / Object.keys(voting.votes).length) * 100 
                    : 0;
                  
                  return (
                    <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{option}</span>
                        <span className="text-sm text-gray-500">{voteCount} صوت</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  إجمالي الأصوات: {Object.keys(voting.votes).length}
                </span>
                <Button size="sm">
                  صوت الآن
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6" dir="rtl">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{groupInfo.name}</h1>
              <p className="text-gray-600 mt-1">{groupInfo.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(groupInfo.status)}>
                {groupInfo.status === 'active' ? 'نشطة' : 'غير نشطة'}
              </Badge>
              <Button variant="outline">
                <Settings className="w-4 h-4 ml-2" />
                إعدادات
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 p-1 m-6 mb-0">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="members">الأعضاء</TabsTrigger>
            <TabsTrigger value="inbox">الرسائل</TabsTrigger>
            <TabsTrigger value="tasks">المهام</TabsTrigger>
            <TabsTrigger value="voting">التصويت</TabsTrigger>
            <TabsTrigger value="archive">الأرشيف</TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="overview">
              {renderOverview()}
            </TabsContent>

            <TabsContent value="members">
              {renderMembers()}
            </TabsContent>

            <TabsContent value="inbox">
              <InboxOutboxSystem />
            </TabsContent>

            <TabsContent value="tasks">
              {renderTasks()}
            </TabsContent>

            <TabsContent value="voting">
              {renderVoting()}
            </TabsContent>

            <TabsContent value="archive">
              <div className="text-center py-12">
                <Archive className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">الأرشيف</h3>
                <p className="text-gray-600">سيتم عرض الملفات والقرارات المؤرشفة هنا</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Documentation Alert */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg" dir="rtl">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-blue-900">تنبيه التوثيق</span>
        </div>
        <p className="text-blue-800 text-sm mt-1">
          جميع الاتصالات والملفات يتم توثيقها تلقائياً وإرسال نسخة إلى البريد الإلكتروني المسجل لكل عضو.
        </p>
      </div>
    </div>
  );
};

export default GroupRoom;

