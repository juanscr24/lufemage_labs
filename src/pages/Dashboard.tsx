
import { ProductMangament } from "../components/ProductMangament"
import ProductTable from "../components/ProductTable"

const Dashboard = () => {

    return (
        <div className="bg-[#f6f7f8]">
            {/* <ProductForm /> */}
            <ProductMangament />
            <ProductTable />
        </div>
    )
}

export default Dashboard
