import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export const NotFoundPage = () => {

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
            <div
                className="absolute inset-0 z-0 opacity-30"
                style={{ background: 'var(--gradient-glow)' }}
            />

            <div className="container relative z-10 mx-auto px-4 py-16">
                <div className="mx-auto max-w-4xl">
                    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                        <div className="space-y-6 text-center lg:text-left animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            <div className="space-y-4">
                                <h1
                                    className="text-[120px] font-bold leading-none tracking-tight lg:text-[160px]"
                                    style={{
                                        background: 'var(--gradient-primary)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}
                                >
                                    404
                                </h1>
                                <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                                    Página no encontrada
                                </h2>
                                <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
                                    Lo sentimos, la página que buscas no existe o ha sido movida a otra ubicación.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                                <Button
                                    asChild
                                    size="lg"
                                    className="gap-2 bg-[hsl(262,83%,58%)] hover:bg-[hsl(262,83%,58%)]/90 text-primary-foreground"
                                >
                                    <Link to="/">
                                        <Home className="h-4 w-4" />
                                        Volver al inicio
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="gap-2 hover:bg-[hsl(262,83%,58%)] hover:text-primary-foreground"
                                    onClick={() => window.history.back()}
                                >
                                    <button>
                                        <ArrowLeft className="h-4 w-4" />
                                        Página anterior
                                    </button>
                                </Button>
                            </div>
                        </div>

                        <div className="relative animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                            <div className="relative overflow-hidden rounded-2xl">
                                <img
                                    src='/404-illustration.jpg'
                                    alt="Ilustración de página no encontrada"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};