
import { ProductMangament } from "../components/ProductMangament"
import ProductTable from "../components/ProductTable"

const Dashboard = () => {

    return (
        <div className="bg-[#f6f7f8] px-12 py-6">
            <ProductMangament />
            <ProductTable />
        </div>
    )
}

export default Dashboard
