import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <div className="bg-background min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">SceneFlow Studio</h1>
          <p className="text-muted-foreground">
            Welcome to SceneFlow Studio - built with Next.js 16, React 19, Tailwind CSS v4, and
            shadcn/ui
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Sample Card</CardTitle>
              <CardDescription>This is a sample card component from shadcn/ui</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="Enter your email" />
                <Button className="w-full">Get Started</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>Different button styles available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Setup Complete</CardTitle>
            <CardDescription>All the following have been successfully configured</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>✓ Next.js 16 with App Router</li>
              <li>✓ React 19</li>
              <li>✓ TypeScript with strict mode</li>
              <li>✓ Tailwind CSS v4 with PostCSS</li>
              <li>✓ shadcn/ui component library</li>
              <li>✓ ESLint with Next.js rules</li>
              <li>✓ Prettier with Tailwind plugin</li>
              <li>✓ Sample components (Button, Card, Input, Form)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
