import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import EnhancedHeader from '@/components/layout/EnhancedHeader';
import Sidebar from '@/components/layout/Sidebar';
import { 
  Bot, 
  Brain, 
  MessageSquare, 
  Zap,
  Target,
  TrendingUp,
  Users,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Star,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AIAgents = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [agentStatus, setAgentStatus] = useState({});

  const agentCategories = [
    {
      id: 'negotiation',
      title: 'وكلاء التفاوض',
      description: 'وكلاء ذكيون متخصصون في التفاوض التجاري',
      icon: MessageSquare,
      color: 'bg-blue-500',
      agents: [
        {
          id: 'contract-negotiator',
          name: 'مفاوض العقود',
          description: 'متخصص في التفاوض على العقود التجارية والقانونية',
          status: 'active',
          performance: 94,
          tasks: 156,
          successRate: 89
        },
        {
          id: 'price-negotiator',
          name: 'مفاوض الأسعار',
          description: 'خبير في التفاوض على الأسعار والخصومات',
          status: 'active',
          performance: 91,
          tasks: 203,
          successRate: 85
        }
      ]
    },
    {
      id: 'analysis',
      title: 'وكلاء التحليل',
      description: 'وكلاء متخصصون في تحليل البيانات والسوق',
      icon: Brain,
      color: 'bg-purple-500',
      agents: [
        {
          id: 'market-analyzer',
          name: 'محلل السوق',
          description: 'يحلل اتجاهات السوق والفرص الاستثمارية',
          status: 'active',
          performance: 96,
          tasks: 89,
          successRate: 92
        },
        {
          id: 'risk-analyzer',
          name: 'محلل المخاطر',
          description: 'يقيم المخاطر المالية والتجارية',
          status: 'training',
          performance: 88,
          tasks: 67,
          successRate: 87
        }
      ]
    },
    {
      id: 'automation',
      title: 'وكلاء الأتمتة',
      description: 'وكلاء لأتمتة العمليات التجارية',
      icon: Zap,
      color: 'bg-green-500',
      agents: [
        {
          id: 'workflow-automator',
          name: 'مؤتمت سير العمل',
          description: 'يؤتمت العمليات التجارية المتكررة',
          status: 'active',
          performance: 93,
          tasks: 312,
          successRate: 96
        },
        {
          id: 'document-processor',
          name: 'معالج المستندات',
          description: 'يعالج ويصنف المستندات تلقائياً',
          status: 'active',
          performance: 90,
          tasks: 445,
          successRate: 94
        }
      ]
    },
    {
      id: 'customer',
      title: 'وكلاء خدمة العملاء',
      description: 'وكلاء لتحسين تجربة العملاء',
      icon: Users,
      color: 'bg-orange-500',
      agents: [
        {
          id: 'support-agent',
          name: 'وكيل الدعم',
          description: 'يقدم الدعم الفني والمساعدة للعملاء',
          status: 'active',
          performance: 95,
          tasks: 567,
          successRate: 91
        },
        {
          id: 'sales-agent',
          name: 'وكيل المبيعات',
          description: 'يساعد في عمليات البيع والتسويق',
          status: 'active',
          performance: 87,
          tasks: 234,
          successRate: 83
        }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'training': return 'تدريب';
      case 'inactive': return 'غير نشط';
      default: return 'غير محدد';
    }
  };

  const handleAgentChat = (agent) => {
    setSelectedAgent(agent);
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        text: chatMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('ar-SA')
      };
      
      setChatHistory(prev => [...prev, newMessage]);
      
      // محاكاة رد الوكيل
      setTimeout(() => {
        const agentReply = {
          id: Date.now() + 1,
          text: `شكراً لك على رسالتك. أنا ${selectedAgent.name} وسأساعدك في ${selectedAgent.description}. كيف يمكنني مساعدتك اليوم؟`,
          sender: 'agent',
          timestamp: new Date().toLocaleTimeString('ar-SA')
        };
        setChatHistory(prev => [...prev, agentReply]);
      }, 1000);
      
      setChatMessage('');
    }
  };

  const toggleAgentStatus = (agentId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    setAgentStatus(prev => ({
      ...prev,
      [agentId]: newStatus
    }));
  };

  const handleAgentSettings = (agent) => {
    alert(`إعدادات ${agent.name} - هذه الوظيفة قيد التطوير`);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <EnhancedHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {user && <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />}
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">وكلاء الذكاء الاصطناعي</h1>
          </div>
          <p className="text-gray-600 text-lg">
            استخدم وكلاء الذكاء الاصطناعي المتقدمين لأتمتة وتحسين عملياتك التجارية
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الوكلاء النشطون</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
                <Bot className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">المهام المكتملة</p>
                  <p className="text-2xl font-bold text-gray-900">2,073</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">معدل النجاح</p>
                  <p className="text-2xl font-bold text-gray-900">91%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الوقت المُوفر</p>
                  <p className="text-2xl font-bold text-gray-900">156 ساعة</p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Categories */}
        <div className="space-y-8">
          {agentCategories.map((category) => (
            <div key={category.id}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.agents.map((agent) => (
                  <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <Badge className={getStatusColor(agent.status)}>
                          {getStatusText(agent.status)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{agent.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Performance Metrics */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-sm text-gray-600">الأداء</p>
                            <p className="text-lg font-bold text-blue-600">{agent.performance}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">المهام</p>
                            <p className="text-lg font-bold text-green-600">{agent.tasks}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">النجاح</p>
                            <p className="text-lg font-bold text-purple-600">{agent.successRate}%</p>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleAgentChat(agent)}
                          >
                            <MessageSquare className="w-4 h-4 ml-2" />
                            محادثة
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAgentSettings(agent)}
                          >
                            <Settings className="w-4 h-4 ml-2" />
                            إعدادات
                          </Button>
                          {(agentStatus[agent.id] || agent.status) === 'active' ? (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => toggleAgentStatus(agent.id, agentStatus[agent.id] || agent.status)}
                            >
                              <Pause className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => toggleAgentStatus(agent.id, agentStatus[agent.id] || agent.status)}
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Modal */}
        {selectedAgent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">محادثة مع {selectedAgent.name}</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSelectedAgent(null);
                    setChatHistory([]);
                  }}
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="h-64 bg-gray-50 rounded-lg p-4 overflow-y-auto">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-gray-500 text-sm">
                      ابدأ محادثة مع الوكيل الذكي
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {chatHistory.map((message) => (
                        <div
                          key={message.id}
                          className={`p-3 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-blue-100 text-blue-900 ml-8'
                              : 'bg-green-100 text-green-900 mr-8'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="اكتب رسالتك هنا..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage}>
                    إرسال
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">إجراءات سريعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => alert('تدريب وكيل جديد - هذه الوظيفة قيد التطوير')}
            >
              <CardContent className="pt-6 text-center">
                <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">تدريب وكيل جديد</h3>
                <p className="text-gray-600 text-sm">قم بتدريب وكيل ذكي جديد على بياناتك</p>
              </CardContent>
            </Card>
            
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => {
                const reportData = {
                  totalAgents: 8,
                  activeTasks: 2073,
                  successRate: 91,
                  timeSaved: 156
                };
                alert(`تقرير الأداء:\nالوكلاء النشطون: ${reportData.totalAgents}\nالمهام المكتملة: ${reportData.activeTasks}\nمعدل النجاح: ${reportData.successRate}%\nالوقت المُوفر: ${reportData.timeSaved} ساعة`);
              }}
            >
              <CardContent className="pt-6 text-center">
                <Download className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">تصدير التقارير</h3>
                <p className="text-gray-600 text-sm">احصل على تقارير مفصلة عن أداء الوكلاء</p>
              </CardContent>
            </Card>
            
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => alert('إعادة تدريب الوكلاء - سيتم تحسين الأداء خلال 24 ساعة')}
            >
              <CardContent className="pt-6 text-center">
                <RotateCcw className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">إعادة تدريب</h3>
                <p className="text-gray-600 text-sm">حسّن أداء الوكلاء بإعادة التدريب</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgents;

