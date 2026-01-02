import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function Index() {
  const { toast } = useToast();
  const [loanAmount, setLoanAmount] = useState(100000);
  const [loanTerm, setLoanTerm] = useState(12);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    amount: '',
    term: '',
    purpose: ''
  });

  const calculateMonthlyPayment = () => {
    return Math.round(loanAmount / loanTerm);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Наш менеджер свяжется с вами в ближайшее время.",
    });
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      amount: '',
      term: '',
      purpose: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Building2" size={32} className="text-primary" />
            <div>
              <h1 className="text-xl font-bold">Рассрочка без процентов</h1>
              <p className="text-xs text-muted-foreground">ООО МФО</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#calculator" className="text-sm font-medium hover:text-primary transition-colors">Калькулятор</a>
            <a href="#conditions" className="text-sm font-medium hover:text-primary transition-colors">Условия</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О компании</a>
            <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="hidden md:flex">
                Оставить заявку
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Заявка на кредит</DialogTitle>
                <DialogDescription>
                  Заполните форму, и мы свяжемся с вами в течение 15 минут
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">ФИО</Label>
                  <Input
                    id="fullName"
                    placeholder="Иванов Иван Иванович"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@mail.ru"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Сумма кредита</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="100000"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="term">Срок (мес.)</Label>
                    <Input
                      id="term"
                      type="number"
                      placeholder="12"
                      value={formData.term}
                      onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purpose">Цель кредита</Label>
                  <Textarea
                    id="purpose"
                    placeholder="На что планируете потратить деньги?"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Отправить заявку
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Кредит наличными
              <span className="block text-primary mt-2">без лишних вопросов</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Получите деньги уже сегодня. Минимум документов, быстрое одобрение, прозрачные условия.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-lg px-8 py-6">
                    <Icon name="FileText" className="mr-2" size={20} />
                    Подать заявку
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Заявка на кредит</DialogTitle>
                    <DialogDescription>
                      Заполните форму, и мы свяжемся с вами в течение 15 минут
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmitApplication} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName2">ФИО</Label>
                      <Input
                        id="fullName2"
                        placeholder="Иванов Иван Иванович"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone2">Телефон</Label>
                      <Input
                        id="phone2"
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email2">Email</Label>
                      <Input
                        id="email2"
                        type="email"
                        placeholder="example@mail.ru"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount2">Сумма кредита</Label>
                        <Input
                          id="amount2"
                          type="number"
                          placeholder="100000"
                          value={formData.amount}
                          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="term2">Срок (мес.)</Label>
                        <Input
                          id="term2"
                          type="number"
                          placeholder="12"
                          value={formData.term}
                          onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="purpose2">Цель кредита</Label>
                      <Textarea
                        id="purpose2"
                        placeholder="На что планируете потратить деньги?"
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Отправить заявку
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <a href="#calculator">
                  <Icon name="Calculator" className="mr-2" size={20} />
                  Рассчитать платёж
                </a>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Clock" className="text-primary" size={24} />
                </div>
                <CardTitle>Быстрое решение</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Одобрение за 15 минут, деньги в день обращения</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="ShieldCheck" className="text-primary" size={24} />
                </div>
                <CardTitle>Надёжность</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Официальная МФО, лицензия ЦБ РФ, прозрачные условия</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="FileCheck" className="text-primary" size={24} />
                </div>
                <CardTitle>Минимум документов</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Только паспорт и второй документ на выбор</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Калькулятор кредита</h2>
              <p className="text-muted-foreground">Рассчитайте ежемесячный платёж и получите предварительное одобрение</p>
            </div>
            <Card className="shadow-xl">
              <CardContent className="pt-6">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-base">Сумма кредита</Label>
                      <span className="text-2xl font-bold text-primary">{loanAmount.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <Slider
                      value={[loanAmount]}
                      onValueChange={(value) => setLoanAmount(value[0])}
                      min={10000}
                      max={500000}
                      step={5000}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>10 000 ₽</span>
                      <span>500 000 ₽</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-base">Срок кредита</Label>
                      <span className="text-2xl font-bold text-primary">{loanTerm} мес.</span>
                    </div>
                    <Slider
                      value={[loanTerm]}
                      onValueChange={(value) => setLoanTerm(value[0])}
                      min={3}
                      max={36}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>3 месяца</span>
                      <span>36 месяцев</span>
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-6 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Ежемесячный платёж:</span>
                      <span className="text-3xl font-bold text-primary">{calculateMonthlyPayment().toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Процентная ставка:</span>
                      <span className="font-semibold">0%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Переплата:</span>
                      <span className="font-semibold">0 ₽</span>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" size="lg">
                        Получить кредит на этих условиях
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Заявка на кредит</DialogTitle>
                        <DialogDescription>
                          Сумма: {loanAmount.toLocaleString('ru-RU')} ₽ на {loanTerm} мес. • Платёж: {calculateMonthlyPayment().toLocaleString('ru-RU')} ₽/мес
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmitApplication} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName3">ФИО</Label>
                          <Input
                            id="fullName3"
                            placeholder="Иванов Иван Иванович"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone3">Телефон</Label>
                          <Input
                            id="phone3"
                            type="tel"
                            placeholder="+7 (999) 123-45-67"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email3">Email</Label>
                          <Input
                            id="email3"
                            type="email"
                            placeholder="example@mail.ru"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full" size="lg">
                          Отправить заявку
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="conditions" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Условия кредитования</h2>
              <p className="text-muted-foreground">Честные и прозрачные условия для каждого клиента</p>
            </div>
            <Tabs defaultValue="standard" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="standard">Стандартные условия</TabsTrigger>
                <TabsTrigger value="requirements">Требования</TabsTrigger>
              </TabsList>
              <TabsContent value="standard">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Percent" className="text-primary" />
                        Процентная ставка
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">От</span>
                        <span className="font-bold text-xl">0%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">При оформлении рассрочки на товары и услуги партнёров</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Wallet" className="text-primary" />
                        Сумма кредита
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">От 10 000 ₽</span>
                        <span className="font-bold text-xl">до 500 000 ₽</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Сумма зависит от платёжеспособности и кредитной истории</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Calendar" className="text-primary" />
                        Срок кредита
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">От 3 месяцев</span>
                        <span className="font-bold text-xl">до 36 месяцев</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Выбирайте удобный срок погашения кредита</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Zap" className="text-primary" />
                        Досрочное погашение
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Без ограничений</span>
                        <span className="font-bold text-xl">Без штрафов</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Погашайте кредит досрочно в любое время без дополнительных комиссий</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="requirements">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="User" className="text-primary" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Возраст</h3>
                          <p className="text-muted-foreground">От 18 до 75 лет на момент окончания кредита</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="MapPin" className="text-primary" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Гражданство и регистрация</h3>
                          <p className="text-muted-foreground">Гражданство РФ, постоянная или временная регистрация</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="FileText" className="text-primary" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Документы</h3>
                          <p className="text-muted-foreground">Паспорт РФ + один документ на выбор (СНИЛС, водительские права, ИНН, полис ОМС)</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Briefcase" className="text-primary" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Доход</h3>
                          <p className="text-muted-foreground">Официальный или неофициальный доход, достаточный для погашения кредита</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Phone" className="text-primary" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Контакты</h3>
                          <p className="text-muted-foreground">Действующий номер телефона и адрес электронной почты</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">О компании</h2>
              <p className="text-muted-foreground">Ваш надёжный партнёр в мире финансов</p>
            </div>
            <Card className="shadow-xl">
              <CardContent className="pt-6 space-y-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">ООО МФО "Рассрочка без процентов"</span> — современная микрофинансовая организация, работающая на рынке с 2018 года. Мы специализируемся на предоставлении доступных кредитных решений для физических лиц.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Наша миссия — сделать финансовые услуги простыми, понятными и доступными каждому. Мы гордимся тем, что помогли более 50 000 клиентам достичь своих целей.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">50 000+</div>
                    <p className="text-sm text-muted-foreground">Довольных клиентов</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">6 лет</div>
                    <p className="text-sm text-muted-foreground">На рынке</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">98%</div>
                    <p className="text-sm text-muted-foreground">Одобрения заявок</p>
                  </div>
                </div>

                <div className="pt-6 border-t space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon name="Award" className="text-primary" size={20} />
                    <span className="text-sm">Лицензия Центрального Банка РФ</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Shield" className="text-primary" size={20} />
                    <span className="text-sm">Член саморегулируемой организации МФО</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Lock" className="text-primary" size={20} />
                    <span className="text-sm">Защита персональных данных по стандарту 152-ФЗ</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Контакты</h2>
              <p className="text-muted-foreground">Свяжитесь с нами любым удобным способом</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Центральный офис</CardTitle>
                  <CardDescription>г. Москва</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <Icon name="MapPin" className="text-primary flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-medium">Адрес</p>
                      <p className="text-sm text-muted-foreground">г. Москва, ул. Тверская, д. 1, офис 101</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Icon name="Clock" className="text-primary flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-medium">Режим работы</p>
                      <p className="text-sm text-muted-foreground">Пн-Пт: 9:00 - 20:00</p>
                      <p className="text-sm text-muted-foreground">Сб-Вс: 10:00 - 18:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Связаться с нами</CardTitle>
                  <CardDescription>Мы всегда на связи</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <Icon name="Phone" className="text-primary flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-medium">Телефон</p>
                      <a href="tel:88001234567" className="text-sm text-primary hover:underline">8 (800) 123-45-67</a>
                      <p className="text-xs text-muted-foreground">Звонок по России бесплатный</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Icon name="Mail" className="text-primary flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:info@rassrochka-mfo.ru" className="text-sm text-primary hover:underline">info@rassrochka-mfo.ru</a>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Icon name="MessageCircle" className="text-primary flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-medium">Онлайн-консультант</p>
                      <p className="text-sm text-muted-foreground">Ответим на все вопросы в чате</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">Остались вопросы?</h3>
                  <p className="text-muted-foreground">Оставьте заявку, и наш специалист свяжется с вами в течение 15 минут</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg">
                        <Icon name="Send" className="mr-2" size={20} />
                        Задать вопрос
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Задать вопрос</DialogTitle>
                        <DialogDescription>
                          Наш специалист свяжется с вами и ответит на все вопросы
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmitApplication} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName4">ФИО</Label>
                          <Input
                            id="fullName4"
                            placeholder="Иванов Иван Иванович"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone4">Телефон</Label>
                          <Input
                            id="phone4"
                            type="tel"
                            placeholder="+7 (999) 123-45-67"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="question">Ваш вопрос</Label>
                          <Textarea
                            id="question"
                            placeholder="Опишите ваш вопрос..."
                            value={formData.purpose}
                            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                            rows={4}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full" size="lg">
                          Отправить вопрос
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Building2" size={24} />
                  <span className="font-bold">Рассрочка без процентов</span>
                </div>
                <p className="text-sm opacity-90">
                  ООО МФО "Рассрочка без процентов"
                </p>
                <p className="text-sm opacity-90 mt-2">
                  ИНН: 7700123456<br />
                  ОГРН: 1234567890123
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Навигация</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#calculator" className="opacity-90 hover:opacity-100 transition-opacity">Калькулятор</a></li>
                  <li><a href="#conditions" className="opacity-90 hover:opacity-100 transition-opacity">Условия</a></li>
                  <li><a href="#about" className="opacity-90 hover:opacity-100 transition-opacity">О компании</a></li>
                  <li><a href="#contacts" className="opacity-90 hover:opacity-100 transition-opacity">Контакты</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Контакты</h3>
                <ul className="space-y-2 text-sm">
                  <li className="opacity-90">8 (800) 123-45-67</li>
                  <li className="opacity-90">info@rassrochka-mfo.ru</li>
                  <li className="opacity-90">г. Москва, ул. Тверская, д. 1</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm opacity-75">
              <p>© 2024 ООО МФО "Рассрочка без процентов". Все права защищены.</p>
              <p className="mt-2">Информация, представленная на сайте, не является публичной офертой.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
