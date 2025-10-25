import { useParams } from "react-router"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Zap, Brain, Gauge, Users, Star, Award } from "lucide-react"
import { useHeroInformation } from "@/heroes/hooks/useHeroInformation"
import { NotFoundPage } from "@/NotFoundPages/NotFoundPage"
import { useState } from "react"

export const HeroPage = () => {

  const { idSlug = '' } = useParams();
  const { data: superheroData } = useHeroInformation(idSlug);

  const [selectTab, setSelectTab] = useState('stats');

  const totalPower = superheroData ? (superheroData.strength + superheroData.intelligence + superheroData.speed + superheroData.durability) : 0;

  const averagePower = Math.round((totalPower / 4) * 10)

  return (
    <>
      {superheroData ? (<div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <img
                  src={superheroData.image}
                  alt={superheroData.alias}
                  width={200}
                  height={200}
                  className="rounded-full border-4 border-white/20 shadow-2xl"
                />
                <div className="absolute -top-2 -right-2">
                  <div className="bg-yellow-400 text-black rounded-full p-2">
                    <Star className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  <Badge className={`${superheroData.category === 'hero' ? 'bg-blue-500' : 'bg-red-500'} text-white`}>
                    {superheroData.category}
                  </Badge>
                  <Badge className={`${superheroData.status === 'Active' ? ' bg-green-500' : 'bg-red-500'} text-white`}>{superheroData.status}</Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {superheroData.universe}
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-2">{superheroData.alias}</h1>
                <p className="text-xl text-blue-200 mb-4">{superheroData.name}</p>
                <p className="text-lg text-gray-300 max-w-2xl">{superheroData.description}</p>
              </div>

              <div className="text-center">
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-yellow-400">{averagePower}%</div>
                  <div className="text-sm text-gray-300">Nivel de Poder</div>
                  <div className="flex justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(averagePower / 20) ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">

          <div className="sm:hidden mb-4">
            <select
              value={selectTab}
              onChange={(e) => { setSelectTab(e.target.value) }}
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="stats">📊 Estadísticas</option>
              <option value="powers">⚡ Poderes</option>
              <option value="team">👥 Equipo</option>
              <option value="info">🏆 Información</option>
            </select>
          </div>

          <Tabs value={selectTab} className="w-full">

            <div className="hidden sm:block">

              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="stats" onClick={() => setSelectTab('stats')} className="flex items-center gap-2">
                  <Gauge className="w-4 h-4" />
                  Estadísticas
                </TabsTrigger>
                <TabsTrigger value="powers" onClick={() => setSelectTab('powers')} className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Poderes
                </TabsTrigger>
                <TabsTrigger value="team" onClick={() => setSelectTab('team')} className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Equipo
                </TabsTrigger>
                <TabsTrigger value="info" onClick={() => setSelectTab('info')} className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Información
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Strength */}
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="bg-red-100 p-3 rounded-full">
                        <Zap className="w-8 h-8 text-red-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Fuerza</h3>
                    <div className="text-3xl font-bold text-red-600 mb-2">{superheroData.strength}</div>
                    <Progress value={superheroData.strength * 10} className="h-2" activeColor='bg-red-600' />
                  </CardContent>
                </Card>

                {/* Intelligence */}
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <Brain className="w-8 h-8 text-purple-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Inteligencia</h3>
                    <div className="text-3xl font-bold text-purple-600 mb-2">{superheroData.intelligence}</div>
                    <Progress value={superheroData.intelligence * 10} className="h-2" activeColor='bg-purple-600' />
                  </CardContent>
                </Card>

                {/* Speed */}
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="bg-yellow-100 p-3 rounded-full">
                        <Gauge className="w-8 h-8 text-yellow-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Velocidad</h3>
                    <div className="text-3xl font-bold text-yellow-600 mb-2">{superheroData.speed}</div>
                    <Progress value={superheroData.speed * 10} className="h-2" activeColor='bg-yellow-600' />
                  </CardContent>
                </Card>

                {/* Durability */}
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <Shield className="w-8 h-8 text-green-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Resistencia</h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">{superheroData.durability}</div>
                    <Progress value={superheroData.durability * 10} className="h-2" activeColor='bg-green-600' />
                  </CardContent>
                </Card>
              </div>

              {/* Power Comparison Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Comparación de Habilidades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium">Fuerza</div>
                      <div className="flex-1">
                        <Progress value={superheroData.strength * 10} className="h-4" activeColor="bg-red-600" />
                      </div>
                      <div className="w-12 text-right font-bold">{superheroData.strength}/10</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium">Inteligencia</div>
                      <div className="flex-1">
                        <Progress value={superheroData.intelligence * 10} className="h-4" activeColor="bg-purple-600" />
                      </div>
                      <div className="w-12 text-right font-bold">{superheroData.intelligence}/10</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium">Velocidad</div>
                      <div className="flex-1">
                        <Progress value={superheroData.speed * 10} className="h-4" activeColor="bg-yellow-600" />
                      </div>
                      <div className="w-12 text-right font-bold">{superheroData.speed}/10</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium">Resistencia</div>
                      <div className="flex-1">
                        <Progress value={superheroData.durability * 10} className="h-4" activeColor="bg-green-600" />
                      </div>
                      <div className="w-12 text-right font-bold">{superheroData.durability}/10</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="powers">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-500" />
                    Superpoderes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {superheroData.powers.map((power, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-500 p-2 rounded-full">
                            <Zap className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-blue-900">{power}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-6 h-6 text-green-500" />
                    Afiliación de Equipo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="bg-green-100 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-700 mb-2">{superheroData.team}</h3>
                    <p className="text-gray-600">Miembro activo del equipo de superhéroes más poderoso</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="info">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Detalles Personales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Nombre Real:</span>
                      <span className="font-semibold">{superheroData.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Alias:</span>
                      <span className="font-semibold">{superheroData.alias}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Categoría:</span>
                      <Badge className={`${superheroData.category === 'hero' ? 'bg-blue-500' : 'bg-red-500'} text-white`}>
                        {superheroData.category}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Estado:</span>
                      <Badge className={`${superheroData.status === 'Active' ? ' bg-green-500' : 'bg-red-500'} text-white`}>
                        {superheroData.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Información del Universo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Universo:</span>
                      <span className="font-semibold">{superheroData.universe}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Primera Aparición:</span>
                      <span className="font-semibold">{superheroData.firstAppearance}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Años Activo:</span>
                      <span className="font-semibold">
                        {new Date().getFullYear() - Number.parseInt(superheroData.firstAppearance)} años
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>) : (
        <NotFoundPage />
      )}
    </>
  )
}
