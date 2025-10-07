import { Navbar } from "../components/Navbar"
import { ProductForm } from "../components/ProductForm"
import ProductTable from "../components/ProductTable"

const Dashboard = () => {


    return (
        <div className="p-4">
            <Navbar />
            <ProductForm />
            <ProductTable />
        </div>
    )
}

export default Dashboard
