

export const filteredSales = ({ searchPro, currentPage, filterItem, filterText, user }) => {

    const filteredChe = filterItem.filter(sal => sal.seller.includes(user.uid));

    if (searchPro.length === 0) {
        return filteredChe.slice(currentPage, currentPage + 5);
    }

    searchPro = filterText.toLocaleLowerCase().trim();


    // Si hay algo en la caja de texto
    const filtered = filteredChe.filter(sal => sal.orderId.toLocaleLowerCase().includes(searchPro));

    return filtered.slice(currentPage, currentPage + 5)

}
