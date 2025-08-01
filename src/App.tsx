import { Toaster } from "sonner"
import { Header } from "./components/header"
import { Products } from "./components/products"
import { ThemeProvider } from "./context/theme/theme-provider"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="max-w-[100vw]">
        <Header />
        <Products />
        <Toaster />
      </main>
    </ThemeProvider>
  )
}

export default App
