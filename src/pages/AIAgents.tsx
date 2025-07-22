import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  MessageSquare, 
  Settings, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  BarChart3,
  Activity,
  Zap,
  Brain,
  Shield,
  Target,
  Clock,
  Award,
  Eye,
  Download,
  RefreshCw,
  Bell,
  Filter,
  Search,
  Calendar,
  FileText,
  Lightbulb,
  Cpu,
  Database,
  Network,
  Monitor,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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

interface Agent {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'active' | 'training' | 'idle' | 'maintenance';
  performance: number;
  tasksCompleted: number;
  successRate: number;
  lastActive: string;
  specialization: string[];
  metrics: {
    accuracy: number;
    speed: number;
    efficiency: number;
    reliability: number;
  };
  recentActivity: ActivityLog[];
}

interface ActivityLog {
  id: string;
  timestamp: Date;
  action: string;
  result: 'success' | 'warning' | 'error';
  details: string;
}

interface MonitoringData {
  systemHealth: number;
  activeAgents: number;
  totalTasks: number;
  averagePerformance: number;
  alerts: Alert[];
  resourceUsage: {
    cpu: number;
    memory: number;
    network: number;
    storage: number;
  };
}

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: Date;
  agentId?: string;
}

const AIAgents: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, sender: string, message: string, timestamp: Date}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('agents');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // بيانات المراقبة الذكية
  const [monitoringData, setMonitoringData] = useState<MonitoringData>({
    systemHealth: 94,
    activeAgents: 10,
    totalTasks: 1247,
    averagePerformance: 87,
    alerts: [
      {
        id: '1',
        type: 'warning',
        message: 'وكيل التفاوض يحتاج إلى إعادة تدريب',
        timestamp: new Date(),
        agentId: 'negotiation-agent'
      },
      {
        id: '2',
        type: 'info',
        message: 'تم تحديث نموذج تحليل السوق بنجاح',
        timestamp: new Date(),
        agentId: 'market-agent'
      }
    ],
    resourceUsage: {
      cpu: 67,
      memory: 82,
      network: 45,
      storage: 73
    }
  });

  // وكلاء الذكاء الاصطناعي المحدثين مع ميزات المراقبة
  const agents: Agent[] = [
    {
      id: 'sami-demand-analyzer',
      name: 'سامي - محلل الطلب',
      category: 'تحليل البيانات',
      description: 'يحلل طلبات المجموعات ويصنف المهارات والمنتجات المطلوبة',
      status: 'active',
      performance: 94,
      tasksCompleted: 156,
      successRate: 91,
      lastActive: 'منذ 5 دقائق',
      specialization: ['تحليل الطلب', 'تصنيف المهارات', 'مطابقة الأعضاء'],
      metrics: {
        accuracy: 94,
        speed: 88,
        efficiency: 92,
        reliability: 96
      },
      recentActivity: [
        {
          id: '1',
          timestamp: new Date(),
          action: 'تحليل طلب مجموعة جديدة',
          result: 'success',
          details: 'تم تحليل متطلبات مجموعة الأجهزة الإلكترونية بنجاح'
        }
      ]
    },
    {
      id: 'nour-market-researcher',
      name: 'نور - باحثة السوق',
      category: 'أبحاث السوق',
      description: 'تفحص قواعد البيانات الخارجية وتقترح الاتجاهات',
      status: 'active',
      performance: 89,
      tasksCompleted: 203,
      successRate: 94,
      lastActive: 'منذ 2 دقيقة',
      specialization: ['أبحاث السوق', 'تحليل الاتجاهات', 'التنبؤ بالأسعار'],
      metrics: {
        accuracy: 89,
        speed: 91,
        efficiency: 87,
        reliability: 93
      },
      recentActivity: [
        {
          id: '1',
          timestamp: new Date(),
          action: 'تحديث تقرير اتجاهات السوق',
          result: 'success',
          details: 'تم تحديث تقرير أسعار الإلكترونيات للربع الحالي'
        }
      ]
    },
    {
      id: 'lina-legal-bot',
      name: 'لينا - مساعدة قانونية',
      category: 'الشؤون القانونية',
      description: 'تصيغ قوالب للقواعد واتفاقيات عدم الإفشاء وشروط الشراكة',
      status: 'training',
      performance: 87,
      tasksCompleted: 67,
      successRate: 88,
      lastActive: 'منذ 15 دقيقة',
      specialization: ['صياغة العقود', 'اتفاقيات عدم الإفشاء', 'شروط الشراكة'],
      metrics: {
        accuracy: 87,
        speed: 82,
        efficiency: 89,
        reliability: 91
      },
      recentActivity: [
        {
          id: '1',
          timestamp: new Date(),
          action: 'صياغة اتفاقية شراكة جديدة',
          result: 'warning',
          details: 'تحتاج المراجعة القانونية للبنود المالية'
        }
      ]
    },
    {
      id: 'ziad-arbitration-supervisor',
      name: 'زياد - مشرف التحكيم',
      category: 'التحكيم',
      description: 'يلخص النزاعات ويقدم تقييماً محايداً',
      status: 'active',
      performance: 92,
      tasksCompleted: 89,
      successRate: 96,
      lastActive: 'منذ 8 دقائق',
      specialization: ['تحليل النزاعات', 'التقييم المحايد', 'إدارة القضايا'],
      metrics: {
        accuracy: 92,
        speed: 85,
        efficiency: 94,
        reliability: 98
      },
      recentActivity: [
        {
          id: '1',
          timestamp: new Date(),
          action: 'مراجعة قضية تحكيم جديدة',
          result: 'success',
          details: 'تم تحليل الأدلة وإعداد التقرير الأولي'
        }
      ]
    },
    {
      id: 'hani-negotiation-coach',
      name: 'هاني - مدرب التفاوض',
      category: 'التفاوض',
      description: 'يقترح أسعاراً عادلة وشروطاً بناءً على التحليلات',
      status: 'active',
      performance: 85,
      tasksCompleted: 312,
      successRate: 93,
      lastActive: 'منذ 3 دقائق',
      specialization: ['استراتيجيات التفاوض', 'تحليل الأسعار', 'تحسين الشروط'],
      metrics: {
        accuracy: 85,
        speed: 90,
        efficiency: 88,
        reliability: 87
      },
      recentActivity: [
        {
          id: '1',
          timestamp: new Date(),
          action: 'تقديم اقتراح تفاوضي',
          result: 'success',
          details: 'تم اقتراح استراتيجية تفاوض لمجموعة المواد الخام'
        }
      ]
    },
    {
      id: 'dana-freelancer-evaluator',
      name: 'دانا - مقيمة المستقلين',
      category: 'تقييم المواهب',
      description: 'تقيم ملفات المستقلين وتحذر من السلوك المشبوه',
      status: 'active',
      performance: 91,
      tasksCompleted: 567,
      successRate: 95,
      lastActive: 'منذ 1 دقيقة',
      specialization: ['تقييم المهارات', 'فحص السمعة', 'كشف الاحتيال'],
      metrics: {
        accuracy: 91,
        speed: 93,
        efficiency: 89,
        reliability: 95
      },
      recentActivity: [
        {
          id: '1',
          timestamp: new Date(),
          action: 'تقييم مستقل جديد',
          result: 'success',
          details: 'تم تقييم مطور تطبيقات وتأكيد مؤهلاته'
        }
      ]
    },
    {
      id: 'badr-supplier-finder',
      name: 'بدر - باحث الموردين',
      category: 'البحث والاستكشاف',
      description: 'يبحث في الإنترنت عن موردين ويرسل دعوات',
      status: 'active',
      performance: 88,
      tasksCompleted: 234,
      successRate: 87,
      lastActive: 'منذ 7 دقائق',
      specialization: ['البحث عن الموردين', 'إرسال الدعوات', 'التحقق من المصداقية'],
      metrics: {
        accuracy: 88,
        speed: 86,
        efficiency: 91,
        reliability: 89
      },
      recentActivity: [
        {
          id: '1',
          timestamp: new Date(),
          action: 'العثور على موردين جدد',
          result: 'success',
          details: 'تم العثور على 5 موردين محتملين للمواد الغذائية'
        }
      ]
    },
    {
      id: 'tarek-mcp-evaluator',
      name: 'طارق - مقيم MCP',
      category: 'التعليم والتقييم',
      description: 'يراجع الإجابات ويشرح المفاهيم',
      status: 'idle',
      performance: 83,
      tasksCompleted: 445,
      successRate: 90,
      lastActive: 'منذ 30 دقيقة',
      specialization: ['تقييم الامتحانات', 'شرح المفاهيم', 'التدريب'],
      metrics: {
        accuracy: 83,
        speed: 88,
        efficiency: 85,
        reliability: 92
      },
      recentActivity: [
        {
          id: '1',
          timestamp: new Date(),
          action: 'تقييم امتحان MCP',
          result: 'success',
          details: 'تم تقييم 15 امتحان وتقديم التغذية الراجعة'
        }
      ]
    },
    {
      id: 'amal-reputation-tracker',
      name: 'أمل - متتبعة السمعة',
      category: 'إدارة السمعة',
      description: 'تعين التقييمات وتظهر الاتساق',
      status: 'active',
      performance: 96,
      tasksCompleted: 789,
      successRate: 98,
      lastActive: 'منذ 4 دقائق',
      specialization: ['تتبع السمعة', 'تحليل الأداء', 'إدارة التقييمات'],
      metrics: {
        accuracy: 96,
        speed: 94,
        efficiency: 97,
        reliability: 99
      },
      recentActivity: [
        {
          id: '1',
          timestamp: new Date(),
          action: 'تحديث تقييمات الأعضاء',
          result: 'success',
          details: 'تم تحديث تقييمات 25 عضو بناءً على الأداء الأخير'
        }
      ]
    },
    {
      id: 'feras-voting-optimizer',
      name: 'فراس - محسن التصويت',
      category: 'تحسين العمليات',
      description: 'يحلل التحيز ويشجع على التغذية الراجعة',
      status: 'active',
      performance: 87,
      tasksCompleted: 156,
      successRate: 89,
      lastActive: 'منذ 6 دقائق',
      specialization: ['تحليل التصويت', 'كشف التحيز', 'تحسين القرارات'],
      metrics: {
        accuracy: 87,
        speed: 85,
        efficiency: 90,
        reliability: 88
      },
      recentActivity: [
        {
          id: '1',
          timestamp: new Date(),
          action: 'تحليل نتائج التصويت',
          result: 'warning',
          details: 'تم اكتشاف تحيز محتمل في التصويت الأخير'
        }
      ]
    },
    {
      id: 'mariam-translator',
      name: 'مريم - المترجمة الذكية',
      category: 'الترجمة والتواصل',
      description: 'تترجم الواجهة والنتائج',
      status: 'active',
      performance: 94,
      tasksCompleted: 1203,
      successRate: 97,
      lastActive: 'منذ 1 دقيقة',
      specialization: ['الترجمة الفورية', 'التواصل متعدد اللغات', 'التكيف الثقافي'],
      metrics: {
        accuracy: 94,
        speed: 98,
        efficiency: 93,
        reliability: 96
      },
      recentActivity: [
        {
          id: '1',
          timestamp: new Date(),
          action: 'ترجمة محتوى جديد',
          result: 'success',
          details: 'تم ترجمة واجهة المستخدم إلى 3 لغات جديدة'
        }
      ]
    },
    {
      id: 'rania-security-guard',
      name: 'رانيا - حارسة الأمان',
      category: 'الأمان والحماية',
      description: 'تمنع إساءة الاستخدام وتحمي الأدوار',
      status: 'active',
      performance: 98,
      tasksCompleted: 2341,
      successRate: 99,
      lastActive: 'منذ 30 ثانية',
      specialization: ['أمان النظام', 'كشف التهديدات', 'حماية البيانات'],
      metrics: {
        accuracy: 98,
        speed: 96,
        efficiency: 99,
        reliability: 100
      },
      recentActivity: [
        {
          id: '1',
          timestamp: new Date(),
          action: 'فحص أمني روتيني',
          result: 'success',
          details: 'تم فحص 150 عملية دخول وتأكيد سلامتها'
        }
      ]
    }
  ];

  // فلترة الوكلاء حسب البحث والفئة
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.includes(searchTerm) || 
                         agent.description.includes(searchTerm) ||
                         agent.specialization.some(spec => spec.includes(searchTerm));
    const matchesCategory = filterCategory === 'all' || agent.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // الحصول على فئات فريدة
  const categories = ['all', ...Array.from(new Set(agents.map(agent => agent.category)))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-blue-100 text-blue-800';
      case 'idle': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />;
      case 'training': return <Brain className="w-4 h-4" />;
      case 'idle': return <Pause className="w-4 h-4" />;
      case 'maintenance': return <Settings className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const handleChatWithAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setChatOpen(true);
    // إضافة رسالة ترحيب من الوكيل
    const welcomeMessage = {
      id: Date.now().toString(),
      sender: agent.name,
      message: `مرحباً! أنا ${agent.name}، ${agent.description}. كيف يمكنني مساعدتك اليوم؟`,
      timestamp: new Date()
    };
    setChatMessages([welcomeMessage]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedAgent) {
      const userMessage = {
        id: Date.now().toString(),
        sender: 'أنت',
        message: newMessage,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, userMessage]);
      
      // محاكاة رد الوكيل
      setTimeout(() => {
        const agentResponse = {
          id: (Date.now() + 1).toString(),
          sender: selectedAgent.name,
          message: `شكراً لك على رسالتك. أنا أعمل على تحليل طلبك وسأقدم لك الإجابة المناسبة. هل تحتاج إلى مساعدة إضافية في ${selectedAgent.specialization[0]}؟`,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, agentResponse]);
      }, 1000);
      
      setNewMessage('');
    }
  };

  const handleAgentAction = (agentId: string, action: string) => {
    alert(`تم تنفيذ ${action} للوكيل ${agentId}`);
  };

  // تحديث البيانات كل 30 ثانية
  useEffect(() => {
    const interval = setInterval(() => {
      setMonitoringData(prev => ({
        ...prev,
        systemHealth: Math.max(85, Math.min(99, prev.systemHealth + (Math.random() - 0.5) * 4)),
        resourceUsage: {
          cpu: Math.max(30, Math.min(90, prev.resourceUsage.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(40, Math.min(95, prev.resourceUsage.memory + (Math.random() - 0.5) * 8)),
          network: Math.max(20, Math.min(80, prev.resourceUsage.network + (Math.random() - 0.5) * 15)),
          storage: Math.max(50, Math.min(85, prev.resourceUsage.storage + (Math.random() - 0.5) * 5))
        }
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const renderAgentsGrid = () => (
    <div className="space-y-6">
      {/* شريط البحث والفلترة */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="البحث في الوكلاء..."
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
      </div>

      {/* شبكة الوكلاء */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <p className="text-sm text-gray-600">{agent.category}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(agent.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(agent.status)}
                    {agent.status === 'active' ? 'نشط' :
                     agent.status === 'training' ? 'تدريب' :
                     agent.status === 'idle' ? 'خامل' : 'صيانة'}
                  </div>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm mb-4">{agent.description}</p>
              
              {/* مقاييس الأداء */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">الأداء العام</span>
                  <span className="text-sm font-semibold">{agent.performance}%</span>
                </div>
                <Progress value={agent.performance} className="h-2" />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المهام</span>
                    <span className="font-semibold">{agent.tasksCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">النجاح</span>
                    <span className="font-semibold">{agent.successRate}%</span>
                  </div>
                </div>
              </div>

              {/* التخصصات */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">التخصصات:</p>
                <div className="flex flex-wrap gap-1">
                  {agent.specialization.slice(0, 2).map((spec, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                  {agent.specialization.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{agent.specialization.length - 2}
                    </Badge>
                  )}
                </div>
              </div>

              {/* أزرار التحكم */}
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => handleChatWithAgent(agent)}
                  className="flex-1"
                >
                  <MessageSquare className="w-4 h-4 ml-2" />
                  محادثة
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleAgentAction(agent.id, 'إعدادات')}
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleAgentAction(agent.id, 'تقرير')}
                >
                  <BarChart3 className="w-4 h-4" />
                </Button>
              </div>

              <div className="mt-3 text-xs text-gray-500">
                آخر نشاط: {agent.lastActive}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMonitoring = () => (
    <div className="space-y-6">
      {/* نظرة عامة على النظام */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">صحة النظام</p>
                <p className="text-2xl font-bold text-green-600">{monitoringData.systemHealth}%</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
            <Progress value={monitoringData.systemHealth} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الوكلاء النشطون</p>
                <p className="text-2xl font-bold text-blue-600">{monitoringData.activeAgents}</p>
              </div>
              <Bot className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المهام</p>
                <p className="text-2xl font-bold text-purple-600">{monitoringData.totalTasks}</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط الأداء</p>
                <p className="text-2xl font-bold text-orange-600">{monitoringData.averagePerformance}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
            <Progress value={monitoringData.averagePerformance} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* استخدام الموارد */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            استخدام موارد النظام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">المعالج</span>
                <span className="text-sm font-semibold">{monitoringData.resourceUsage.cpu}%</span>
              </div>
              <Progress value={monitoringData.resourceUsage.cpu} className="h-2" />
              <div className="flex items-center gap-1 mt-1">
                <Cpu className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">CPU</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">الذاكرة</span>
                <span className="text-sm font-semibold">{monitoringData.resourceUsage.memory}%</span>
              </div>
              <Progress value={monitoringData.resourceUsage.memory} className="h-2" />
              <div className="flex items-center gap-1 mt-1">
                <Database className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">RAM</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">الشبكة</span>
                <span className="text-sm font-semibold">{monitoringData.resourceUsage.network}%</span>
              </div>
              <Progress value={monitoringData.resourceUsage.network} className="h-2" />
              <div className="flex items-center gap-1 mt-1">
                <Network className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">Network</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">التخزين</span>
                <span className="text-sm font-semibold">{monitoringData.resourceUsage.storage}%</span>
              </div>
              <Progress value={monitoringData.resourceUsage.storage} className="h-2" />
              <div className="flex items-center gap-1 mt-1">
                <Database className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">Storage</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* التنبيهات */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            التنبيهات النشطة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {monitoringData.alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-gray-500">
                    {alert.timestamp.toLocaleTimeString('ar-SA')}
                    {alert.agentId && ` - ${alert.agentId}`}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  عرض
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>تحليلات الأداء</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">تحليلات متقدمة</h3>
            <p className="text-gray-600">سيتم عرض الرسوم البيانية والتحليلات المفصلة هنا</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <EnhancedHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="max-w-7xl mx-auto p-6 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">وكلاء الذكاء الاصطناعي</h1>
          <p className="text-gray-600">استخدم وكلاء الذكاء الاصطناعي المتقدمين لأتمتة عملياتك التجارية ومراقبة الأداء</p>
        </div>

        {/* علامات التبويب */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              الوكلاء
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              المراقبة الذكية
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              التحليلات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agents">
            {renderAgentsGrid()}
          </TabsContent>

          <TabsContent value="monitoring">
            {renderMonitoring()}
          </TabsContent>

          <TabsContent value="analytics">
            {renderAnalytics()}
          </TabsContent>
        </Tabs>

        {/* الإجراءات السريعة */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => alert('تم بدء تدريب جميع الوكلاء')}
              >
                <Brain className="w-6 h-6" />
                تدريب شامل
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => alert('تم إنشاء تقرير الأداء')}
              >
                <FileText className="w-6 h-6" />
                تقرير الأداء
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => alert('تم تحديث جميع النماذج')}
              >
                <RefreshCw className="w-6 h-6" />
                تحديث النماذج
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => alert('تم تصدير البيانات')}
              >
                <Download className="w-6 h-6" />
                تصدير البيانات
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* نافذة المحادثة */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              محادثة مع {selectedAgent?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedAgent?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col h-96">
            <div className="flex-1 overflow-y-auto p-4 border rounded-lg bg-gray-50 mb-4">
              {chatMessages.map((message) => (
                <div key={message.id} className={`mb-4 ${message.sender === 'أنت' ? 'text-left' : 'text-right'}`}>
                  <div className={`inline-block p-3 rounded-lg max-w-xs ${
                    message.sender === 'أنت' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white border'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('ar-SA')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="اكتب رسالتك هنا..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 text-right"
              />
              <Button onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIAgents;

