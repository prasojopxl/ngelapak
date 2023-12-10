import Header from "./components/Header"
import './App.css'
import ProductList from "./components/ProductList"

function App() {
    return (
        <>
            <header className="sticky top-0 z-10">
                <Header />
            </header>
            <main>
                <ProductList />
            </main>
        </>
    )
}

export default App
