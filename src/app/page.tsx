"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Play, DollarSign, CreditCard, Youtube, Music, Film, Tv, Eye, TrendingUp, Wallet, Plus, Settings } from 'lucide-react'

interface WatchedContent {
  id: string
  title: string
  type: 'youtube' | 'serie' | 'musica' | 'filme'
  duration: number
  earnings: number
  timestamp: Date
  platform: string
}

interface BankAccount {
  id: string
  bank: string
  account: string
  balance: number
}

export default function MonetizationApp() {
  const [totalEarnings, setTotalEarnings] = useState(247.85)
  const [todayEarnings, setTodayEarnings] = useState(12.40)
  const [watchedToday, setWatchedToday] = useState(8)
  const [isWatching, setIsWatching] = useState(false)
  const [currentContent, setCurrentContent] = useState<string>('')
  const [watchTime, setWatchTime] = useState(0)
  const [bankAccount, setBankAccount] = useState<BankAccount | null>({
    id: '1',
    bank: 'Banco do Brasil',
    account: '**** 1234',
    balance: 247.85
  })

  const [watchedContent, setWatchedContent] = useState<WatchedContent[]>([
    {
      id: '1',
      title: 'Como Ganhar Dinheiro Online',
      type: 'youtube',
      duration: 15,
      earnings: 2.50,
      timestamp: new Date(),
      platform: 'YouTube'
    },
    {
      id: '2',
      title: 'Stranger Things S4E1',
      type: 'serie',
      duration: 45,
      earnings: 7.20,
      timestamp: new Date(Date.now() - 3600000),
      platform: 'Netflix'
    },
    {
      id: '3',
      title: 'Imagine Dragons - Bones',
      type: 'musica',
      duration: 3,
      earnings: 0.80,
      timestamp: new Date(Date.now() - 7200000),
      platform: 'Spotify'
    }
  ])

  const [newContent, setNewContent] = useState({
    title: '',
    type: 'youtube' as const,
    platform: '',
    url: ''
  })

  // Simulação de assistir conteúdo
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isWatching && currentContent) {
      interval = setInterval(() => {
        setWatchTime(prev => prev + 1)
        // Simula ganhos por segundo (R$ 0.01 por segundo)
        const earnings = watchTime * 0.01
        setTodayEarnings(prev => prev + 0.01)
        setTotalEarnings(prev => prev + 0.01)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isWatching, currentContent, watchTime])

  const startWatching = () => {
    if (currentContent) {
      setIsWatching(true)
      setWatchTime(0)
    }
  }

  const stopWatching = () => {
    if (isWatching && currentContent) {
      const earnings = watchTime * 0.01
      const newWatchedItem: WatchedContent = {
        id: Date.now().toString(),
        title: currentContent,
        type: 'youtube',
        duration: Math.floor(watchTime / 60),
        earnings: earnings,
        timestamp: new Date(),
        platform: 'Manual'
      }
      setWatchedContent(prev => [newWatchedItem, ...prev])
      setWatchedToday(prev => prev + 1)
    }
    setIsWatching(false)
    setCurrentContent('')
    setWatchTime(0)
  }

  const addContent = () => {
    if (newContent.title) {
      // Simula assistir o conteúdo automaticamente
      const duration = Math.floor(Math.random() * 60) + 5 // 5-65 minutos
      const earnings = duration * 0.16 // R$ 0.16 por minuto
      
      const contentItem: WatchedContent = {
        id: Date.now().toString(),
        title: newContent.title,
        type: newContent.type,
        duration: duration,
        earnings: earnings,
        timestamp: new Date(),
        platform: newContent.platform || 'Manual'
      }
      
      setWatchedContent(prev => [contentItem, ...prev])
      setTodayEarnings(prev => prev + earnings)
      setTotalEarnings(prev => prev + earnings)
      setWatchedToday(prev => prev + 1)
      
      setNewContent({ title: '', type: 'youtube', platform: '', url: '' })
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'youtube': return <Youtube className="w-4 h-4" />
      case 'serie': return <Tv className="w-4 h-4" />
      case 'musica': return <Music className="w-4 h-4" />
      case 'filme': return <Film className="w-4 h-4" />
      default: return <Play className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'youtube': return 'bg-red-500'
      case 'serie': return 'bg-purple-500'
      case 'musica': return 'bg-green-500'
      case 'filme': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            MoneyWatch
          </h1>
          <p className="text-gray-600">Ganhe dinheiro assistindo seus conteúdos favoritos</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Total Ganho
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {totalEarnings.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {todayEarnings.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Assistidos Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{watchedToday}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Saldo Banco
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {bankAccount?.balance.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="watch" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="watch">Assistir</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="bank">Conta Bancária</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="watch" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Watch Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Assistir Agora
                  </CardTitle>
                  <CardDescription>
                    Cole o link ou digite o nome do conteúdo para começar a ganhar
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="content">Conteúdo</Label>
                    <Input
                      id="content"
                      placeholder="Ex: Nome do vídeo, série, música..."
                      value={currentContent}
                      onChange={(e) => setCurrentContent(e.target.value)}
                      disabled={isWatching}
                    />
                  </div>

                  {isWatching && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Assistindo: {Math.floor(watchTime / 60)}:{(watchTime % 60).toString().padStart(2, '0')}</span>
                        <span className="text-green-600 font-medium">+R$ {(watchTime * 0.01).toFixed(2)}</span>
                      </div>
                      <Progress value={(watchTime % 60) * 100 / 60} className="h-2" />
                    </div>
                  )}

                  <div className="flex gap-2">
                    {!isWatching ? (
                      <Button onClick={startWatching} disabled={!currentContent} className="flex-1">
                        <Play className="w-4 h-4 mr-2" />
                        Começar a Assistir
                      </Button>
                    ) : (
                      <Button onClick={stopWatching} variant="destructive" className="flex-1">
                        Parar e Registrar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Add Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Adicionar Conteúdo
                  </CardTitle>
                  <CardDescription>
                    Registre conteúdo que você já assistiu
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      placeholder="Nome do conteúdo"
                      value={newContent.title}
                      onChange={(e) => setNewContent(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo</Label>
                      <Select value={newContent.type} onValueChange={(value: any) => setNewContent(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="serie">Série</SelectItem>
                          <SelectItem value="musica">Música</SelectItem>
                          <SelectItem value="filme">Filme</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="platform">Plataforma</Label>
                      <Input
                        id="platform"
                        placeholder="Ex: Netflix, Spotify"
                        value={newContent.platform}
                        onChange={(e) => setNewContent(prev => ({ ...prev, platform: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Button onClick={addContent} disabled={!newContent.title} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar e Ganhar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Conteúdo Assistido</CardTitle>
                <CardDescription>
                  Todos os conteúdos que você assistiu e seus ganhos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {watchedContent.map((content) => (
                    <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${getTypeColor(content.type)} text-white`}>
                          {getTypeIcon(content.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{content.title}</h4>
                          <p className="text-sm text-gray-500">
                            {content.platform} • {content.duration} min • {content.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">+R$ {content.earnings.toFixed(2)}</div>
                        <Badge variant="secondary" className="text-xs">
                          {content.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bank" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Conta Bancária Conectada
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {bankAccount ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{bankAccount.bank}</h3>
                            <p className="text-sm text-gray-500">Conta: {bankAccount.account}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              R$ {bankAccount.balance.toFixed(2)}
                            </div>
                            <p className="text-xs text-gray-500">Saldo disponível</p>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full" variant="outline">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Sacar Ganhos
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <p className="text-gray-500">Nenhuma conta bancária conectada</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Conectar Conta Bancária
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Conectar Conta Bancária</DialogTitle>
                            <DialogDescription>
                              Conecte sua conta para receber os ganhos automaticamente
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="bank">Banco</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione seu banco" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="bb">Banco do Brasil</SelectItem>
                                  <SelectItem value="caixa">Caixa Econômica</SelectItem>
                                  <SelectItem value="itau">Itaú</SelectItem>
                                  <SelectItem value="bradesco">Bradesco</SelectItem>
                                  <SelectItem value="santander">Santander</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="agency">Agência</Label>
                              <Input id="agency" placeholder="0000" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="account">Conta</Label>
                              <Input id="account" placeholder="00000-0" />
                            </div>
                            <Button className="w-full">
                              Conectar Conta
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas de Ganhos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">YouTube</span>
                      <span className="text-sm font-medium">R$ 45.30</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Séries</span>
                      <span className="text-sm font-medium">R$ 128.50</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Músicas</span>
                      <span className="text-sm font-medium">R$ 32.15</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Filmes</span>
                      <span className="text-sm font-medium">R$ 41.90</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Configurações de Monetização
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Taxa por Minuto</h4>
                      <p className="text-sm text-gray-500">Valor ganho por minuto assistido</p>
                    </div>
                    <Badge variant="secondary">R$ 0,16/min</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Saque Mínimo</h4>
                      <p className="text-sm text-gray-500">Valor mínimo para saque</p>
                    </div>
                    <Badge variant="secondary">R$ 50,00</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Saque Automático</h4>
                      <p className="text-sm text-gray-500">Transferir automaticamente quando atingir o mínimo</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Ativado
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}