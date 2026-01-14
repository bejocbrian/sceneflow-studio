import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <main className="w-full max-w-4xl px-6 py-12">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
              Welcome to SceneFlow Studio
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              A modern video production platform built with Next.js 16, React 19, and shadcn/ui
            </p>
          </div>

          <div className="grid w-full gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Component Showcase</CardTitle>
                <CardDescription>Demonstrating shadcn/ui components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="flex gap-2">
                  <Button>Primary Button</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                <Button variant="destructive">Destructive</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
                <CardDescription>Powered by modern technologies</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    Next.js 16 with App Router
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    React 19
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    TypeScript with strict mode
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    Tailwind CSS v4
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    shadcn/ui components
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
                    ESLint & Prettier
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Your SceneFlow Studio foundation is ready for development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4">
                <code className="text-foreground text-sm">npm run dev</code>
              </div>
              <p className="text-muted-foreground mt-4 text-sm">
                The development server will start at http://localhost:3000
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
