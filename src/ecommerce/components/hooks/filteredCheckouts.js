

export const filteredCheckouts = ({ searchPro, currentPage, filterItem, filterText, user }) => {


    const filteredChe = filterItem.filter(cat => cat.user.uid === user.uid);

    if (searchPro.length === 0) {
        return filteredChe.slice(currentPage, currentPage + 5);
    }

    searchPro = filterText.toLocaleLowerCase().trim();


    // Si hay algo en la caja de texto
    const filtered = filteredChe.filter(cat => cat.orderId.toLocaleLowerCase().includes(searchPro));

    return filtered.slice(currentPage, currentPage + 5)

}
