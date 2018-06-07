interface LicenseModel {
    overView: string,
    tableData: Array<{
        OrderDate: string,
        Region: string,
        Rep: string,
        Item: string,
        Units: string,
        UnitCost: string,
        TotalCost: string
    }>
}