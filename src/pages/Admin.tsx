import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Application {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  loan_amount: number;
  loan_term: number;
  purpose: string;
  status: string;
  created_at: string;
}

export default function Admin() {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'XaNCda232$$') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      fetchApplications();
    } else {
      toast({
        title: "Ошибка",
        description: "Неверный пароль",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
    setPassword('');
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://functions.poehali.dev/cda334e0-8b03-42ff-9317-1ae302d4d165');
      const data = await response.json();
      
      if (data.success) {
        setApplications(data.applications);
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить заявки",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось подключиться к серверу",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/3e901587-4039-472b-b6cb-e8aa567067d5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setApplications(applications.map(app => 
          app.id === id ? { ...app, status: newStatus } : app
        ));
        toast({
          title: "Успешно",
          description: "Статус заявки изменён",
        });
      } else {
        toast({
          title: "Ошибка",
          description: data.error || "Не удалось изменить статус",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось подключиться к серверу",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchApplications();
    } else {
      setLoading(false);
    }
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'new': 'default',
      'processing': 'secondary',
      'approved': 'outline',
      'rejected': 'destructive'
    };
    
    const labels: Record<string, string> = {
      'new': 'Новая',
      'processing': 'В обработке',
      'approved': 'Одобрено',
      'rejected': 'Отклонено'
    };
    
    return <Badge variant={variants[status] || 'default'}>{labels[status] || status}</Badge>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatAmount = (amount: number) => {
    return amount ? amount.toLocaleString('ru-RU') + ' ₽' : '—';
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Icon name="Lock" size={48} className="mx-auto mb-4 text-primary" />
            <CardTitle className="text-2xl">Вход в админ-панель</CardTitle>
            <CardDescription>
              Введите пароль для доступа к управлению заявками
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <Icon name="LogIn" className="mr-2" size={16} />
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Building2" size={32} className="text-primary" />
            <div>
              <h1 className="text-xl font-bold">Админ-панель</h1>
              <p className="text-xs text-muted-foreground">ООО МФО "Рассрочка без процентов"</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <a href="/">
                <Icon name="Home" className="mr-2" size={16} />
                На главную
              </a>
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <Icon name="LogOut" className="mr-2" size={16} />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Заявки на кредит</h2>
              <p className="text-muted-foreground">Всего заявок: {applications.length}</p>
            </div>
            <Button onClick={fetchApplications} disabled={loading}>
              <Icon name="RefreshCw" className="mr-2" size={16} />
              Обновить
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Список заявок</CardTitle>
              <CardDescription>
                Заявки отображаются в порядке поступления (новые сверху)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-12">
                  <Icon name="Loader2" className="animate-spin mx-auto mb-4 text-primary" size={48} />
                  <p className="text-muted-foreground">Загрузка заявок...</p>
                </div>
              ) : applications.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Inbox" className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <p className="text-muted-foreground">Заявок пока нет</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">ID</TableHead>
                        <TableHead>ФИО</TableHead>
                        <TableHead>Телефон</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Сумма</TableHead>
                        <TableHead className="text-center">Срок</TableHead>
                        <TableHead>Цель</TableHead>
                        <TableHead className="text-center w-48">Статус</TableHead>
                        <TableHead>Дата</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((app) => (
                        <TableRow key={app.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">#{app.id}</TableCell>
                          <TableCell className="font-medium">{app.full_name}</TableCell>
                          <TableCell>
                            <a href={`tel:${app.phone}`} className="text-primary hover:underline flex items-center gap-1">
                              <Icon name="Phone" size={14} />
                              {app.phone}
                            </a>
                          </TableCell>
                          <TableCell>
                            <a href={`mailto:${app.email}`} className="text-primary hover:underline flex items-center gap-1">
                              <Icon name="Mail" size={14} />
                              {app.email}
                            </a>
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            {formatAmount(app.loan_amount)}
                          </TableCell>
                          <TableCell className="text-center">
                            {app.loan_term ? `${app.loan_term} мес.` : '—'}
                          </TableCell>
                          <TableCell className="max-w-xs truncate" title={app.purpose || '—'}>
                            {app.purpose || '—'}
                          </TableCell>
                          <TableCell className="text-center">
                            <Select 
                              value={app.status} 
                              onValueChange={(value) => updateStatus(app.id, value)}
                            >
                              <SelectTrigger className="w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">
                                  <span className="flex items-center gap-2">
                                    <Icon name="Circle" size={12} className="text-blue-500" />
                                    Новая
                                  </span>
                                </SelectItem>
                                <SelectItem value="processing">
                                  <span className="flex items-center gap-2">
                                    <Icon name="Clock" size={12} className="text-yellow-500" />
                                    В обработке
                                  </span>
                                </SelectItem>
                                <SelectItem value="approved">
                                  <span className="flex items-center gap-2">
                                    <Icon name="CheckCircle" size={12} className="text-green-500" />
                                    Одобрено
                                  </span>
                                </SelectItem>
                                <SelectItem value="rejected">
                                  <span className="flex items-center gap-2">
                                    <Icon name="XCircle" size={12} className="text-red-500" />
                                    Отклонено
                                  </span>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                            {formatDate(app.created_at)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {applications.filter(app => app.status === 'new').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Новых</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-3xl font-bold text-secondary mb-1">
                    {applications.filter(app => app.status === 'processing').length}
                  </div>
                  <p className="text-sm text-muted-foreground">В обработке</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {applications.filter(app => app.status === 'approved').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Одобрено</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-3xl font-bold text-destructive mb-1">
                    {applications.filter(app => app.status === 'rejected').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Отклонено</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}